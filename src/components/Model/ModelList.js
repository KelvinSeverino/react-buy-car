import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const ModelList = () => {    
    const [modelData, setModelData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const result = await axios("http://localhost/modelos");
            setModelData(result.data.data);
        } catch (e) {
            console.log("something Wrong");
        }
    }

    const handleDelete = async(id) => {
        console.log(id)
        await axios.delete("http://localhost/modelos/"+id);
        const newModelData = modelData.filter((item)=>{
            return(
                item.id !== id
            )
        })
        setModelData(newModelData);
    }

    return(
        <div className="container">
            <h3>Lista Modelos</h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        modelData.map((model, i) => {
                            return (
                                <tr key={model.id}>
                                    <td>{model.name}</td>
                                    <td>
                                        <NavLink to={`/modelos/view/${model.id}`} className="btn btn-secondary">Abrir</NavLink>
                                        <NavLink to={`/modelos/edit/${model.id}`} className="btn btn-warning mx-2">Editar</NavLink>
                                        <button onClick={()=>handleDelete(model.id)} className="btn btn-danger">Apagar</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ModelList;