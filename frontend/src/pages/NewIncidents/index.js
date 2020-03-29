import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeftCircle} from 'react-icons/fi';
import api from '../../services/api';

import './style.css';

import logoImg from '../../assets/logo.svg'

export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [description, setDescripton] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value
        };
        try {
            await api.post('incidents', data,{
               headers:{
                   Authorization: ongId,
               } 
            })
            history.push('/profile');
        } catch (error) {
            alert('error ao cadastra um novo caso !!! ')
        }

    }


    return(
        <div className="new-incident-container">
        <div className="content">
           <section>
            <img src={logoImg} alt="Be The hero"/>
            <h1>Cadastra novo caso</h1>
            <p>Descreva o caso detalhadamente para encontrar um heroi para resolver isso.</p>

            <Link className="back-link" to="/profile">
                <FiArrowLeftCircle  size={16} color="#e02041"/>
                    Voltar para home
             </Link>         
           </section>
            <form onSubmit={handleNewIncident}>
                <input  
                placeholder="Titulo do caso"
                value={title}
                onChange={e => setTitle(e.target.value)}
                 
                />
                <textarea 
                type="email"  
                placeholder="descrição"
                value={description}
                onChange={e => setDescripton(e.target.value)}
                />
                <input      
                placeholder="Valor em R$"
                value={value}
                onChange={e => setValue(e.target.value)}
                />
                
                <button className="button" type="submit">Cadastra</button>
            </form>
        </div>  
   </div>
    );
}