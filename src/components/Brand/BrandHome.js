import React, { useState } from 'react';

import BrandList from './BrandList';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BrandHome = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState()
    const [errorMessage, setErrorMessage] = useState()

    const [brandField, setBrandField] = useState({
        name: "",
    });

    const changeBrandFieldHandler = (e) => {        
        setBrandField({
            ...brandField,
            [e.target.name]: e.target.value
        });
        console.log(brandField);
    }

    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost/marcas", brandField);
            console.log(response);
            setLoading(true);
        } catch (e) {     
            const errorMessage = e.response.data.message;
            setErrorMessage(errorMessage);     
        }
    }
    if(loading){
        return <BrandHome/>
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
            <h2 className='w-100 d-flex justify-content-center p-3'>Marcas | BuyCar</h2>
                <div className='row'>
                    <div className='col-md-4'>
                        <h3>Informe Dados da Marca</h3>
                        <form>
                            {errorMessage && <div className='text-danger'>{errorMessage}</div>}
                            <div className="mb-3 mt-3">
                                <label className="form-label"> Nome:</label>
                                <input type="text" className="form-control" id="name" placeholder="Insira o nome" name="name" onChange={e => changeBrandFieldHandler(e)} />
                            </div>
                             
                             <button type="submit" className="btn btn-success" onClick={e => onSubmitChange(e)}>Gravar</button>                             
                        </form>
                    </div>
                    <div className='col-md-8'>
                        <BrandList />
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

export default BrandHome;