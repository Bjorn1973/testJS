import "../css/style.scss";
// import randomColor from 'randomcolor';
import Timer from 'tiny-timer';
import Square from "./classes/Square";

// new Square(20, 20, 200, document.querySelector(".test"));
// console.log(process.env.SECRET);
// Klik op scherm. Verander kleur van body en sla die kleur op in array. Als de array 10 kleuren bevat toon je een vierkant op het scherm op een random positie. Klik je op dat vierkant wordt er een teller getoond. Van 10 tot 0. Eens 0 worden er 4 cirkels in dat vierkant geplaatst na 2 seconden… enz.. dus spelen met dom, events, timers, arrays,….
const getRandomNumber = (min, max) => Math.round(Math.random() * (max - min) + min);
const getRandomColor = ()=>{
    const letters = Math.random().toString(16).slice(2,8);
    const hex = "#";
    return hex+letters;
}
const body = document.querySelector('body');
const div = document.querySelector('#root');
const colorArr = [];
const divW = getRandomNumber(50, 500);
const divH = divW;
const arrCircle =[];


window.onclick = function changeBodyColor(){
    
    body.style.backgroundColor = getRandomColor();
    const bodyColor = body.style.backgroundColor;
    colorArr.push(bodyColor);
    console.log(colorArr);
    if(colorArr.length < 10){
        div.style.display = 'none';
    }else {
        window.onclick = null;
        div.style.display = 'block';
        div.style.backgroundColor = 'black';
        div.style.width = divW+'px';       
        div.style.height = div.style.width;
        div.style.position= 'absolute';
        div.style.left = getRandomNumber(divW,window.innerWidth-divW)+'px';
        div.style.top = getRandomNumber(divH,window.innerHeight-divH)+'px';
    }
}
div.onclick = function addCircle(){
    div.insertAdjacentHTML('beforeend', `<h1 class="timer"></h1>`);
    const clock = document.querySelector('.timer');
    let counter = 10;
    clock.textContent = counter;
    clock.style.color = 'white';
    clock.style.fontWeight = "bold";
    clock.style.fontSize = divW/4 + 'px';
    clock.style.position = "absolute";
    clock.style.top = divH/2-((divH/4)/2) + "px";
    clock.style.left = divW/2-((divW/4)/2) + "px";
    setInterval(()=>{
        counter = counter-1;
        clock.textContent = counter 
        clock.style.color = getRandomColor();
        if(counter <0){
            clearInterval();
            clock.textContent = "";
            const circleTimer = setTimeout(()=>{
                div.insertAdjacentHTML('beforeend', `<div class="circle"></div>`);
                const circle = document.querySelector('.circle');
                arrCircle.push(circle);
                console.log(arrCircle.length);
                circle.style.backgroundColor = getRandomColor();
                circle.style.width = getRandomNumber(divW/4, divW-(divW/4)) +'px';
                const circleH = parseInt(circle.style.width);
                circle.style.height = circleH + 'px';
                circle.style.borderRadius = "50%";
                circle.style.position = 'absolute';
                circle.style.left = getRandomNumber(circleH/4, divW-circleH)+ 'px';
                circle.style.top = getRandomNumber(circleH/4, divW-circleH)+'px';
            }, 2000)
            if(arrCircle.length >1){
                clearTimeout(circleTimer);
            }    
        }
    },1000)
    div.onclick = null;
}