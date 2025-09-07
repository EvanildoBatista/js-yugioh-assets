//const { act } = require("react");

const state = {
    scores: {
        player: 0,
        challenger: 0,
        box: document.getElementById('score-card'),
        win: document.getElementById('score-win'),
        lose: document.getElementById('score-lose'),
    },
    cardSprites: {
        playerCardImage: document.getElementById("player-card-image"),
        //challengerCardImage: document.getElementById("challenger-card-image"),
        cardName: document.getElementById("card-name"),
        cardType: document.getElementById("card-type"),
    },
    fieldCards: {
        playerFieldCard: document.getElementById("player-field-card"),
        challengerFieldCard: document.getElementById("challenger-field-card"),
    },
    playerSides: {
        playerFieldCard: "player-deck-card",
        challengerFieldCard: "challenger-deck-card"
    },
    actions: {
        nextDuelButton: document.getElementById("next-duel-button"),
    },
    cardDeck: {
        challengerDeckCard: document.getElementById("challenger-deck-card"),
        playerDeckCard: document.getElementById("player-deck-card"),
    }
    /*
    player: {
        card: null,
        score: 0
    },
    challenger: {
        card: null,
        score: 0
    },
    round: 1
    */
};


const cardImagesPath = "./src/assets/icons";

const cardImageBack = cardImagesPath + "/card-back.png";

const cardData = [
    {
        id: 0,
        name: "Blue-Eyes White Dragon",
        type: "Paper",
        image:  `${cardImagesPath}/dragon.png`,
        winOf: [1],
        loseOf: [2],
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        image:  `${cardImagesPath}/magician.png`,
        winOf: [2],
        loseOf: [0],
    },
    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        image:  `${cardImagesPath}/exodia.png`,
        winOf: [0],
        loseOf: [1],
    }
];

async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

async function createCardImage(cardId, deckSide){
    const cardImage = document.createElement('img');
    cardImage.setAttribute("height", "80rem")
    cardImage.setAttribute("src", cardImageBack);
    cardImage.setAttribute("data-card-id", cardId);
    cardImage.classList.add("card-back");

    if(deckSide === state.playerSides.playerFieldCard) {
        cardImage.setAttribute("data-player-side", "true");

        cardImage.addEventListener("click", () => {
            state.actions.nextDuelButton.style.display = "inline-block";
            setCardsField(cardImage.getAttribute("data-card-id"));
        });

        cardImage.addEventListener("mouseover", () => {
            drawSelectedCard(cardId);
        });
    }


    return cardImage;
}


async function setCardsField(playerCardId) {
    // Set the selected card for the player
    await removeAllCardsImages();

    let challengerCardId = await getRandomCardId();

    let fieldCard = state.fieldCards;

    fieldCard.playerFieldCard.style.display = "block";
    fieldCard.challengerFieldCard.style.display = "block";

    fieldCard.playerFieldCard.src = cardData[playerCardId].image;
    fieldCard.challengerFieldCard.src = cardData[challengerCardId].image;

    let duelResult = await checkDuelResult(playerCardId, challengerCardId);

    await updateScores(duelResult);
    await drawButton(duelResult);
}

async function updateScores(duelResult) {
    //let scoreBoard = state.scores.box;
    state.scores.win.innerText = state.scores.player;
    state.scores.lose.innerText = state.scores.challenger;
    //document.getElementById("round-number").innerText = `Round: ${++state.round}`;
    /*
    scoreBoard.innerHTML = `
        <p>Player Score: ${state.scores.player}</p>
        <p>Challenger Score: ${state.scores.challenger}</p>
        <p>Round: ${state.round}</p>
    `;
    */
}

async function drawButton(duelResult) {

    let button = state.actions.nextDuelButton;
    button.innerText = duelResult.toUpperCase();
    button.style.display = "block";
    /*
    button.onclick = async () => {
        button.style.display = "none";
        await setCardsField(await getRandomCardId());
    };
    */
}

async function checkDuelResult(playerCardId, challengerCardId) {
    let duelResult = "Draw";
    let cardVerify = cardData[playerCardId];
    if (cardVerify.winOf.includes(challengerCardId)) {
        duelResult = "win";
        state.scores.player++;
    } else if (cardVerify.loseOf.includes(challengerCardId)) {
        duelResult = "lose";
        state.scores.challenger++;
    }

    await playAudio(duelResult);

    return duelResult;
    /*
    if (cardData[playerCardId].winOf.includes(challengerCardId)) {
        return "player";
    } else if (cardData[playerCardId].loseOf.includes(challengerCardId)) {
        return "challenger";
    } else {
        return "draw";
    }
    */
}

// async function removeAllCardsImages() {
//     let cards = document.querySelector("right-pannel-deck");
//     let imgElements = cards.querySelectorAll("img");

//     imgElements.forEach(img => img.remove());

// }

async function removeAllCardsImages() {
    let pannelCardDeck = document.getElementsByClassName("right-pannel-deck");
    for (let i = 0; i < pannelCardDeck.length; i++) {
        pannelCardDeck[i].innerHTML = "";
    }
    // for (let key in state.fieldCards) {
    //     state.fieldCards[key].src = cardImageBack;
    // }
}

async function drawSelectedCard(cardId) {
    let sprite = state.cardSprites;
    let cardItem = cardData[cardId];
    sprite.playerCardImage.src = cardItem.image;
    sprite.cardName.innerText = cardItem.name;
    sprite.cardType.innerText = `Type: ${cardItem.type}`;

}

async function drawCards(cardAmount, deckSide) {

    for (let i = 0; i < cardAmount; i++) {
        const randomCardId = await getRandomCardId();
        const cardImage = await createCardImage(randomCardId, deckSide);
        
        document.getElementById(deckSide).appendChild(cardImage);
    }
}

function resetDuel() {
    /*
    state.scores.player = 0;
    state.scores.challenger = 0;
    state.round = 1;
    */
    state.actions.nextDuelButton.style.display = 'none';
    state.fieldCards.playerFieldCard.style.display = 'none';
    state.fieldCards.challengerFieldCard.style.display = 'none';

    // Reset scores
    //state.scores.win.innerText = '0';
    //state.scores.lose.innerText = '0';

    // Reset player and challenger cards
    state.cardSprites.playerCardImage.src = '';
    //state.cardSprites.challengerCardImage.src = '';

    // Reset round information
    state.cardSprites.cardName.innerText = '';
    state.cardSprites.cardType.innerText = '';

    init();
}

/*
function resetDuel(){
    document.getElementById('next-duel').addEventListener('click', () => {
        resetGame();
    });
}
*/

async function playAudio(status){
    let audio = new Audio(`./src/assets/audios/${status}.wav`);
    try {
        await audio.play();
    } catch (error) {
        console.error("Error playing audio:", error);
    }
}

function init() {
    drawCards(5, state.playerSides.playerFieldCard);
    drawCards(5, state.playerSides.challengerFieldCard);
    state.actions.nextDuelButton.style.display = 'none';
    const bgm = document.getElementById("bgm");
    bgm.volume = 0.2;
    bgm.play();
};

init();
