import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import api from '../../services/api';

import './styles.css';
import logo from '../../assets/logo.svg';

interface Item {
    id: number,
    title: string,
    image_url: string
}

const CreatePoint = () => {
    //Um estado sempre serve par aarmazenar infos dentro do componente
    //Nome da variável será items, função de alteração setItems, começa vazia.
    //Passamos para o useState a interface Item como um array
    const [items, setItems] = useState<Item[]>([]);

    //Dizemos o que deve ser feito e quanto
    //Com o array vazio, a função vai ser disparada uma única vez
    //Senão, poderíamos colocar por exemplo counter ali para sempre que o counter disparar ele mudar

    //O primeiro parâmetro é o que queremos fazer - neste caso, a nossa api importada, com um get que complementa a URL
    //e usar um then para que ele seja uma promise, que ao ser concluída, dá um console log.
    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        });
    }, []);
    
    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta" />
                <Link to="/">
                    <FiArrowLeft />
                    Voltar para Home
                </Link>
            </header>

            <form>
                <h1>Cadastro do <br/> Ponto de Coleta</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input 
                            type="text"
                            name="name"
                            id="name"
                        />
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="email"
                                name="email"
                                id="email"
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="whatsapp">WhatsApp</label>
                            <input 
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                            />
                        </div>

                    </div>
                </fieldset>
                
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>                        
                    </legend>

                    <Map center={[-27.2092052, -49.6401092]} zoom={15}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={[-27.2092052, -49.6401092]}/>
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf">
                                <option value="0">Selecione uma UF</option>
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city">
                                <option value="0">Selecione uma cidade</option>
                            </select>
                        </div>
                    </div>
                </fieldset>
                
                <fieldset>
                    <legend>
                        <h2>Ítens de Coleta</h2>
                        <span>Selecione um ou mais itens abraço</span>
                    </legend>

                    <ul className="items-grid">
                        //.map() nos permite fazer a varredura do array
                        //Sempre que criamos um estado para um array ou objeto, a gente precisa manualmente informar o tipo da variável
                        //que vai ser armazenada ali dentro

                        //Precisamos ter a interface para falar o formato de ada um

                        {items.map(item => (
                            <li key={item.id}>
                                <img src={item.image_url} alt={item.title}/>
                                <span>{item.title}</span>
                            </li>
                        ))}                        
                        
                    </ul>
                </fieldset>

                <button type="submit">
                    Cadastrar ponto de coleta
                </button>
            </form>
        </div>
    );
};

export default CreatePoint;