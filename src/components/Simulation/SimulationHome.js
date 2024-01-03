import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SimulationHome = () => {

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState()
    const [simulationData, setSimulationData] = useState();

    const [carData, setCarData] = useState([]);

    useEffect(() => {
        fetchCarData();
    }, [])

    const fetchCarData = async () => {
        try {
            const result = await axios("http://localhost/veiculos");
            setCarData(result.data.data);
        } catch (e) {
            console.log("something Wrong");
        }
    }

    const [simulationField, setSimulationField] = useState({
        name: "",
    });

    const changeSimulationFieldHandler = (e) => {        
        setSimulationField({
            ...simulationField,
            [e.target.name]: e.target.value
        });
        console.log(simulationField);
    }

    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost/simulacao", simulationField);
            const simulationMessage = response.data.data;
            setSimulationData(simulationMessage);
            setErrorMessage(null);   
            console.log(response);
        } catch (e) {     
            const errorMessage = e.response.data.message;
            setErrorMessage(errorMessage);     
        }
    }

    const clickToBackHome = () => {
        navigate('/');
    }

    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 3
            }}
        />
    );

    return (
        <div className="container">
            <h2 className='w-100 d-flex justify-content-center p-3'>Simulação | BuyCar</h2>
                <div className='row'>
                    <div className='col-md-12'>
                        <h3>Informe Dados p/ Simulação</h3>
                        <form>
                            {errorMessage && <div className='text-danger'>{errorMessage}</div>}      
                            {simulationData && <div class={`alert alert-${simulationData.class}`} role="alert">{'Score: '+simulationData.score+' | '+simulationData.description}</div>}                          
                            <div className='row'>
                                <div className='col-12'>
                                    <div className="mt-1">
                                        <label className="form-label"> Carro:</label>
                                        <select className="form-control form-select" id="car_id" name="car_id" onChange={e => changeSimulationFieldHandler(e)}>
                                            <option value=''>Selecione carro</option>
                                            {carData.map((opcao, index) => (
                                                <option key={opcao.id} value={opcao.id}>
                                                {opcao.brand +' - '+ opcao.model +' - '+ opcao.km +'KM - '+ opcao.year +' - '+ opcao.color}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <div className="mt-2">
                                        <label className="form-label"> Nome:</label>
                                        <input type="text" className="form-control" id="name" placeholder="Insira o nome" name="name" onChange={e => changeSimulationFieldHandler(e)} />
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className="mt-2 mb-3">
                                        <label className="form-label"> CPF:</label>
                                        <input type="text" className="form-control" id="cpf" placeholder="Insira o CPF" name="cpf" onChange={e => changeSimulationFieldHandler(e)} />
                                    </div>
                                </div>
                            </div>
                             
                             <button type="submit" className="btn btn-success" onClick={e => onSubmitChange(e)}>Simular</button>                             
                        </form>
                    </div>
                </div>
            <ColoredLine color="black"/>
            <div className='container d-flex justify-content-center'>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button className='btn btn-secondary' onClick={clickToBackHome}>Home</button>
                </div>
            </div>
        </div>
    ) 
}

export default SimulationHome;