const mario = document.querySelector('.mario');
const koopaShell = document.querySelector('.koopa_shell');
const pipe = document.querySelector('.pipe');
const grass = document.querySelector('.grass');

let startButton = document.getElementById('start');
let number = document.getElementById('number');
let counter = 0;

const textStart = document.querySelector('text-start');
const audioStart = new Audio('./audio/audio_theme.mp3');
const audioGameOver = new Audio('./audio/audio_gameover.mp3');

// Função iniciar jogo:
function startGame () {

    document.getElementById('text-start').style.visibility = "hidden";

    mario.src = './img/mario.gif';
    mario.style.width = '150px';
    mario.style.marginLeft = '50px';

    koopaShell.classList.add('koopa_shell_animation');
    pipe.classList.add('pipe-animation');
    grass.classList.add('grass-animation');

    audioStart.play();
}
document.addEventListener('onkeypress', startGame);

// Função para o Mario pular:
function jump (){
    mario.classList.add('jump');

    //a gente remove a class .jump com o setTimeout para que o Mario consiga pular novamente, senão ele pula apenas 1x
    setTimeout(() => {
        //setTimeout é uma função que recebe 2 parâmetros: função que faz algo + o tempo de duração
        mario.classList.remove('jump')
    }, 500);
    
    counter++
    number.textContent = counter
}
document.addEventListener('keydown', jump);

// Função para checar se a gente perdeu ou não o jogo
const checkGameOver = setInterval(() => {
    //setIterval também recebe 2 parâmetros igual a setTimeout

    const koopaShellPosition = koopaShell.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    const pipePosition = pipe.offsetLeft;
    const grassPosition = grass.offsetLeft;

    if (koopaShellPosition <= 125 && koopaShellPosition > 0 && marioPosition < 80) {
        koopaShell.style.animation = 'none';
        //colocar o style.left com template string para o koopashell parar exatamente com os 125px antes do Mario
        koopaShell.style.left = `190px`

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`

        mario.src = './img/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        grass.style.animation = 'none';
        grass.style.left = `${grassPosition}px`;

        document.getElementById('text-start').style.visibility = '';

        if(counter == 1){
            document.getElementById('text-start').innerHTML = 
            `Parabéns! Você conseguiu pular ${counter} casco.`;
        }else if(counter > 1 && counter < 9){
            document.getElementById('text-start').innerHTML = 
            `Parabéns! Você conseguiu pular ${counter} cascos.`;
        }else if(counter > 10){
            document.getElementById('text-start').innerHTML = 
            `Uau! Você está ficando profissa! Pulou ${counter} cascos!`;
        }else{
            document.getElementById('text-start').innerHTML = 
            `Que pena, você não conseguiu pular nenhum casco.`;
        }

        function stopAudioStart() {
            audioStart.pause();
        }
        stopAudioStart();
        audioGameOver.play();

        clearInterval(checkGameOver);
    }
}, 10)

