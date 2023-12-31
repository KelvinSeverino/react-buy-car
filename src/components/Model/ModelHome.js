import React, { useEffect, useState } from 'react';

import ModelList from './ModelList';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ModelHome = () => {    
    const navigate = useNavigate();

    const [loading, setLoading] = useState()
    const [errorMessage, setErrorMessage] = useState()

    const [modelField, setModelField] = useState({
        name: "",
    });

    const [brandData, setBrandData] = useState([]);
    useEffect(() => {
        fetchBrandData();
    }, [])

    const fetchBrandData = async () => {
        try {
            const result = await axios("http://localhost/marcas");
            setBrandData(result.data.data);
        } catch (e) {
            console.log("something Wrong");
        }
    }

    const changeModelFieldHandler = (e) => {        
        setModelField({
            ...modelField,
            [e.target.name]: e.target.value
        });
        console.log(modelField);
    }

    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost/modelos", modelField);
            console.log(response);
            setLoading(true);
        } catch (e) {     
            const errorMessage = e.response.data.message;
            setErrorMessage(errorMessage);     
        }
    }
    if(loading){
        return <ModelHome/>
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
            <h2 className='w-100 d-flex justify-content-center p-3'>Modelos | BuyCar</h2>
                <div className='row'>
                    <div className='col-md-4'>
                        <h3>Informe Dados da Modelo</h3>
                        <form>
                            {errorMessage && <div className='text-danger'>{errorMessage}</div>}
                            <div className='row'>
                                <div className='col-6'>
                                    <div className="mt-3">
                                        <label className="form-label"> Marca:</label>
                                        <select className="form-control form-select" id="brand_id" name="brand_id" onChange={e => changeModelFieldHandler(e)}>
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
                                    <div className="mb-3 mt-3">
                                        <label className="form-label"> Nome:</label>
                                        <input type="text" className="form-control" id="name" placeholder="Insira o nome" name="name" onChange={e => changeModelFieldHandler(e)} />
                                    </div>
                                </div>
                            </div>                            
                             
                            <button type="submit" className="btn btn-success" onClick={e => onSubmitChange(e)}>Gravar</button>                             
                        </form>
                    </div>
                    <div className='col-md-8'>
                        <ModelList />
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

export default ModelHome;