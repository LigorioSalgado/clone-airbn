import React, { Component } from 'react';
import './login.css';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {connect} from 'react-redux';
import {Control} from 'react-redux-form';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            saludito: "this is a login!!"
        };
    }


    componentWillMount() {
        //Aqui se hacen peticiones a una API
    }

    componentWillReceiveProps() {
        //Si el componente padre pasa props despues de renderear
    }

    saveNewUser(val) {
        console.log('val: ', val);
        val.preventDefault();
    }



    render() {
        //Necesita regresar un objeto
        return (

            <div>
                {/* debe haber un elemento contenedor */}
                <Form model="user" onSubmit={(val) => this.saveNewUser(val)}>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input valid />
                        <Input type="email" name="email" id="exampleEmail" model=".email" placeholder="Direccion de correo electrónico" required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="Contraseña" required />
                    </FormGroup>
                    <Button type="submit"> Iniciar sesión</Button>

                </Form>
                <p>¿No tienes un cuenta? Regístrate</p>
            </div>
        );
    }

}
//lo unico que voy a exportar
export default Login;
