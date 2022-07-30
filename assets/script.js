const nome = document.querySelector(".pokemon_name");
const number = document.querySelector(".pokemon_number");
const pokemonImage = document.querySelector(".pokemon_image");
const form = document.querySelector(".form");
const input = document.querySelector(".input_search");
const prevButton = document.querySelector(".btn_prev");
const nextButton = document.querySelector(".btn_next");

let searchPokemon = 1;

//função para buscar os pokemons via api (https://pokeapi.co)
const fetchPokemon = async (pokemon)=>{
    
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    //transformando resposta em arquivo json e retornando-a

    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
    
}

//função para renderizar a resposta da api na tela

const renderPokemon = async (pokemon)=>{
    
    number.innerHTML = '';
    nome.innerHTML= "Pesquisando...";
    //recebendo dados
    const data = await fetchPokemon(pokemon);

    //modificando elementos do html, caso tenha dados(pesquisa válida)
    if(data){
        searchPokemon = data.id;
        pokemonImage.style.display = 'block';
        //acessando o caminho das imagens com colchetes ao invés de ponto, pois nesse caso há alguns caracteres do tipo " - " e na passagem por ponto geraria erros.
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        
        
        nome.innerHTML= data.name;
        number.innerHTML = data.id;

        input.value = ""; //depois de renderizar reseta a pesquisa
    }else{
        nome.innerHTML= 'Não encontrado :/';
        number.innerHTML = '';
        pokemonImage.style.display = 'none';
    }
}

//Capturar o que entrou no input do form e assim chamar a função render do que foi digitado
form.addEventListener('submit', (e)=>{
    e.preventDefault();

    renderPokemon(input.value.toLowerCase());
    //coloquei o metodo toLowerCase(), pois a api usada busca com letras minusculas, então tratei esse erro.  
})


//Funcionamento dos botões
prevButton.addEventListener('click', ()=>{
    if(searchPokemon > 1){
        searchPokemon-=1;
        renderPokemon(searchPokemon);
    }
})
nextButton.addEventListener('click', ()=>{
    searchPokemon+=1;
    renderPokemon(searchPokemon);
})

renderPokemon(searchPokemon); //renderizar o primeiro pokemon ao iniciar, para que nao fique vazio



