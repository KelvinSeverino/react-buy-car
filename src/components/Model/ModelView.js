import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ModelView = () => {    
    const {id} = useParams();

    const [model, setModel] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchModel();
    }, [id]);

    const fetchModel = async () => {        
        try {
            const result = await axios.get("http://localhost/modelos/"+id);
            //console.log(result.data.data);
            setModel(result.data.data);
        } catch (e) {
            console.log("something Wrong");
        }
    }

    const clickToBackHandler = () => {
        navigate('/modelos');
    }
 
    return <div>
        <div className="container">
            <div className='row'>
                <div className='col-md-12'>
 
                    <h1>Modelo</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nome</th>                               
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{model.name}</td>
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

export default ModelView;