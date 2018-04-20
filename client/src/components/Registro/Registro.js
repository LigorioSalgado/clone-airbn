import React, { Component } from 'react';
import Axios from 'axios';
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Col, Button } from 'reactstrap';
import './Registro.css';

// Importacion para traer el componente raiz de react

// Creamos la clase con el mismo nombre del componente

class Registro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            first_name: '',
            lastname: '',
            password: '',
            confirmacionPassword: '',
            phone_number: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.passwordValid = false
    }


    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }


    handleSubmit(event) {
        event.preventDefault();
        const email = this.state.email
        const first_name = this.state.first_name
        const lastname = this.state.lastname
        const password = this.state.password
        const confirmacionPassword = this.state.confirmacionPassword
        const phone_number = this.state.phone_number

        var objeto = {
            "email": email,
            "first_name": first_name,
            "lastname": lastname,
            "password": password,
            "phone_number": phone_number
        }

        if (password !== confirmacionPassword) {
            alert('Contrasena incorrecta');
        } else {
            this.registrarCliente(objeto)
        }
    }

    render() {
        return (
            <div className="container">
                <Col md={8}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Input type="email" name="email" id="email" placeholder="Dirección de correo electrónico" value={this.state.email} onChange={this.handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" name="first_name" id="first_name" placeholder="Nombres" value={this.state.first_name} onChange={this.handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" name="lastname" id="lastname" placeholder="Apellidos" value={this.state.lastname} onChange={this.handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Input type="password" name="password" id="password" placeholder="Crea una contraseña" value={this.state.password} onChange={this.handleChange} required invalid />
                        </FormGroup>
                        <FormGroup>
                            <Input type="password" name="confirmacionPassword" id="confirmacionPassword" placeholder="Vuelve a escribir tu contraseña" value={this.state.confirmacionPassword} onChange={this.handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" name="phone_number" id="phone_number" placeholder="Número de teléfono" value={this.state.phone_number} onChange={this.handleChange} required />
                        </FormGroup>
                        <Button color="danger" type="submit">Regístrate</Button>
                    </Form>
                </Col>
            </div>

        )
    }

    registrarCliente(objeto) {
        console.log("registrando", objeto)

        Axios.post('https://airbnb-cn-b19.herokuapp.com/api/v1/users/signup',objeto)
            .then(Response => console.log(Response))
            .catch(Error => console.log(Response));

    }

}

export default Registro;