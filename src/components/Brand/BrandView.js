import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
 
const BrandView = () => {

    const {id} = useParams();

    const [brand, setBrand] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBrand();
    }, [id]);

    const fetchBrand = async () => {        
        try {
            const result = await axios.get("http://localhost/marcas/"+id);
            //console.log(result.data.data);
            setBrand(result.data.data);
        } catch (e) {
            console.log("something Wrong");
        }
    }

    const clickToBackHandler = () => {
        navigate('/marcas');
    }
 
    return <div>
        <div className="container">
            <div className='row'>
                <div className='col-md-12'>
 
                    <h1>Marca</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nome</th>                               
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{brand.name}</td>
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
 
export default BrandView;