import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Col, Button } from 'reactstrap';
import './Registro.css';

// Importacion para traer el componente raiz de react

// Creamos la clase con el mismo nombre del componente

class Registro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            saludito: "Hola prueba"
        }


    }

    submitRegistro() {

    }

    render() {
        return (
            // Necesita regresar un objeto
            <div class="container">
                <Col md={8}>
                    <Form>
                        <FormGroup>
                            <Input type="email" name="email" id="email" placeholder="Dirección de correo electrónico" />
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" name="first_name" id="first_name" placeholder="Nombres" />
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" name="lastname" id="firstname" placeholder="Apellidos" />
                        </FormGroup>
                        <FormGroup>
                            <Input type="password" name="password" id="password" placeholder="Crea una contraseña" />
                        </FormGroup>
                        <FormGroup>
                            <Input type="password" name="password" id="password" placeholder="Vuelve a escribir tu contraseña" />
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" name="phone_number" id="phone_number" placeholder="Número de teléfono" />
                        </FormGroup>
                        <Button color="danger" onClick={this.submitRegistro}>Regístrate</Button>{' '}
                    </Form>
                </Col>
            </div>

        )
    }

}

export default Registro;