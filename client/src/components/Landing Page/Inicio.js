import React, { Component } from 'react';
import './Estilos.css';
import { Button } from 'reactstrap'

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
            <html lang="es">
                <title>
                    Inicio ;)
                </title>
                <body>
                    <div>
                        
                    </div>
                </body>
            </html>

        );
    }

}
//lo unico que voy a exportar
export default Inicio;