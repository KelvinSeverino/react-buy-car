import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const CarList = () => {   
    
    const [carData, setCarData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const result = await axios("http://localhost/veiculos");
            setCarData(result.data.data);
        } catch (e) {
            console.log("something Wrong");
        }
    }

    const handleDelete = async(id) => {
        console.log(id)
        await axios.delete("http://localhost/veiculos/"+id);
        const newCarData = carData.filter((item)=>{
            return(
                item.id !== id
            )
        })
        setCarData(newCarData);
    }

    return(
        <div className="container">
            <h3>Lista Carros</h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Ano</th>
                        <th>Portas</th>
                        <th>KM</th>
                        <th>Valor</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        carData.map((car, i) => {
                            return (
                                <tr key={car.id}>
                                    <td>{car.brand + ' ' + car.model + ' ' + car.color}</td>
                                    <td>{car.year}</td>
                                    <td>{car.doors}</td>
                                    <td>{car.km}</td>
                                    <td>{car.price}</td>
                                    <td>
                                        <NavLink to={`/veiculos/view/${car.id}`} className="btn btn-secondary">Abrir</NavLink>
                                        <NavLink to={`/veiculos/edit/${car.id}`} className="btn btn-warning mx-2">Editar</NavLink>
                                        <button onClick={()=>handleDelete(car.id)} className="btn btn-danger">Apagar</button>
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

export default CarList;