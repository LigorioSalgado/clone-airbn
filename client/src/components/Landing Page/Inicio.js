import React, { Component } from 'react';
import './Estilos.css';

class Inicio extends Component {

    constructor(props) {
        super(props);
        this.state = {
            saludito: "Esta sera la pagina inicial"
        };
    }


    componentWillMount() {
        //Aqui se hacen peticiones a una API
    }

    componentWillReceiveProps() {
        //Si el componente padre pasa props despues de renderear
    }

    render() {
        //Necesita regresar un objeto
        return (

            <div>
                {/* debe haber un elemento contenedor */}
                <h1>{this.state.saludito}</h1>
            </div>
        );
    }

}
//lo unico que voy a exportar
export default Inicio;