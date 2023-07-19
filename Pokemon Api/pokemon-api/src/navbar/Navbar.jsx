import './navbar.css'
import { useState, useEffect } from 'react';
import search from './icons/search.svg'
import { Display } from '../components';
import {App} from '../App.js'


const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonList, setPokemonList] = useState([]);


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const searchUrl = `https://pokeapi.co/api/v2/pokemon/${searchTerm}`;
  
    if (event.target.value !== '') {
      fetch(searchUrl)
        .then(response => {
          if (response.status === 404){
            throw new Error ('Pokemon not found')
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          setPokemonList([data]);
        })
        .catch(error => console.error(error));
    } 
  
    var listOfPokemons = document.getElementsByClassName('list-of-pokemons')[0];
    var buttons = document.getElementById('buttons');
    var main = document.getElementById('root');
  
    if (listOfPokemons !== null && listOfPokemons !== undefined) {
      main.removeChild(listOfPokemons);
    }
  
    if (buttons !== null && buttons !== undefined) {
      main.removeChild(buttons);
    }
  
    const POKEMON = document.createElement('div');
    POKEMON.classList.add('list-of-pokemons');
  
    pokemonList.forEach((pokemon) => {
      const pokemonDiv = document.createElement('div');
      pokemonDiv.classList.add('pokemon');
  
      const pokemonName = document.createElement('h3');
      pokemonName.textContent = pokemon.name;
      pokemonDiv.appendChild(pokemonName);
  
      if (pokemon.sprites && pokemon.sprites.front_default) {
        const pokemonImage = document.createElement('img');
        pokemonImage.src = pokemon.sprites.front_default;
        Object.assign(pokemonImage.style, {
          width: '400px',
          height: '400px',
    })
        pokemonDiv.appendChild(pokemonImage);
      }
  
      POKEMON.appendChild(pokemonDiv);
    });
    
    Object.assign(POKEMON.style, {
      height: '100%',
      width: '100',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    })
    
    document.body.style.backgroundColor = 'white';
    main.appendChild(POKEMON);
  };

  // function regen(){
  //   return(
  //     <>
  //     <App/>
  //     </>
  //   )
  // }
  return (
    <>
      <nav>
        <h2>Pokemon <span>Api</span> </h2>
        <div className="menu-div">
          <a href="#" className="menu">Home</a>
          <a href="#" className="menu">About</a>
          <a href="#" className="menu">Help</a>
          <a href="#" className="menu">Pokemons</a>
          <a href="#" className="menu">Filters</a>
        </div>
        <div className='div-search'>
          <input type="text" placeholder="Search.." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <button type='button' onClick={handleSearch}><img src={search} alt=""  /></button>

        </div>
      </nav>
    </>
  );
};

export default Navbar;