const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0


function loadPokemonItems(offset, limit) {  
    function convertPokemonToLi(pokemon) {
        return `
            <li class="pokemon ${pokemon.types[0]}"  id="${pokemon.number}">
                <span class="number">${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
    
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
    
                    <img src="${pokemon.photo}" 
                         alt="${pokemon.name}">
                </div>
                <a href="details.html" class="btn ${pokemon.types[0]}" id="${pokemon.number}">Saber mais</a>
            </li>
        `
    }
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi
        ).join('')
        pokemonList.innerHTML += newHtml
        //pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')
        // Pega cada pokemon e cria uma lista de li, depois junta eles sem separador (''). Vira um html novo e concatena com o antigo.
    }) 
}



loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit

    if( qtdRecordNextPage >= maxRecords ) {
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItems(offset, limit)
    }
})

function showDetailsPokemon(pokemon) {
    return `
        <div class="container-main">
            <div class="container-name">
                <span class="name">${pokemon.name}</span>
                <span class="number">${pokemon.number}</span>
            </div>
            <div class="container-image">
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        
        </div>
        <div class="container-details">
            <div class="menu">
                <span>Sobre</span>
            </div>
            <div class="about">
                <div class="feature height">Height: ${pokemon.height}</d>
                <div class="feature weight">Weight: ${pokemon.weight}</d>
            </div>
            <span class="types"></span>
        </div>
    `
}

const btn = document.getElementsByClassName('btn')
btn.addEventListener('click', (e) => {
    console.log(e);
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(showDetailsPokemon
        ).join('')
    })
})
  
       

