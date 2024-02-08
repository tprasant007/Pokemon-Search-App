const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const pokemonName = document.getElementById('pokemon-name');
const pokemonID = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const spriteContainer = document.getElementById('sprite-container');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');


async function getPokemon() {
   try {
    const pokemon = searchInput.value.toLowerCase();
    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemon}`)
    const data = await res.json()

    // set pokemon output from fetch data

    pokemonName.textContent = `${data.name.toUpperCase()}`
    pokemonID.textContent = `#${data.id}`
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;
    spriteContainer.innerHTML = `
      <img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">
    `
    hp.textContent = data.stats[0].base_stat;
    attack.textContent = data.stats[1].base_stat;
    defense.textContent = data.stats[2].base_stat;
    specialAttack.textContent = data.stats[3].base_stat;
    specialDefense.textContent = data.stats[4].base_stat;
    speed.textContent = data.stats[5].base_stat;

    // set pokemon types
    let typesStr = "";
    data.types.forEach((pokemonType => {
        typesStr += `<p class="${pokemonType.type.name}">${pokemonType.type.name.toUpperCase()}</p>`
    }))
    types.innerHTML = typesStr
    console.log(data)
} catch{
    resetDisplay();
    alert('Pokémon not found');
}
}

const resetDisplay = () => {
    const sprite = document.getElementById('sprite');
    if (sprite) sprite.remove();
  
    // reset stats
    pokemonName.textContent = '';
    pokemonID.textContent = '';
    types.innerHTML = '';
    height.textContent = '';
    weight.textContent = '';
    hp.textContent = '';
    attack.textContent = '';
    defense.textContent = '';
    specialAttack.textContent = '';
    specialDefense.textContent = '';
    speed.textContent = '';
  };

searchForm.addEventListener("submit", (e)=> {
    e.preventDefault()
    getPokemon()
})