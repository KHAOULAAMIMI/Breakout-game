const grid=document.querySelector('.grid')
const scoreDisplay=document.querySelector('#score')
const blockwidth=100
const blockheight=20
const userstart=[230,10]
let currentposition=userstart
const ballstart=[270,40]
let ballcurrentposition=ballstart
const ballDiameter = 20
const boardWidth = 560
const boardHeight = 300
let xDirection = -2
let yDirection = 2
let timeid
let score=0

class Block {
  constructor(x,y){
    this.bottomleft=[x,y]
    this.bottomright=[x+blockwidth,y]
    this.topleft=[x,y+blockheight]
    this.topright=[x+blockwidth,y+blockheight]
  }

}

const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
  ]



function addBlock(){
   for(let i =0;i<blocks.length;i++) {
     const block=document.createElement('div')
     block.classList.add('block')
     block.style.left = blocks[i].bottomleft[0]+'px'
     block.style.bottom = blocks[i].bottomleft[1]+'px'
     grid.appendChild(block)

   }

}
addBlock()
const user = document.createElement('div')
user.classList.add('user')
drawuser()
grid.appendChild(user)
function drawuser(){
    user.style.left=currentposition[0]+'px'
    user.style.bottom=currentposition[1]+'px'
}
function moveuser(e){
 switch(e.key){
    case 'ArrowLeft':
       if(currentposition[0]>0) {
         currentposition[0]-=10
         drawuser()
         break;
       }   
    case 'ArrowRight':
        if((currentposition[0]+100)<560){
            currentposition[0]+=10
            drawuser()
            break;
        }


 }

}

document.addEventListener('keydown',moveuser) //a chaque fois qu'on tape une touche generer moveuser
const ball = document.createElement('div')
ball.classList.add('ball')
drawball()
grid.appendChild(ball)
function drawball(){
  ball.style.left=ballcurrentposition[0]+'px'
  ball.style.bottom=ballcurrentposition[1]+'px'
  
}
function moveball(){
  ballcurrentposition[0] +=xDirection
  ballcurrentposition[1] +=yDirection
  drawball()
  checkforcollisions()
}
timeid=setInterval(moveball,30)

function checkforcollisions(){
   
   for(let i=0;i<blocks.length;i++) {
    if( 
      (ballcurrentposition[0]>blocks[i].bottomleft[0] && ballcurrentposition[0]<blocks[i].bottomright[0])
        &&((ballcurrentposition[1]+ballDiameter)>blocks[i].bottomleft[1]&& ballcurrentposition[1]<blocks[i].topleft[1])
    ){
      const allBlocks=Array.from(document.querySelectorAll('.block'))
      allBlocks[i].classList.remove('block')
      blocks.splice(i,1)
      changeDirection()
      
      score ++
      scoreDisplay.innerHTML=score
    }
   }
 
 
 
  if(
  ballcurrentposition[0]>=(boardWidth-ballDiameter)||
  ballcurrentposition[1]>=(boardHeight-ballDiameter)||
  ballcurrentposition[0]<=0 

   ){
  changeDirection()
 }

 if
  (
    (ballcurrentposition[0] > currentposition[0] && ballcurrentposition[0] < currentposition[0] + blockwidth) &&
    (ballcurrentposition[1] > currentposition[1] && ballcurrentposition[1] < currentposition[1] + blockheight ) 
  )
  {
    changeDirection()
  }

 if(ballcurrentposition[1]<=0){
  clearInterval(timeid) // la fct moveball ne s'execute plus
  scoreDisplay.innerHTML='you lose'
  document.removeEventListener('keydown',moveuser) //meme si on tape une touche moveuser ne s'execute pas
 }

}





function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2
    return
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2
    return
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2
    return
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2
    return
  }
}