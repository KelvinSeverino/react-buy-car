import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ColorEdit = () => {

    const navigate = useNavigate();
    
    const {id} = useParams();

    const [colorField, setColorField] = useState({
        name: "",
    });
    const [errorMessage, setErrorMessage] = useState()

    useEffect(() => {
        fetchColor();
    }, [id])

    const fetchColor = async () => {        
        try {
            const result = await axios.get("http://localhost/cores/"+id);
            //console.log(result.data.data);
            setColorField(result.data.data);
        } catch (e) {
            console.log("something Wrong");
        }
    }

    const changeColorFieldHandler = (e) => {
        setColorField({
            ...colorField,
            [e.target.name]: e.target.value
        });
        console.log(colorField);
    }

    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            await axios.put("http://localhost/cores/"+id, colorField);
            navigate('/cores');
        } catch (e) {
            const errorMessage = e.response.data.message;
            setErrorMessage(errorMessage);           
        }
    }
    
    const clickToBackHandler = () => {
        navigate('/cores');
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
                            <input type='text' className='form-control' name='name' value={colorField.name} onChange={e => changeColorFieldHandler(e)}/>
                        </div>
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
 
export default ColorEdit;