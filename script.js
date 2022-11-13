let direction={x:0,y:0};
let bgmusic=new Audio('back.mp3');
let changed=new Audio('dirnchange.wav');
let eat=new Audio('eat.wav');
let gover=new Audio('gameover.wav');
let sc=document.getElementById('sc');
let board=document.getElementById('board')
let speed=6;
let lastpainttime=0;
let snakearr=[
    {x:13 , y:15}
]
let food={x:6,y:7}
let score=0;

function main(ctime){
    window.requestAnimationFrame(main); 
    // console.log(ctime) 
    if((ctime-lastpainttime)/1000<1/speed){
        return;
    }
    lastpainttime=ctime;
    gameengine();
}
function isCollide(sarr){
    //if you bump into yourself
    for (let i = 1; i < sarr.length; i++) {
        if(sarr[i].x===sarr[0].x && sarr[i].y===sarr[0].y){
            return 1;
        }
    }
    if((sarr[0].x>=18 || sarr[0].x<=0) || (sarr[0].y>=18 || sarr[0].y<=0)){
        return 1;
    }
    return 0;
}
function gameengine(){
    //part 1 updating the snake arr and food
    if(isCollide(snakearr)){
        gover.play();
        bgmusic.pause();
        direction={x:0,y:0}
        score=0;
        sc.innerHTML="Score : "+score;
        alert("Game over");
        snakearr=[{x:13,y:15}];
       // bgmusic.play()
        score=0;
    }
    //eaten the food increment the score
    if(snakearr[0].y===food.y && snakearr[0].x===food.x){
        eat.play()
        score+=1;
        if(score>hival){
            hival=score;
            localStorage.setItem('hisc',JSON.stringify(hival));
            hsc.innerHTML='High Score : '+hival
        }
        snakearr.unshift({x:snakearr[0].x+direction.x,y:snakearr[0].y+direction.y})
        sc.innerHTML="Score : "+score;
        //generating randoms bw a and b
        let a=1;
        let b=17;    
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }
    //moving the snake
    for(let i=snakearr.length-2;i>=0;i--){
        snakearr[i+1]={...snakearr[i]}; 
    }
    snakearr[0].x+=direction.x;
    snakearr[0].y+=direction.y;   

    //part 2 render the snake and food
    board.innerHTML="";
    snakearr.forEach((e,index)=>{
        snakeelement=document.createElement('div');
        snakeelement.style.gridRowStart=e.y;
        snakeelement.style.gridColumnStart=e.x;
        if(index===0){
            snakeelement.classList.add('head')
        }else{
            snakeelement.classList.add('snake')
        }
        board.appendChild(snakeelement);
    })
    foodelement=document.createElement('div');
    foodelement.style.gridRowStart=food.y;
    foodelement.style.gridColumnStart=food.x;
    foodelement.classList.add('food')
    board.appendChild(foodelement);

}

window.requestAnimationFrame(main);
let hisc=localStorage.getItem('hisc');
if(hisc===null){
      hival=0;
    localStorage.setItem('hisc',JSON.stringify(hival))
}
else{
    hival=JSON.parse(hisc);
    hsc.innerHTML="High Score : "+hisc;
}
window.addEventListener('keydown',(e)=>{
    direction={x:0 ,y:1};
    changed.play();
    switch (e.key) {
        case "ArrowUp":
            console.log('up');
            direction.x=0;
            direction.y=-1;
            break;
        
        case "ArrowDown":
            console.log('down');
            direction.x=0;
            direction.y=1;
            break;
        
        case "ArrowLeft":
            console.log('left');
            direction.x=-1;
            direction.y=0;
            break;
        
        case "ArrowRight":
            console.log('right');
            direction.x=1;
            direction.y=0;
            break;
        
        default:
            break;
    }
})