var testTime = document.querySelector('.time');

var countTime = new Date();

var x = setInterval(function () {

    var now = new Date().getTime();

    var distance = countTime.getTime() - now;

    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    testTime.innerHTML = hours + ":" + minutes + ":" + seconds;

    if (distance < 0) {
        clearInterval(x);
        testTime.innerHTML = 'Time out';
    }
}, 1000);