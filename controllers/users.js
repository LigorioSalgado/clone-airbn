
import  jwt  from 'jsonwebtoken';
import {SECRET_KEY} from '../config/config'
import bcrypt  from 'bcrypt-nodejs';
import db from '../models';
//Asi siempre se manda a llamar a la bd

const User = db.User; //db trae todas las tablas de BD

const signUP =  (request,response) => {
    

    User.create({
        first_name:request.body.first_name,
        lastname:request.body.lastname,
        email:request.body.email,
        password:request.body.password,
        phone_number:request.body.phone_number,
        type:1
    }).then((user) =>{
        response.json(user).status(200);
    }).catch((err) =>{
        response.status(400).json(err);
    });

}



const viewUser = (request,response) => {

    User.findOne({
        attributes: ['first_name', 'lastname','email','password','phone_number','type'],
        where:{
            email:request.user.email
        }
    }).then((user)=>{
        response.json(user)
    }).catch((err)=>{
        response.status(400).json(err);

    });

}

const updateUser = (request,response) => {

    User.update({
        first_name:request.body.first_name,
        lastname:request.body.lastname,
        email:request.body.email,
        phone_number:request.body.phone_number,
        type:1},{
            where:{
                email:request.user.email
        }
    }).then((user)=>{
        response.json(user)
    }).catch((err)=>{
        response.status(400).json(err);

    });

}

const cryptPassword = (password) => {
    console.log("cryptPassword" + password);
    return new Promise(function(resolve, reject) {
      bcrypt.genSalt(10, function(err, salt) {
        // Encrypt password using bycrpt module
        if (err) return reject(err);
  
        bcrypt.hash(password, salt, null, function(err, hash) {
          if (err) return reject(err);
          return resolve(hash);
        });
      });
    });
}

const login  = (req,res) => {
    User.findOne({where:{email:req.body.email}}).then((user) => {
        bcrypt.compare(req.body.password, user.password,(err, result) =>{
            if(result){
                let newUser = {
                    email:user.email,
                    name:`${user.first_name} ${user.lastname}`,
                    exp: Math.floor(Date.now()/ 1000) + (60*60*24)
                }
                let  token = jwt.sign(newUser, SECRET_KEY);
                return res.status(200).json({token:token});
            }else{
                return res.status(400).json({message:"Contraseña no coincide"});
            }
        })
    }).catch(() =>{
        return res.status(400).json({message:"El usuario no existe"})
    }
    );
}

export {
    signUP
    createUser,
    login,
    updateUser
}


