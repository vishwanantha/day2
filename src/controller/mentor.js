const mentorModel=require('../model/mentor')

const createMentor=async(req,res)=>{ 
    try {
       const batchPercent= await mentorModel.findOne({batch:req.body.batch});
       if(!batchPercent){

            
        await mentorModel.create(req.body)
        res.send({message:'successfully created'})    
    
       }else{
        res.status(200).send({message:'batch taken by someone'})    
       }
      
    } catch (error) {
        console.log(error);
        res.status(500).send({message:error.message})
    }
}




module.exports= {createMentor}