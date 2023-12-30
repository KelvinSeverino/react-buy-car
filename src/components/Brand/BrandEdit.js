import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BrandEdit = () => {

    const navigate = useNavigate();
    
    const {id} = useParams();

    const [brandField, setBrandField] = useState({
        name: "",
    });
    const [errorMessage, setErrorMessage] = useState()

    useEffect(() => {
        fetchBrand();
    }, [id])

    const fetchBrand = async () => {        
        try {
            const result = await axios.get("http://localhost/marcas/"+id);
            //console.log(result.data.data);
            setBrandField(result.data.data);
        } catch (e) {
            console.log("something Wrong");
        }
    }

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
            await axios.put("http://localhost/marcas/"+id, brandField);
            navigate('/marcas');
        } catch (e) {
            const errorMessage = e.response.data.message;
            setErrorMessage(errorMessage);           
        }
    }
    
    const clickToBackHandler = () => {
        navigate('/marcas');
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
                    <div className='form-group'>
                        <div className="mb-3 mt-3">
                            <label className='form-label'>ID:</label>
                            <input type='text' className='form-control' name='id' value={id} disabled/>
                        </div>
                        <div className="mb-3 mt-3">
                            <label className='form-label'>Nome:</label>
                            <input type='text' className='form-control' name='name' value={brandField.name} onChange={e => changeBrandFieldHandler(e)}/>
                        </div>
                    </div>
                </form>
                <div className='container d-flex justify-content-center'>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button className='btn btn-warning' onClick={clickToBackHandler}>Voltar</button>
                        <button type='submit' className='btn btn-success float-left' onClick={e => onSubmitChange(e)}>Atualizar</button>
                    </div>
                </div>
            </div>
            <ColoredLine color="black"/>
            <div className='container d-flex justify-content-center'>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button className='btn btn-secondary' onClick={clickToBackHome}>Home</button>
                </div>
            </div>
        </div>
    )
}
 
export default BrandEdit;