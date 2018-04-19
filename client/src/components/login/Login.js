import React, { Component } from 'react';
import './login.css';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { connect } from 'react-redux';
import { Control } from 'react-redux-form';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

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
        if(this.state.email && this.state.password){
            this.saveLocalStorage(this.state);
        }else {
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

    saveLocalStorage(data) {
        localStorage.setItem('myData', JSON.stringify(data));
    }

}


//lo unico que voy a exportar
export default Login;
