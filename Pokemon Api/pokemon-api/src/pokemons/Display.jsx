import './display.css'
import React, { useState, useEffect} from 'react';


const Display = () =>{
    
    function dontDisplay (){
        const moreInfoDiv = document.getElementById('more-info');
        if (moreInfoDiv) {
          moreInfoDiv.parentNode.removeChild(moreInfoDiv);
        }
    }

  const [pokemonList, setPokemonList] = useState([]);
  useEffect(() => {
    const storedStart = localStorage.getItem('start');
    const storedEnd = localStorage.getItem('end');
    let start = parseInt(storedStart);
    let end = parseInt(storedEnd);
    if (isNaN(start) || isNaN(end)) {
      start = 0;
      end = 4;
      localStorage.setItem('start', start);
      localStorage.setItem('end', end);
    }
    fetchPokemons(start, end);
  }, []);



  const moreInfo = (name) => {
    const moreInfoDiv = document.createElement('div');
    moreInfoDiv.id = 'more-info';
  
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => response.json())
      .then((data) => {
        const crossImage = document.createElement('img')
        crossImage.src = 'cross.png'
        crossImage.id = 'cross-image'

        const img = document.createElement('img');
        img.src = data.sprites.front_default;
        moreInfoDiv.appendChild(img);
  
        const name = document.createElement('div');
        const crossButton = document.createElement('button')
        name.textContent = data.name;
        moreInfoDiv.appendChild(name);
        crossButton.id = 'cross-button'
        crossButton.onclick = dontDisplay
        crossButton.appendChild(crossImage)
        moreInfoDiv.appendChild(crossButton)

        
  
        const abilities = document.createElement('div');
        abilities.textContent = data.abilities.map((ability) => ability.ability.name).join(', ');
        moreInfoDiv.appendChild(abilities);
  
        Object.assign(moreInfoDiv.style, {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          justifyContent: 'space-around',
          width: '40rem',
          height: '40rem',
          border: '1px solid black',
          borderRadius: '40px',
          position: 'relative', 
          zIndex: '2',
          margin: '0 auto',
          bottom: '50rem',

        });
        
  
        document.body.appendChild(moreInfoDiv);
      })
      .catch((error) => console.log(error));
  };

  function fetchPokemons(start, end) {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=4&offset=${start}`)
    .then((response) => response.json())
    .then((data) => {
      const promises = data.results.map((result) => {
        return fetch(result.url).then((response) => response.json());
      });
      Promise.all(promises).then((pokemonData) => {
        setPokemonList(pokemonData);
      });
    })
    .catch((error) => console.log(error));
}

// Rest of the code...


  function nextButton() {
    const storedStart = localStorage.getItem('start');
    const storedEnd = localStorage.getItem('end');
    let start = parseInt(storedStart);
    let end = parseInt(storedEnd);
    if (isNaN(start) || isNaN(end)) {
      start = 0;
      end = 4;
    }
    start += 4;
    end += 4;
    localStorage.setItem('start', start);
    localStorage.setItem('end', end);
    fetchPokemons(start, end);
  }

  function backButton(){
    const storedStart = localStorage.getItem('start');
    const storedEnd = localStorage.getItem('end');
    let start = parseInt(storedStart);
    let end = parseInt(storedEnd);
    if (isNaN(start) || isNaN(end)) {
      start = 0;
      end = 4;
    }
    if (start > 0){
        start -= 4;
        end -= 4;
    }
    
    localStorage.setItem('start', start);
    localStorage.setItem('end', end);
    fetchPokemons(start, end);
  }
    

  
  return (
      <>
          <div className="list-of-pokemons">
              {pokemonList.map((pokemon) => (
                  <div className="pokemon-card" key={pokemon.name} name={pokemon.name}>
                      <img src={pokemon.sprites.front_default} alt="" />
                      {pokemon.name}
                      <button type='button' id='more' onClick={() => moreInfo(pokemon.name)}>More</button>
                  </div>
              ))}
          </div>
          <div id="buttons">
              <button type="button" id="next" onClick={nextButton}>
                  Next
              </button>
              <button type="button" id="back" onClick={backButton}>
                  Back
              </button>
          </div>
      </>
  )  
              }

export default Display