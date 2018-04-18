import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './Registro.css';

// Importacion para traer el componente raiz de react

// Creamos la clase con el mismo nombre del componente

class Registro extends Component {
    constructor(props){
        super(props)
        this.state={
            saludito: "Hola prueba"
        }
    }

    render(){
        return (
            // Necesita regresar un objeto
                <div class = "prueba">
                    <h5>Hola mundo</h5>
                    <h3>{this.state.saludito}</h3>
                    <Button color="success">Danger!</Button>
                </div>
            
        )
    }

}

export default Registro;