var allButtons = document.getElementsByTagName('button');
const copyButtons = [];

for(let n=0; n < allButtons.length; n++){
    copyButtons[n]=allButtons[n];
}

function ResetColors(){  // TO DO
    for(let i=0; i< allButtons.length;i++){
        console.log(copyButtons[i].classList[1]);
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        console.log(copyButtons[i].classList[1]);
        allButtons[i].classList.add(copyButtons[i].classList[1]);
    }
}
function colorChange(color){
    if(color.value === 'Red' || color.value === 'Green'){
        changeToRed(color.value);
    }
    else if(color.value === 'Random'){
        ChangeRandomColors();

    }
    else{
        ResetColors();
    }
}

function changeToRed(nColor){
    for(let n=0;n<allButtons.length;n++){
       allButtons[n].classList.remove(allButtons[n].classList[1]);
       if(nColor ==='Red') { 
           allButtons[n].classList.add('btn-danger');
        }else{ 
            allButtons[n].classList.add('btn-success');
        }
    }
}

function ChangeRandomColors(){
 const colors = ['btn-primary', 'btn-danger', 'btn-success', 'btn-secondary', 'btn-warning'];
 for(let i=0; i< allButtons.length;i++){
    var num =  Math.floor(Math.random() * 5); 
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add(colors[num]);
 }

}
