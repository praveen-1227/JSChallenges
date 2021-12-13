function get(){
    var birth = prompt("Enter your birth year(xxxx).");
    var x = (2021 - birth) * 365;
    var h1 = document.createElement('h1');
    h1.setAttribute('id','ageInDays');
   var y= document.createTextNode('you are '+x+' days old Dumbo 😂');
   h1.appendChild(y);
    document.getElementById('result').appendChild(h1);

}

function reset(){
    document.getElementById('ageInDays').remove();
}