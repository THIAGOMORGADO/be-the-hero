import React, {useState} from 'react';

import {Link, useHistory} from 'react-router-dom'
import {FiLogIn} from 'react-icons/fi'

import './style.css'

import logoImg from '../../assets/logo.svg'
import heroImg from '../../assets/heroes.png';

import api from '../../services/api'

export default function Login (){
    const [id, setId] = useState('');
    const history = useHistory();
    
    async function HandlerLogin(e){
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });

            console.log(response.data.name);
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile');

        } catch (error) {
            alert(error)
        }

    }

    return(
       <div className="logon-container">
           <section className="form">
             <img src={logoImg} alt="Be The Hero" />
             <form onSubmit={HandlerLogin}>
                 <h1>Faça seu logon</h1>
                 <input 
                 placeholder="sua ID"
                 value={id}
                 onChange={e => setId(e.target.value)}
                 />
                 <button className="button" type="submit">Entra</button>
                 <Link className="back-link" to="/register">
                    <FiLogIn  size={16} color="#e02041"/>
                        Não Tenho Cadastro
                 </Link>
             </form>
           </section>

           <img src={heroImg} alt="Heroes" />
       </div>
    );
}