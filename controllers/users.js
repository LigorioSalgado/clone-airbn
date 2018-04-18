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


export {
    signUP
}

