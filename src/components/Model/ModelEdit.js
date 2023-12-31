import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ModelEdit = () => {    
    const navigate = useNavigate();
    
    const {id} = useParams();

    const [modelField, setModelField] = useState({
        name: "",
        brand_id: "",
    });
    const [brandData, setBrandData] = useState([]);
    const [errorMessage, setErrorMessage] = useState()

    useEffect(() => {
        fetchModel();
        fetchBrandData();
    }, [id])

    const fetchModel = async () => {        
        try {
            const result = await axios.get("http://localhost/modelos/"+id);
            //console.log(result.data.data);
            setModelField(result.data.data);
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
            await axios.put("http://localhost/modelos/"+id, modelField);
            navigate('/modelos');
        } catch (e) {
            const errorMessage = e.response.data.message;
            setErrorMessage(errorMessage);           
        }
    }
    
    const clickToBackHandler = () => {
        navigate('/modelos');
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
                        <div className='col-3'>
                            <div className="mt-3">
                                <label className='form-label'>ID:</label>
                                <input type='text' className='form-control' name='id' value={id} disabled/>
                            </div>
                        </div>
                        <div className='col-3'>
                            <div className="mt-3">
                                <label className="form-label"> Marca:</label>
                                <select value={modelField.brand_id} className="form-control form-select" id="brand_id" name="brand_id" onChange={e => changeModelFieldHandler(e)}>
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
                                <label className='form-label'>Nome:</label>
                                <input type='text' className='form-control' name='name' value={modelField.name} onChange={e => changeModelFieldHandler(e)}/>   
                            </div>                         
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

export default ModelEdit;