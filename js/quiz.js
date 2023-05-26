var minute = document.querySelector('.time-quiz .minutes');
var second = document.querySelector('.time-quiz .seconds');

setInterval(()=>{
    if(second.innerText == 00){
        second.innerHTML = 59;
        if(minute.innerHTML.replace(':','') <=10 ){
            minute.innerHTML = '0' + (minute.innerHTML.replace(':','') - 1) + ':';
        }
    }else{
        if(second.innerText <= 10){
            second.innerHTML = '0' + (second.innerText - 1);
        }else{
            second.innerHTML -= 1;
        }
    }
},1000)