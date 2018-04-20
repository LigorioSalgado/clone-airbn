import React, { Component } from 'react';
import { Button } from 'reactstrap'
import './test.css';
import axios from 'axios';

//import para  traer el componenet raiz de react

//Se crea clase con  mismo nombre que componente
class Test extends Component {

    constructor(props) {
        super(props);
        this.state = {
            saludito: "Hello my friends!!"
        };
    }


    componentWillMount() {
        //Aqui se hacen peticiones a una API
    }

    componentWillReceiveProps() {
        //Si el componente padre pasa props despues de renderear
    }

    SendResponseToBack(){
        console.log('https://swapi.co/api/planets/3/');
        axios.get('https://swapi.co/api/planets/3/')
            .then(function (Response) {
                console.log(Response);
            }).catch(function (error) {
                console.log(error);
            });
    }

    render() {
        //Necesita regresar un objeto
        return (

            <div>
                {/* debe haber un elemento contenedor */}
                <h5>{this.props.saludo}</h5>
                <h3>{this.state.saludito}</h3>
                <div>
                    <Button onClick={this.SendResponseToBack} color="warning">Con manejador de Errores!</Button><br /><br />
                </div>
            </div>
        );
    }

}
//lo unico que voy a exportar
export default Test;
