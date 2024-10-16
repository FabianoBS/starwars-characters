let currentPageUrl = 'https://swapi.dev/api/people';
let currentPage = 0; // Página atual
// const charactersPerPage = 50; // Número de personagens por página
// let totalCharacters = 1431; // Total de personagens disponíveis

window.onload = async () => {
    try {
        await loadCharacters(currentPageUrl, currentPage); // Conectar com a API
        console.log('Sucesso ao conectar com a API');
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar cards');
    }
};

async function loadCharacters(url, page) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = ''; // Limpar os resultados anteriores

    try {
        const response = await fetch(url);
        console.log(response); // Verificar o recebimento dos dados
        if (!response.ok) throw new Error(`Erro na rede: ${response.status} ${response.statusText}`);
        const responseJson = await response.json();
        console.log(responseJson); // Verificar a estrutura dos dados

        responseJson.results.forEach((character) => {
            const card = document.createElement("div");
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`;
            card.className = "cards";

            const characterNameBg = document.createElement("div");
            characterNameBg.className = "character-name-bg";

            const characterName = document.createElement("span");
            characterName.className = "character-name";
            characterName.innerHTML = `${character.name}`;

            characterNameBg.appendChild(characterName);
            card.appendChild(characterNameBg);

            mainContent.appendChild(card);
        });

        currentPageUrl = url;

    } catch (error) {
        alert('Erro ao carregar os personagens');
        console.log(error);
    }
};