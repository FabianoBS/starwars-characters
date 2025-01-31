let currentPageUrl = 'https://swapi.dev/api/people/';

window.onload = async () => {
    try {
        await loadCharacters(currentPageUrl); // Conectar com a API
        console.log('Sucesso ao conectar com a API');
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar cards');
    }

    const nextButton = document.getElementById('next-button');
    nextButton.addEventListener('click', loadNextPage);

    const backButton = document.getElementById('back-button');
    backButton.addEventListener('click', loadPreviousPage);
};

async function loadCharacters(url) {
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
            card.style.backgroundImage = 
            `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`;
            card.className = "cards";

            const characterNameBg = document.createElement("div");
            characterNameBg.className = "character-name-bg";

            const characterName = document.createElement("span");
            characterName.className = "character-name";
            characterName.innerHTML = `${character.name}`;

            characterNameBg.appendChild(characterName);
            card.appendChild(characterNameBg);

            card.onclick = () => {
                const modal = document.getElementById("modal");
                modal.style.visibility = "visible";
                
                const modalContent = document.getElementById("modal-content");
                modalContent.innerHTML = '';

                const characterImage = document.createElement("div");
                characterImage.style.backgroundImage =  
                `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`;
                characterImage.className = "character-image";

                const name = document.createElement("span");
                name.className = "character-details";
                name.innerText = `Nome: ${character.name}`;

                const characterHeight = document.createElement("span");
                characterHeight.className = "character-details";
                characterHeight.innerHTML = `Altura: ${convertHeight(character.height)}`;

                const mass = document.createElement("span");
                mass.className = "character-details";
                mass.innerText = `Peso: ${convertMass(character.mass)}`;

                const eyeColor = document.createElement("span");
                eyeColor.className = "character-details";
                eyeColor.innerText = `Cor dos olhos: ${convertEyeColor(character.eye_color)}`;

                const birthYear = document.createElement("span");
                birthYear.className = "character-details";
                birthYear.innerText = `Nascimento: ${convertBirthYear(character.birth_year)}`;

                modalContent.appendChild(characterImage);
                modalContent.appendChild(name);
                modalContent.appendChild(characterHeight);
                modalContent.appendChild(mass);
                modalContent.appendChild(eyeColor);
                modalContent.appendChild(birthYear);
            };

            const mainContent = document.getElementById('main-content');
            mainContent.appendChild(card);
        });

        // Habilita ou desabilita os botões de acordo com a presença de URLs de próxima e página anterior
        const nextButton = document.getElementById('next-button');
        const backButton = document.getElementById('back-button');
        nextButton.disabled = !responseJson.next;
        backButton.disabled = !responseJson.previous;

        backButton.style.visibility = responseJson.previous? "visible" : "hidden";

        currentPageUrl = url;

    } catch (error) {
        alert('Erro ao carregar os personagens');
        console.log(error);
    }
};

async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadCharacters(responseJson.next);

    } catch (error) {
        console.log(error);
        console.log('Erro ao carregar a próxima página');
    }
};

async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadCharacters(responseJson.previous);

    } catch (error) {
        console.log(error);
        console.log('Erro ao carregar a página anterior');
    }
};

function hideModal() {
    const modal = document.getElementById("modal");
    modal.style.visibility = "hidden";
}

function convertEyeColor(eyeColor) {
    const cores = {
        blue: "azul",
        brown: "marrom",
        green: "verde",
        yellow: "amarelo",
        black: "preto",
        pink: "rosa",
        red: "vermelho",
        orange: "laranja",
        hazel: "avela",
        unknown: "desconhecida"
    };

    return cores[eyeColor.toLowerCase()] || eyeColor;
};

function convertHeight(height) {
    if (height === "unknown") {
        return "desconhecida"
    }

    return (height / 100).toFixed(2);
};

function convertMass(mass) {
    if (mass === "unknown") {
        return "desconhecido"
    }

    return `${mass} kg`;
};

function convertBirthYear(birthYear) {
    if (birthYear === "unknown") {
        return "desconhecido"
    }

    return birthYear;
};