import db from '../models'
//Así se manda llamar a la bd

const User=db.User; //db trae todas las de BD

const createUser = (request,response) => {

    User.create({
        first_name:request.body.first_name,
        lastname:request.body.lastname,
        email:request.body.email,
        password:request.body.password,
        phone_number:request.body.phone_number,
        type:1
    }).then((user)=>{
        response.json(user)
    }).catch((err)=>{
        response.status(400).json(err);

    });

}

const viewUser = (request,response) => {

    User.findOne({
        attributes: ['first_name', 'lastname','email','password','phone_number','type','profile_image','description','score','user_pay','createdAt','updatedAt'],
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
        type:1,
        profile_image:request.body.profile_image,
        description:request.body.description,
        score:request.body.score,
        user_pay:request.body.user_pay,
        createdAt:request.body.createdAt,
        updatedAt:request.body.updateUser
    },{
            where:{
                email:request.user.email
        }
    }).then((user)=>{
        User.findOne({
            attributes: ['first_name', 'lastname','email','password','phone_number','type','profile_image','description','score','user_pay','createdAt','updatedAt'],
            where:{
                email:request.user.email
            }
        }).then((user)=>{
            response.json(user)
        }).catch((err)=>{
            response.status(400).json(err);
    
        });
    }).catch((err)=>{
        response.status(400).json(err);

    });

}

export{
    createUser,viewUser,updateUser}