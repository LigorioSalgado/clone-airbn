import React, { Component } from 'react';
import './Estilos.css';
import { Jumbotron, Button } from 'reactstrap';

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
                <Jumbotron>
                    <img className="img img-responsive" alt="LOGO" width="400px" height="200px" src="http://www.resetmx.reviews/wp-content/uploads/2017/09/default.png"/>
                    <hr/>
                    <h1 className="display-3">Esto No es AirBnB ;)</h1>
                    <p className="lead">Porque hakeamos AirBnB. Bueno no, pero esta mas chida nuestra app ;).</p>
                    <p className="lead">
                        <Button href="Login" color="success">Acceder</Button>
                    </p>
                    <p className="lead">
                        <Button href="Registro" color="primary">Registrarse</Button>
                    </p>
                </Jumbotron>
            </div>


        );
    }
}
//lo unico que voy a exportar
export default Inicio;