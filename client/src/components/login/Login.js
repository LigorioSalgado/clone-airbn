import React, { Component } from 'react';
import './login.css';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { connect } from 'react-redux';
import { Control } from 'react-redux-form';
import Axios from 'axios';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.user;

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentWillMount() {
        //Aqui se hacen peticiones a una API
    }

    componentWillReceiveProps() {
        //Si el componente padre pasa props despues de renderear
    }

    handleChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        console.log('data Login ', this.state);
        event.preventDefault();
        if (this.state.email && this.state.password) {
            this.saveUser(this.state);
        } else {
            console.error('Datos incompletos')
        }
    }



    render() {
        //Necesita regresar un objeto
        return (

            <div>
                {/* debe haber un elemento contenedor */}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" id="exampleEmail" value={this.state.email} onChange={this.handleChangeEmail} placeholder="Direccion de correo electrónico" required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="Contraseña" value={this.state.password} onChange={this.handleChangePassword} required />
                    </FormGroup>
                    <Button type="submit"> Iniciar sesión</Button>

                </Form>
                <p>¿No tienes un cuenta? Regístrate</p>
            </div>
        );
    }

    saveUser(user) {

        console.log('saveUser: ', user)

        Axios.post('https://airbnb-cn-b19.herokuapp.com/api/v1/users/login', user)
            .then(function (Response) {
                console.log('Response*******:', );
                localStorage.setItem('token', Response.data.token);

                let token = localStorage.getItem('token');
                console.log('token: ', token);

            }).catch(function (error) {
                    console.log('error:', JSON.stringify(error.response.data.message));
                    // console.log(error.)
            });
    }



}


//lo unico que voy a exportar
export default Login;
