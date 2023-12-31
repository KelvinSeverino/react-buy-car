import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
 
const ColorView = () => {

    const {id} = useParams();

    const [color, setColor] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchColor();
    }, [id]);

    const fetchColor = async () => {        
        try {
            const result = await axios.get("http://localhost/cores/"+id);
            //console.log(result.data.data);
            setColor(result.data.data);
        } catch (e) {
            console.log("something Wrong");
        }
    }

    const clickToBackHandler = () => {
        navigate('/cores');
    }
 
    return <div>
        <div className="container">
            <div className='row'>
                <div className='col-md-12'>
 
                    <h1>Cor</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nome</th>                               
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{color.name}</td>
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
};
 
export default ColorView;