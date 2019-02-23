
let hit = 0;
let miss = 0;
let left = 26;
let broj = 0;
let pokusaj = false;
let timeout;

let nizNumbers = [];

for(let i = 1; i <= 26; i++) {
    nizNumbers.push(i);
}

function genCharArray(charA, charZ) {
    var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    return a;
}

let nizLetters = genCharArray('a', 'z');


function startPlay() {

    let speed = 0;

    if(document.getElementById('easy').checked) {
        speed = 5000;
    } else if(document.getElementById('medium').checked) {
        speed = 3500;
    } else if(document.getElementById('hard').checked) {
        speed = 2000;
    } else {

        document.getElementById('target').innerText = "Select your prefered difficulty";

        return;
    }

    document.getElementById('easy').disabled = true;
    document.getElementById('medium').disabled = true;
    document.getElementById('hard').disabled = true;

    document.getElementById('inputLetter').addEventListener('keypress', pritisnutoDugme);

    function pritisnutoDugme (e) {

        if(pokusaj) return;

        pokusaj = true;

        clearTimeout(timeout);

        if(nizLetters[broj] == e.key) {

            hit++;
            left--;

            document.getElementById('left').innerText = left;
            document.getElementById('hit').innerText = hit;

            document.getElementById(`${nizLetters[broj]}`).classList.add('green');

            nizNumbers.splice(broj, 1);
            nizLetters.splice(broj, 1);
        
         } else {

            miss++;
            left--;

            document.getElementById('left').innerText = left;
            document.getElementById('miss').innerText = miss;

            document.getElementById(`${nizLetters[broj]}`).classList.add('red');

            nizNumbers.splice(broj, 1);
            nizLetters.splice(broj, 1);
        }
    }

    function match() {

        pokusaj = false;

        document.getElementById('inputLetter').focus();
        document.getElementById('inputLetter').addEventListener('focus', function() {
            document.getElementById('inputLetter').value = "";
        });

        broj = Math.floor(Math.random() * nizNumbers.length);

        if(!nizNumbers.length) {

            document.getElementById('target').innerText = 'Game over!';
            clearInterval(interval);
        } else {

            document.getElementById('target').innerText = nizNumbers[broj];
        }

        function didntTry() {

            if(left > 0) {

                miss++;
                left--;

                document.getElementById('left').innerText = left;
                document.getElementById('miss').innerText = miss;

                document.getElementById(`${nizLetters[broj]}`).classList.add('red');

                nizNumbers.splice(broj, 1);
                nizLetters.splice(broj, 1);
            }
        }

        timeout = setTimeout(didntTry, speed - 100)
    }

    match();
    let interval = setInterval(match, speed);
}

document.getElementById('start').addEventListener('click', startPlay);