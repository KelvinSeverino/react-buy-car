import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const ColorList = () => {

    const [colorData, setColorData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const result = await axios("http://localhost/cores");
            setColorData(result.data.data);
        } catch (e) {
            console.log("something Wrong");
        }
    }

    const handleDelete = async(id) => {
        console.log(id)
        await axios.delete("http://localhost/cores/"+id);
        const newColorData = colorData.filter((item)=>{
            return(
                item.id !== id
            )
        })
        setColorData(newColorData);
    }

    return(
        <div className="container">
            <h3>Lista Marcas</h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Data Criação</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        colorData.map((color, i) => {
                            return (
                                <tr key={color.id}>
                                    <td>{color.name}</td>
                                    <td>
                                        <NavLink to={`/cores/view/${color.id}`} className="btn btn-secondary">Abrir</NavLink>
                                        <NavLink to={`/cores/edit/${color.id}`} className="btn btn-warning mx-2">Editar</NavLink>
                                        <button onClick={()=>handleDelete(color.id)} className="btn btn-danger">Apagar</button>
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

export default ColorList;