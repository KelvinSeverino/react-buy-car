import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const BrandList = () => {

    const [brandData, setBrandData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const result = await axios("http://localhost/marcas");
            setBrandData(result.data.data);
        } catch (e) {
            console.log("something Wrong");
        }
    }

    const handleDelete = async(id) => {
        console.log(id)
        await axios.delete("http://localhost/marcas/"+id);
        const newBrandData = brandData.filter((item)=>{
            return(
                item.id !== id
            )
        })
        setBrandData(newBrandData);
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
                        brandData.map((brand, i) => {
                            return (
                                <tr key={brand.id}>
                                    <td>{brand.name}</td>
                                    <td>
                                        <NavLink to={`/marcas/view/${brand.id}`} className="btn btn-secondary">Abrir</NavLink>
                                        <NavLink to={`/marcas/edit/${brand.id}`} className="btn btn-warning mx-2">Editar</NavLink>
                                        <button onClick={()=>handleDelete(brand.id)} className="btn btn-danger">Apagar</button>
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

export default BrandList;