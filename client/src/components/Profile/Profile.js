import React, { Component } from 'react';
import './profile.css';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Container, Row } from 'reactstrap';


//import para  traer el componenet raiz de react

//Se crea clase con  mismo nombre que componente
class Profile extends Component{

    constructor(props){
        super(props);
        this.state = {
            saludito:"hola profile my friends!!"
        };
    }

    
    componentWillMount() {
        //Aqui se hacen peticiones a una API
    }

    componentWillReceiveProps(){
        //Si el componente padre pasa props despues de renderear
    }
    


    render() {
        //Necesita regresar un objeto
        return (
        
            <div>
                <Container>
                    <Row>
                        <Col sm="12" md={{ size: 8, offset: 2 }}>
                            <h1>Perfil</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" md={{ size: 8, offset: 2 }}>
                            <Form>
                                <FormGroup row>
                                  <Label for="name" sm={2}>Nombre</Label>
                                  <Col sm={10}>
                                    <Input type="text" name="name" id="name" placeholder="Nombre" value="" />
                                  </Col>
                                </FormGroup>
                                <FormGroup row>
                                  <Label for="exampleEmail" sm={2}>Correo electrónico</Label>
                                  <Col sm={10}>
                                    <Input type="email" name="email" id="exampleEmail" placeholder="Correo electrónico" />
                                  </Col>
                                </FormGroup>
                                <FormGroup row>
                                  <Label for="examplePassword" sm={2}>Contraseña</Label>
                                  <Col sm={10}>
                                    <Input type="password" name="password" id="examplePassword" placeholder="Contraseña" />
                                  </Col>
                                </FormGroup>
                                <FormGroup row>
                                  <Label for="telephone" sm={2}>Teléfono</Label>
                                  <Col sm={10}>
                                    <Input type="text" name="telephone" id="telephone" placeholder="Teléfono" />
                                  </Col>
                                </FormGroup>
                                <FormGroup row>
                                  <Label for="description" sm={2}>Descripción</Label>
                                  <Col sm={10}>
                                    <Input type="email" name="description" id="description" placeholder="Descripción" />
                                  </Col>
                                </FormGroup>
                                <FormGroup check row>
                                  <Col sm={{ size: 2, offset: 10 }}>
                                    <Button>Submit</Button>
                                  </Col>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div> 
        );
    }

}
//lo unico que voy a exportar
export default Profile;
