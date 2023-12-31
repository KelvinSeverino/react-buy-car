import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CarEdit = () => {   
    const navigate = useNavigate();
    
    const {id} = useParams();

    const [carField, setCarField] = useState({
        brand_id: "",
        model_id: "",
        color_id: "",
        year: "",
        doors: "",
        km: "",
        price: "",
    });
    const [brandData, setBrandData] = useState([]);
    const [modelData, setModelData] = useState([]);
    const [colorData, setColorData] = useState([]);
    const [errorMessage, setErrorMessage] = useState()

    useEffect(() => {
        fetchCar();
        fetchBrandData();
        fetchModelData();
        fetchColorData();
    }, [id])

    const fetchCar = async () => {        
        try {
            const result = await axios.get("http://localhost/veiculos/"+id);
            //console.log(result.data.data);
            setCarField(result.data.data);
        } catch (e) {
            console.log("something Wrong");
        }
    }

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
            await axios.put("http://localhost/veiculos/"+id, carField);
            navigate('/veiculos');
        } catch (e) {
            const errorMessage = e.response.data.message;
            setErrorMessage(errorMessage);           
        }
    }
    
    const clickToBackHandler = () => {
        navigate('/veiculos');
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

    return(
        <div className='container'>
            <h1>Editar</h1>
            <div className='col-12'>
            <form>
                {errorMessage && <div className='text-danger'>{errorMessage}</div>}
                <div className='row'>
                    <div className='col-6'>
                        <div className="mt-3">
                            <label className="form-label"> Marca:</label>
                            <select value={carField.brand_id} className="form-control form-select" id="brand_id" name="brand_id" onChange={e => changeCarFieldHandler(e)}>
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
                            <select value={carField.model_id} className="form-control form-select" id="model_id" name="model_id" onChange={e => changeCarFieldHandler(e)}>
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
                            <select value={carField.color_id} className="form-control form-select" id="color_id" name="color_id" onChange={e => changeCarFieldHandler(e)}>
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
                            <input type="number" min="1900" max="2099" step="1" className="form-control" id="year" placeholder="Insira ano do modelo" name="year" value={carField.year} onChange={e => changeCarFieldHandler(e)} />
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className="mt-2">
                            <label className="form-label"> Portas:</label>
                            <input type="text" className="form-control" id="doors" placeholder="Insira qtd de portas" name="doors" value={carField.doors} onChange={e => changeCarFieldHandler(e)} />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <div className="mt-2">
                            <label className="form-label"> KM:</label>
                            <input type="text" className="form-control" id="km" placeholder="Insira KM rodado" name="km" value={carField.km} onChange={e => changeCarFieldHandler(e)} />
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className="mt-2 mb-3">
                            <label className="form-label"> Preço:</label>
                            <input type="text" className="form-control" id="price" placeholder="Insira o preço" name="price" value={carField.price} onChange={e => changeCarFieldHandler(e)} />
                        </div>
                    </div>
                </div>
                <div className='row'>
                </div>                    
            </form>
            <div className='container d-flex justify-content-center'>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button className='btn btn-warning' onClick={clickToBackHandler}>Voltar</button>
                    <button type='submit' className='btn btn-success float-left' onClick={e => onSubmitChange(e)}>Atualizar</button>
                </div>
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

export default CarEdit;