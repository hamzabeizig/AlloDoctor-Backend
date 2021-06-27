let  express =require('express');
let mongoose= require('mongoose');
let jwt= require('jsonwebtoken');
let  router = express.Router();
let Doctor=mongoose.model('Doctor');
let {jwtkey}=require('../backend/keys');


router.post('/inscriDoctor', async (req,res)=>{
    console.log('Post connect');
    let  {password,nom,prenom,sexe,adresse,photo,assurance,paiement,timeplan,formation,contact,specialite,ville,gov,experience,latitude,longtitude}=req.body;
    try {
        let doctor;

        doctor = new Doctor({password,nom,prenom,sexe,adresse,photo,assurance,paiement,timeplan,formation,contact,specialite,ville,gov,experience,latitude,longtitude});
        await doctor.save();
        let token =jwt.sign({userId:doctor._id},jwtkey);
        res.send({token});

        console.log(' inscri doctor posted');
    }
    catch(err){
        console.log(' inscri failed');
        return  res.send({error:'failed'});
    }
});
module.exports=router;
