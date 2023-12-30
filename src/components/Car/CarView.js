import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CarView = () => {   

    const {id} = useParams();

    const [car, setCar] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCar();
    }, [id]);

    const fetchCar = async () => {        
        try {
            const result = await axios.get("http://localhost/veiculos/"+id);
            //console.log(result.data.data);
            setCar(result.data.data);
        } catch (e) {
            console.log("something Wrong");
        }
    }

    const clickToBackHandler = () => {
        navigate('/veiculos');
    }
 
    return <div>
        <div className="container">
            <div className='row'>
                <div className='col-md-12'>
 
                    <h1>Carro</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Ano</th>
                                <th>Portas</th>
                                <th>KM</th>
                                <th>Valor</th>                        
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{car.brand + ' ' + car.model + ' ' + car.color}</td>
                                <td>{car.year}</td>
                                <td>{car.doors}</td>
                                <td>{car.km}</td>
                                <td>{car.price}</td>
                            </tr> 
                        </tbody>
                    </table>
                </div>
 
            </div>
        </div>
        <div className='container d-flex justify-content-center'>
            <div><button className='btn btn-primary' onClick={clickToBackHandler}>Voltar</button></div>
        </div>
    </div>   
}

export default CarView;