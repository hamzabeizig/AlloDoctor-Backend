let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
const doctorSchema=new mongoose.Schema({

    password:{
        type: String,

    },
    nom:{
        type:String,

    },
    prenom:{
        type:String,

    },
    contact:[],
    sexe:{
        type:String,

    },
    adresse:{
        type:String,

    },
    photo:{
        type:String,
    },
    specialite:{
        type:String,
    },
    formation:{
        type:String,
    },
    assurance:[],
    paiement:[],
    timeplan : {
        jours: [],
        plan:[],
    },
    ville:{
        type:String,
    },
    gov:{
        type:String,
    },experience:{
        type:String,
    },latitude:{
        type:Number,
    },longtitude:{
        type:Number,
    },
    rdvdoc:[],



});
doctorSchema.pre('save',function (next) {
    const doctor=this;
    if(!doctor.isModified('password')){
        return next();
    }
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            return next(err);
        }
        bcrypt.hash(doctor.password,salt,(err,hash)=>{
            if(err){
                return next(err);
            }
            doctor.password=hash;
            next();
        })
    })

});

let collectionName = 'users_doctor';
mongoose.model('Doctor',doctorSchema,collectionName);
