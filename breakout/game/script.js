var canvas = document.getElementById("myCanvas");//referenca za objekat canvasa
var ctx = canvas.getContext("2d");//dobijanje contexta
var score = document.getElementById("score");//kanvas za score
var ballRadius = 10;//radius lopte
var x = canvas.width/2;//x osa pozicije lopte
var y = canvas.height-30;//y osa pozicije lopte
var dx = 2;//ugao pomjeranja x osa
var dy = -2;//ugao pomjeranje y osa
var paddleHeight = 15;//visina  reketa
var paddleWidth = 80;//sirina reketa
var paddleX = (canvas.width-paddleWidth)/2;//x osa pozicije reketa
var rightPressed = false, leftPressed = false;//zadana vrijednost za oba je false jer nisu pritisnuti na pocetku
var brickRowCount = 99, brickColumnCount=99 ;//broj redova i cigili (ne dirati)
var brickWidth = 75, brickHeight = 20;//sirina i visina cigli
var brickPadding = 10;//razmak izmedju cigli 
var brickOffsetTop = 40;//razmak od gornje ivice canvasa
var brickOffsetLeft = 30;//razmak od lijeve ivice canvasa
var score = 0,lives;//rezultat i zivoti
var speed;//vrijednost preuzeta sa radioBtn koja ce odrediti brzinu
var tezina;//služi za određivanje koja muzika će biti puštena
var color;//boje cigli lopte i reketa se mjenjaju u zavvisnosti od levela
var audio, bounce, wall_hit,game_over;//promjenjive za audio zvukove
var crvena=5, bojaP, status=1; //Varijable za promjene boja

bounce=document.getElementById("bounce");//zvuk kad lopta udari reket
wall_hit=document.getElementById("wall_hit");//zvuk kad lopta udara zid ili ciglu
game_over=document.getElementById("game_over");//zvuk kada se izgubi zivot

var bricks = [];//niz cigli
for(var c=0; c<brickColumnCount; c++) {//prva petlja za broj redova cigli
  bricks[c] = [];
  for(var r=0; r<brickRowCount; r++) {//druga za broj cigli u redu
    bricks[c][r] = { x: 0, y: 0, 
      status: 1//dok god je status 1 znaci da je cigla ziva 
  }
}}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
  /*    prvi parametar-string koji odredjuje ime eventa
        drugi parametar-funkcija koju treba pokrenuti
        treci parametar-optional  */

function keyDownHandler(e) {//funkcija povjerava da li je pritisnuta tipka
  if(e.keyCode == 39) {//keycode-znakovni kljuc tipke
    rightPressed = true;//kad pritisnemo mjenjamo vrijednost u ture
  }
  else if(e.keyCode == 37) {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = false;//kada pustimo tipku vraca se u false
  }
  else if(e.keyCode == 37) {
    leftPressed = false;
  }
}
function mouseMoveHandler(e) {//pomjeranja reketa misom
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth/2;
  }//pratimo kordinate pointera i tako pomjeramo reket
}
function collisionDetection() {//provjera udarca lopte u ciglu
  //petljama prolazimo kroz niz cigli
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight)/*
            Ako je X položaj lopte je veći od x položaja cigle i 
            X položaj lopte je manji od x položaja cigle plus njezine širine i
            Y položaj lopte je veći od položaja y cigle i
            Y položaj lopte je manji od y položaja cigle i njegove visine.
          */ {
          dy = -dy;//ako je lopta se nasla na kordinatama jedne od cigle mjenjamo njen smjer
          b.status = 0;//brisemo ciglu
           wall_hit.play();
          score++;//povecavamo rezultat
          if(score == brickRowCount*brickColumnCount) {//kad sve cigle srusimo
            audio.pause();//kad korisnik pobjedi muzika prestaje
            alert("YOU WIN, CONGRATS!");
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawBall() {//funkcija za crtanje lopte
  ctx.beginPath();//pocni crtati
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
   /* prvi parametar-x kordinata sredista kruznice
          drugi parametar-y kordinata sredista kruznice
          treci parametar-radius kruga
          cetvrti parametar-pocetni ugao crtanja
          peti parametar-krajni ugao crtanja */
  if (document.getElementById("easy").checked) ctx.fillStyle = color;
  if (document.getElementById("medium").checked) ctx.fillStyle = color;
  if (document.getElementById("hard").checked) ctx.fillStyle = "#F00";
  //ctx.fillStyle = color;//boja elementa
  ctx.fill();//popuni elemenat bojom
  ctx.closePath();//zavrsi crtanje
}
function drawPaddle() {//funkcija za crtanje reketa
  ctx.beginPath();//pocni crtat
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
   /*prvi parametar-x kordinata gornjeg lijevog ugla pravouganika
         drugi parametar-y kordinata gornjeg lijevog ugla pravouganika
         treci parametar-sirina reketa
         cetvrti parametar-visina reketa 
       */
  if (document.getElementById("easy").checked) ctx.fillStyle = color;
  if (document.getElementById("medium").checked) ctx.fillStyle = color;
  if (document.getElementById("hard").checked) ctx.fillStyle = "#F00";
  //ctx.fillStyle = color;//boja reketa
  ctx.fill();//popuni bojom reket
  ctx.closePath();//zavrsi crtanje
}
function drawBricks() {//funkcija za crtanje cigli
  for(var c=0; c<brickColumnCount; c++) {//sve cigle su u dvodimenzijalnom nizu(c-red)
    for(var r=0; r<brickRowCount; r++) {//broj cigli u redu
      if(bricks[c][r].status == 1) {//dok je status 1 ziva je cigla i crta se
        var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;//x pozicija cigle
        var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;//y pozicija cigle
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        //upisujemo svaku ciglu na njeno mjesto
        ctx.beginPath();//pocni crtati
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
         /*  prvi parametar-x kordinata gornjeg lijevog ugla pravouganika
            drugi parametar-y kordinata gornjeg lijevog ugla pravouganika
            treci parametar-sirina cigle
            cetvrti parametar-visina cigle 
       */
        if (document.getElementById("easy").checked) ctx.fillStyle = color;
        else if (document.getElementById("medium").checked) ctx.fillStyle = color;
        else if (document.getElementById("hard").checked) ctx.fillStyle = bojaP;

        //ctx.fillStyle = bojaP;//boja cigli
        ctx.fill();//popuni bojom cigle
        ctx.closePath();//zavrsi crtanje
      }
    }
  }
}
function drawScore() {//funkcija za crtanje rezultata
  ctx.font = "32px Arial  bold";//velicina i font slova
  ctx.fillStyle = "#fcfdff";//boja slova
  ctx.fillText("Score: "+score, 8, 30);//ispis
}
function drawLives() {//funkcija za crtanje zivota
  ctx.font = "32px Arial  bold";//velicina i font slova
  ctx.fillStyle = "#fcfdff";//boja slova

  ctx.fillText("Lives: "+lives, canvas.width-110, 30);//ispis
}
//Funkcija za promjenu boja na HARD
function boja()
{
  if(status==1)
  {
    crvena+=3;//Boja od crnog ka crvenom
    status=1;
    if (crvena>255) status=0;
  }  
  if (status==0)
  {
    crvena-=3;//Boja crnog ka crnom
    status=0;
    if (crvena<=1) status=1;
  }
  bojaP="rgb(" + crvena + "," + 5 + "," + 5 + ")";//RGB boja koja služi za boju cigli.
}
//////////////////////////////////

function draw() {//gdje se magija odvija
  ctx.clearRect(0, 0, canvas.width, canvas.height);/*kad pozovemo funkciju draw
  prvo brisemo sve sto se nalazi u canvasu provjerimo koje cigle trebamo nacrtati*/
   
  /*  prvi parametar-x kordinata gornjeg lijevog ugla pravogunika za brisanje
        drugi parametar-y kordinata gornjeg lijevog ugla pravogunika za brisanje
        treci parametar-sirina za brisanje
        cetvrti parametar-visina za brisanje
       */
  if (document.getElementById("hard").checked) boja();//AKo je težina hard, učita funkciju za treperenje.
  drawBricks();//poziv funkcije za crtanje cigli
  drawBall();//poziv funkcija za crtanje lopte
  drawPaddle();//poziv funkcije za crtnje reketa
  drawScore();//poziv funkcije za crtnje rezultat
  drawLives();//poziv funkcije za crtnje zivota
  collisionDetection();//provjera udarca lopte u ciglu
  /*Postoje cetri zida od kojih se lopta treba odbijati
    Ako je lopta dirala jedan od zidova trebamo promjeniti
    smjer kretanja lopte a lopta mora ostati unutar
    vidivljih granica
  */
  //ODBIJANJE UNUTAR CANVASA
//dio koda za udarac u ivice 
  if(/*desna strana-->*/x + dx > canvas.width-ballRadius /*lijeva strana-->*/|| x + dx < ballRadius) 
  {
    dx = -dx;//mjenjamo smjer lopte
    wall_hit.play();
  }
  //PROMJENA SMIJERA ZA GORNJU IVICU
  if(y + dy < ballRadius) {
    dy = -dy;
    wall_hit.play();//Zvuk za odbijanje o zid.
  } 
  ////////////////////////////

  //dio koda za udarac u reket
  else if(y + dy > canvas.height-ballRadius) {
    if(x+10 > paddleX && x < paddleX + paddleWidth) 
    {
      dy = -dy;
      bounce.play();//Zvuk za odbijanje od reketa
    }//dio koda za kraj igre
    else {game_over.play();//kad se zivot izgubi to mozemo cuti 
      lives--; 
      if(!lives) 
      {
        audio.pause();//muzika prestaje kada se izgubi
      
        
        alert("GAME OVER\nYour score is: "+score);//kraj igre ispis rezultata 

        document.location.reload();//reload stranice kad je kraj
      }
      //kada udari lopta dno
      else {
        x = canvas.width/2;
        y = canvas.height-30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width-paddleWidth)/2;
      }
    }
  }

//dio koda za pomicanje reketa
  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
  //za svaki frame mjenjamo poziciju lopte
}
 function settings()  {//funkcija za odabir tezine igre
  /*u zavisnosti sta je korisnik odabrao
    dobija razlicitu brzinu  broj zivota muziku
    broj redova cigli
    easy-4 redova cigli 7 cigli u svakom velicina-600x645
    medium-5 redova cigli 9 cigli u svakom velicina-700x800
    hard-6 redova cigli 11 cigli u svakom velicina-800x980*/
 
 //EASY
if(document.getElementById("easy").checked)
{   speed = document.getElementById("easy").value;
    audio=document.getElementById("song1");
    color="#0095DD";
    lives=3;
    brickColumnCount=4;
    brickRowCount=7;
    canvas.height=600;
    canvas.width=645;
  }
  //MEDIUM
  else if(document.getElementById("medium").checked)
  { speed = document.getElementById("medium").value;
    lives=2;
    color="#8ec66f";
    audio=document.getElementById("song2");
    brickColumnCount=5;
    brickRowCount=9;
    canvas.height=700;
    canvas.width=800;
  }
  //HARD
  else if(document.getElementById("hard").checked)
  {speed = document.getElementById("hard").value;
  lives=1; 
  audio=document.getElementById("song3");
  //color='bojaP';
  brickColumnCount=6;
  brickRowCount=11;
  canvas.height=800;
  canvas.width=980;
  //document.getElementById.backgroundColor='rgb(100,100,100)';

  }
}
function start()//kad se klikne start igra pocinje
{
if(speed===undefined){//ako nista nije odabrano dajemo upozorenje
  alert('Please choose difficulty of game!');}
  else{//kad je odabrana tezina
    audio.play();//pocinje muzaka za dati level
   var name = document.getElementById("name");
   name.parentNode.removeChild(name);
  var choose= document.getElementById("choose");
  choose.parentNode.removeChild(choose);
  //pomocu js brisemo html element da na ekranu ostane samo canvas igre
   
   var inp = document.getElementById("inp");
   inp.style.visibility="hidden";
    var start = document.getElementById("start");
   start.style.visibility="hidden";
/*start i input ne brisemo jel nam njihove vrijednosti trebaju
  zato ih css svojstom visibility sakrjemo
  cilj je da kad se pritisne start na ekranu ostane samo igra
*/
document.getElementById("myCanvas").style.border="3px solid  #4483CE ";

if(document.getElementById("hard").checked){
document.getElementById("myCanvas").style.backgroundImage = "url('images/hard.jpg')";
} else if(document.getElementById("medium").checked){
  document.getElementById("myCanvas").style.backgroundImage = "url('images/medium.jpg')";

}else if(document.getElementById("easy").checked){
    document.getElementById("myCanvas").style.backgroundImage = "url('images/easy.jpg')";} 
    /*pozadinske slike za levele postavljamo sa js
    provjeravamo sta je korisnik izabrao
    i za svaki level posebna slika*/

    setInterval(draw,speed); }
  }


