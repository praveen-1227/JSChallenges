document.querySelector('#btn-hit').addEventListener('click',blackJackHit);
document.querySelector('#btn-stand').addEventListener('click',blackJackstand);
document.querySelector('#btn-deal').addEventListener('click',blackJackDeal);

var blackJackGame = {
    'you' : {'spanScore' : '#yourResult', 'div': '#yourBox', 'score' : 0},
    'bot' : {'spanScore' : '#botResult', 'div': '#botBox', 'score' : 0},
    'cards': ['2','3','4','5','6','7','8','9','10','A','J','Q','K'],
    'cardsMap' : {'2' :2,'3' :3,'4' :4,'5' :5,'6' :6,'7' :7,'8' :8,'9' :9,'10' :10,'A':[1,11],'J':10,'Q':10,'K':10},
    'wins' :0,
    'losses':0,
    'draws':0,
    'isStand' : false,
    'turnsOver': false,
    'isHit' : false,
};

const YOU = blackJackGame['you'];
const BOT = blackJackGame['bot'];
const hitSound = new Audio('static/sounds/swish.mp3');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');
function blackJackHit(){
    if(blackJackGame['isStand'] === false){
        blackJackGame['isHit'] = true;
        let card = randomPick();
        showCard(card,YOU);
        updateScore(card,YOU);
        showScore(YOU);
    }
}
function sleep(ms){

    return new Promise(resolve => setTimeout(resolve,ms));
}
async function blackJackstand(){
        blackJackGame['isStand'] = true;
    while(BOT['score'] < 20 && blackJackGame['isStand'] === true){
    let card = randomPick();
    showCard(card,BOT);
    updateScore(card,BOT);
    showScore(BOT);
    await sleep(1000);
}  
        let winner = finalResults();
        showResults(winner);
        blackJackGame['turnsOver'] = true;
 
}

function randomPick(){
    var number = Math.floor(Math.random() * 13);
   return blackJackGame['cards'][number];
}
function showCard(card,activePlayer){
    let cardImg = document.createElement('img');
    cardImg.src= 'static/images/'+card+'.png';
    document.querySelector(activePlayer['div']).appendChild(cardImg);
    hitSound.play();
}

function blackJackDeal(){
   if(blackJackGame['turnsOver'] === true){
       blackJackGame['isStand'] = false;
    let images = document.querySelector('#yourBox').querySelectorAll('img');
    let dealImages = document.querySelector('#botBox').querySelectorAll('img');
    console.log(images);
    for(let i=0; i< images.length;i++){

        images[i].remove();
    }
    for(let i=0; i< dealImages.length;i++){

        dealImages[i].remove();
    }
    YOU['score'] = 0;
    BOT['score'] = 0;
    document.querySelector('#yourResult').textContent= 0;
    document.querySelector('#botResult').textContent= 0;
    document.querySelector('#yourResult').style.color= 'white';
    document.querySelector('#botResult').style.color= 'white';
    document.querySelector('#blackjack_result').textContent= 'Lets Play';
    document.querySelector('#blackjack_result').style.color= 'black';
    hitSound.play();
 }
}

function updateScore(card,activePlayer){
    if(card === 'A'){
        if(activePlayer['score'] + blackJackGame['cardsMap'][card][1] < 21){
            activePlayer['score'] += blackJackGame['cardsMap'][card][1];
        }else{
            activePlayer['score'] += blackJackGame['cardsMap'][card][0];
        }

    }else{
        activePlayer['score'] += blackJackGame['cardsMap'][card];
    }
}

function showScore(activePlayer){
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['spanScore']).textContent = 'BUST!😜';
        document.querySelector(activePlayer['spanScore']).style.color = 'red';
    }else{
    document.querySelector(activePlayer['spanScore']).textContent = activePlayer['score'];
    }
}

function finalResults(){
    let winner;
    if(YOU['score'] <= 21){
        if(YOU['score'] < BOT['score'] || BOT['score'] > 21){
            blackJackGame['wins']++;
            winner = YOU;
        }
        else if(BOT['score'] < YOU['score']){
            blackJackGame['losses']++;
            winner = BOT;
        }else if(YOU['score'] === BOT['score']){
            blackJackGame['draws']++;
        }
    }else if(YOU['score'] > 21 && BOT['score'] <=21){
        blackJackGame['losses']++;
        winner = BOT;
    }else if(YOU['score'] > 21 && BOT['score'] > 21){
        blackJackGame['draws']++;
    }
    return winner;
}

function showResults(winner){
let message, messageColor;
if(blackJackGame['turnsOver'] === true){
    if(winner === YOU){
        document.querySelector('#wins').textContent = blackJackGame['wins'];
        message = 'You Won !';
        messageColor= 'green';
        winSound.play();
    }else if(winner === BOT){
        document.querySelector('#losses').textContent = blackJackGame['losses'];
        message = 'You Lost !';
        messageColor= 'red';
        lossSound.play();
    }else{
        document.querySelector('#draws').textContent = blackJackGame['draws'];
        message = 'Draw !';
        messageColor= 'black';
    }

    document.querySelector('#blackjack_result').textContent= message;
    document.querySelector('#blackjack_result').style.color= messageColor;
}
}