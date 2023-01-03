const mario = document.querySelector('.mario');
const koopaShell = document.querySelector('.koopa_shell');
const pipe = document.querySelector('.pipe');
const grass = document.querySelector('.grass');

const textStart = document.querySelector('text-start');
const audioStart = new Audio('./audio/audio_theme.mp3');
const audioGameOver = new Audio('./audio/audio_gameover.mp3');

const floor1 = document.querySelector('.floor-1')
const floor2 = document.querySelector('.floor-2')
const floor3 = document.querySelector('.floor-3')

// Função iniciar jogo
const start = () => {

    document.getElementById('text-start').style.color = '#87CEEB';

    mario.src = './img/mario.gif';
    mario.style.width = '150px';
    mario.style.marginLeft = '50px';

    koopaShell.classList.add('koopa_shell_animation');
    pipe.classList.add('pipe-animation');
    grass.classList.add('grass-animation');

    // function floorAnimation1() {
    //     floor1.classList.add('.floor-animation-1');
    // }
    // setInterval(floorAnimation1, 1000);

    // function floorAnimation2() {
    //     floor2.classList.add('.floor-animation-2');
    // }
    // setInterval(floorAnimation2, 3000);

    // function floorAnimation3() {
    //     floor3.classList.add('.floor-animation-3');
    // }
    // setInterval(floorAnimation3, 5000);

    audioStart.play();
}
document.addEventListener('keydown', start);


// Função para o Mario pular
const jump = () => {
    mario.classList.add('jump');

    //a gente remove a class .jump com o setTimeout para que o Mario consiga pular novamente, senão ele pula apenas 1x
    setTimeout(() => {
        //setTimeout é uma função que recebe 2 parâmetros: função que faz algo + o tempo de duração
        mario.classList.remove('jump')
    }, 500);
}
document.addEventListener('keydown', jump);


// Função para checar se a gente perdeu ou não o jogo
const checkGameOver = setInterval(() => {
    //setIterval também recebe 2 parâmetros igual a setTimeout

    const koopaShellPosition = koopaShell.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    const pipePosition = pipe.offsetLeft;
    const grassPosition = grass.offsetLeft;
    // const floorPosition1 = floor1.offsetLeft;
    // const floorPosition2 = floor2.offsetLeft;
    // const floorPosition3 = floor3.offsetLeft;

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

        // floor1.style.animation = 'none';
        // floor1.style.left = `${floorPosition1}px`;

        // floor2.style.animation = 'none';
        // floor2.style.left = `${floorPosition2}px`;

        // floor3.style.animation = 'none';
        // floor3.style.left = `${floorPosition3}px`;

        document.getElementById('text-start').style.color = 'black';
        document.getElementById('text-start').innerHTML = 'Game Over';

        function stopAudioStart() {
            audioStart.pause();
        }
        stopAudioStart();
        audioGameOver.play();

        clearInterval(checkGameOver);
    }
}, 10)