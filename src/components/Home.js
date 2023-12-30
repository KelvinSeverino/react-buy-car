import React, { } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <div className="container">
            <h2 className='w-100 d-flex justify-content-center p-3'>Home | BuyCar</h2>
            <div className="row">
                <div className="col">
                    <div className="card mb-4 rounded-3 shadow-sm">
                        <div className="card-header py-3">
                            <h4 className="my-0 fw-normal">Simulação Venda</h4>
                        </div>
                        <div className="card-body">
                            <Link type="button" className="w-100 btn btn-lg btn-primary" to="/simulacao">Abrir</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="card mb-4 rounded-3 shadow-sm">
                        <div className="card-header py-3">
                            <h4 className="my-0 fw-normal">Carros (CRUD)</h4>
                        </div>
                        <div className="card-body">
                            <Link type="button" className="w-100 btn btn-lg btn-primary" to="/carros">Abrir</Link>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card mb-4 rounded-3 shadow-sm">
                        <div className="card-header py-3">
                            <h4 className="my-0 fw-normal">Marcas (CRUD)</h4>
                        </div>
                        <div className="card-body">
                            <Link type="button" className="w-100 btn btn-lg btn-success" to="/marcas">Abrir</Link>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card mb-4 rounded-3 shadow-sm">
                        <div className="card-header py-3">
                            <h4 className="my-0 fw-normal">Modelos (CRUD)</h4>
                        </div>
                        <div className="card-body">
                            <Link type="button" className="w-100 btn btn-lg btn-primary" to="/modelos">Abrir</Link>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card mb-4 rounded-3 shadow-sm">
                        <div className="card-header py-3">
                            <h4 className="my-0 fw-normal">Cores (CRUD)</h4>
                        </div>
                        <div className="card-body">
                            <Link type="button" className="w-100 btn btn-lg btn-primary" to="/cores">Abrir</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) 
}

export default Home;