const studentModel=require("../model/student")
const createStudent = async (req, res) => {
    try {
        const studentexist = await studentModel.findOne({ email: req.body.email })
        if (!studentexist) {
            await studentModel.create(req.body);
            res.status(201).send({ message: 'student data created' })
        } else {
            res.status(400).send({ message: 'user exists' })
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const getStudentByMentor = async (req, res) => {
    const data = await studentModel.find({ mentorname: req.params.name })
    res.send({
        message: 'successfully fetched',
        mentor: data
    })
}

const asignMentor = async (req, res) => {
    try {
        let data = await studentModel.findOne({ studentname: req.body.studentname })
        let prevMentor =
            data.previousmentorname ? [...data.previousmentorname, data.mentorname]
                : data.mentorname;
        let { studentname, email, batch, mentorname } = req.body
       
        data.studentname = studentname ? studentname : data.studentname;
        data.email = email ? email : data.email;
        data.batch = batch ? batch : data.batch;
        data.mentorname = mentorname ? mentorname : data.mentorname;
        data.previousmentorname = prevMentor;

        await data.save()
        res.status(200).send({ message: 'updated successfully' })
        // } else {
        //     res.status(400).send({ message: 'mentor is exists' })

        // }

    } catch (error) {
        res.status(500).send({ message: error.message })
    }

}

const getmentorbystudent = async (req, res) => {
    try {
        let prevmentors = await studentModel.findOne({ studentname: req.params.studentname })
        //    console.log(await prevmentors.previousmentorname);
        if (prevmentors) {
            res.status(200).send({ message: 'successfully fetched', previousmentors: prevmentors.previousmentorname })
        } else {
            res.status(400).send({ message: 'Invalid request' })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}
const getUnassign = async (req, res) => {
    // const getUnassignMentor = await studentModel.find({}, { mentorname: 1, _id: 0 })
    // console.log(getUnassignMentor);
    // let unassignstud = getUnassignMentor.map((e) => {
    //     return  e.mentorname })
    //     console.log(unassignstud);
    //  const getUnassignMentor= await  studentModel.find({ mentorname: {$exists:false}},{studentname:1,_id:0})
        const getUnassignMentor= await  studentModel.find({ mentorname: {$eq:""}},{studentname:1,_id:0})

     let filData= getUnassignMentor.map((e)=>e.studentname)
    // console.log(filData);
    res.status(200).send({ message: 'fetch unassigned studentList successfully', 
    unassignstudent: filData })
}

const assignStudentMentors=async(req,res)=>{
    // console.log(req.body);
   const stuObj= await  studentModel.find({studentname:{$in:req.body.studentList}})
   stuObj.forEach((e)=>{
    e.mentorname=req.body.mentorname;
   e.save();
   })
;
   res.status(200).send({message:'mentor assigned successfully'})
}
   module.exports={
    createStudent, getStudentByMentor,
    asignMentor, getmentorbystudent, getUnassign,
    assignStudentMentors
}