function rpsGame(yourChoice){
    var yourChoice, botChoice;
    yourChoice =yourChoice.id;
    botChoice = randomChoice();
    var result = rpsData(yourChoice, botChoice);
    message = rpsFinalResult(result);
    rpsFrontEnd(yourChoice,message,botChoice);

}
// pick random number [0-3] i.e., bot choice
function randomChoice(){
    return ['rock', 'paper', 'scissors'][Math.floor(Math.random() *3)];
}

// returns final result 
function rpsData(yourChoice,botChoice){
   var data = {
        'rock' : {'scissors':1, 'rock' : 0.5, 'paper':0},
        'paper' : {'rock' : 1, 'paper' : 0.5, 'roscissorsck' : 0},
        'scissors' : {"paper" : 1, 'scissors' : 0.5, 'rock' : 0}
   };
   return data[yourChoice][botChoice];
}

// returns message object
function rpsFinalResult(result){
    if(result === 0){
        return {'message' : 'You lost', 'color':'red'};
    }
    else if(result === 0.5){
        return {'message' : 'Draw', 'color':'yellow'};
    }
    else{
        return {'message' : 'You Won', 'color':'Green'};
    }
}

// show results in html page
function rpsFrontEnd(yourChoice,message,botChoice){
    var imgData = {
        'rock' : document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors' : document.getElementById('scissors').src  };

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');
    console.log(document.getElementById('rock').src);

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();
    
    
    humanDiv.innerHTML = "<img src="+ imgData[yourChoice]+" height=150 width=150 />";
    botDiv.innerHTML = "<img src="+ imgData[botChoice]+" height=150 width=150 />";
    messageDiv.innerHTML="<h1 style='color:" +message['color']+ "; font-size: 80px; padding:30px '>"+message['message']+"</h1>"; 
    document.getElementById('rpsPick').appendChild(humanDiv).appendChild(messageDiv).appendChild(botDiv).displ;


}