import React, { useEffect, useState } from 'react';

import CarList from './CarList';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CarHome = () => {    
    const navigate = useNavigate();

    const [loading, setLoading] = useState()
    const [errorMessage, setErrorMessage] = useState()

    const [brandData, setBrandData] = useState([]);
    const [modelData, setModelData] = useState([]);
    const [colorData, setColorData] = useState([]);

    useEffect(() => {
        fetchBrandData();
        fetchModelData();
        fetchColorData();
    }, [])

    const fetchBrandData = async () => {
        try {
            const result = await axios("http://localhost/marcas");
            setBrandData(result.data.data);
        } catch (e) {
            console.log("something Wrong");
        }
    }

    const fetchModelData = async () => {
        try {
            const result = await axios("http://localhost/modelos");
            setModelData(result.data.data);
        } catch (e) {
            console.log("something Wrong");
        }
    }

    const fetchColorData = async () => {
        try {
            const result = await axios("http://localhost/cores");
            setColorData(result.data.data);
        } catch (e) {
            console.log("something Wrong");
        }
    }

    const [carField, setCarField] = useState({
        name: "",
    });

    const changeCarFieldHandler = (e) => {        
        setCarField({
            ...carField,
            [e.target.name]: e.target.value
        });
        console.log(carField);
    }

    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost/veiculos", carField);
            console.log(response);
            setLoading(true);
        } catch (e) {     
            const errorMessage = e.response.data.message;
            setErrorMessage(errorMessage);     
        }
    }
    if(loading){
        return <CarHome/>
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
            <h2 className='w-100 d-flex justify-content-center p-3'>Carros | BuyCar</h2>
                <div className='row'>
                    <div className='col-md-4'>
                        <h3>Informe Dados do Carro</h3>
                        <form>
                            {errorMessage && <div className='text-danger'>{errorMessage}</div>}
                            <div className='row'>
                                <div className='col-6'>
                                    <div className="mt-3">
                                        <label className="form-label"> Marca:</label>
                                        <select className="form-control form-select" id="brand_id" name="brand_id" onChange={e => changeCarFieldHandler(e)}>
                                            <option value=''>Selecione marca</option>
                                            {brandData.map((opcao, index) => (
                                                <option key={opcao.id} value={opcao.id}>
                                                {opcao.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className="mt-3">
                                        <label className="form-label"> Modelo:</label>
                                        <select className="form-control form-select" id="model_id" name="model_id" onChange={e => changeCarFieldHandler(e)}>
                                            <option value=''>Selecione modelo</option>
                                            {modelData.map((opcao, index) => (
                                                <option key={opcao.id} value={opcao.id}>
                                                {opcao.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <div className="mt-3">
                                        <label className="form-label"> Cor:</label>
                                        <select className="form-control form-select" id="color_id" name="color_id" onChange={e => changeCarFieldHandler(e)}>
                                            <option value=''>Selecione cor</option>
                                            {colorData.map((opcao, index) => (
                                                <option key={opcao.id} value={opcao.id}>
                                                {opcao.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <div className="mt-2">
                                        <label className="form-label"> Ano:</label>
                                        <input type="number" min="1900" max="2099" step="1" className="form-control" id="year" placeholder="Insira ano do modelo" name="year" onChange={e => changeCarFieldHandler(e)} />
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className="mt-2">
                                        <label className="form-label"> Portas:</label>
                                        <input type="text" className="form-control" id="doors" placeholder="Insira qtd de portas" name="doors" onChange={e => changeCarFieldHandler(e)} />
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <div className="mt-2">
                                        <label className="form-label"> KM:</label>
                                        <input type="text" className="form-control" id="km" placeholder="Insira KM rodado" name="km" onChange={e => changeCarFieldHandler(e)} />
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className="mt-2 mb-3">
                                        <label className="form-label"> Preço:</label>
                                        <input type="text" className="form-control" id="price" placeholder="Insira o preço" name="price" onChange={e => changeCarFieldHandler(e)} />
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                            </div>
                             
                             <button type="submit" className="btn btn-success" onClick={e => onSubmitChange(e)}>Gravar</button>                             
                        </form>
                    </div>
                    <div className='col-md-8'>
                        <CarList />
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

export default CarHome;