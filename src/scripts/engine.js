function resetGame() {
    // Reset scores
    document.getElementById('score-win').innerText = '0';
    document.getElementById('score-lose').innerText = '0';

    // Reset player and challenger cards
    document.getElementById('player-card-image').src = '';
    document.getElementById('challenger-card-image').src = '';

    // Reset round information
    document.getElementById('card-name').innerText = '';
    document.getElementById('card-type').innerText = '';
}

function resetDuel(){
 document.getElementById('next-duel').addEventListener('click', () => {
     resetGame();
 });
}

function init() {
    document.getElementById('start-duel-button').addEventListener('click', () => {
    //const welcomeCard = new WelcomeCard('Welcome to the YUGIOH Game', 'Get ready to duel!');
    //document.body.appendChild(welcomeCard.render());
    document.getElementsByClassName('welcome-card')[0].style.display = 'none';
    document.getElementsByClassName('main-game-card')[0].style.display = 'flex';
});

}
init();

