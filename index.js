let level = 1;
let pattern = [];
let tempPattern = [];
let btnCodes = {
    1: 'red',
    2: 'blue',
    3: 'green',
    4: 'yellow'
};
let sounds = {
    red: 'sounds/red.mp3',
    green: 'sounds/green.mp3',
    blue: 'sounds/blue.mp3',
    yellow: 'sounds/yellow.mp3'
};
let getRandomPattern = (length) => {
    for (let i = 0; i < length; i++) {
        let num = Math.ceil(Math.random() * 4);
        $(`#${btnCodes[num]}`).addClass("pressed");
        pattern.push(btnCodes[num]);
        setTimeout(() => $(`#${btnCodes[num]}`).removeClass("pressed"), 500);
    }
    tempPattern = pattern.slice();
}
$(document).keypress(() => {
    getRandomPattern(level);
});

$('.btn').click((event) => {
    $(`#${event.target.id}`).addClass("pressed");
    let audio = new Audio(sounds[event.target.id]);
    audio.play();
    setTimeout(() => $(`#${event.target.id}`).removeClass("pressed"), 100);
    if (tempPattern.length > 0) {
        if (event.target.id != tempPattern[0]) {
            tempPattern = [];
            pattern = [];
            $('body').addClass('game-over');
            $('#level-subtitle').text('Ohhoo You lost!!');
            $('#level-subtitle').css("display", "block");
            let gameOverAudio = new Audio('sounds/wrong.mp3');
            gameOverAudio.play();
            setTimeout(() => $('body').removeClass('game-over'), 500);
            return;
        }
        tempPattern.shift();
    }
    if (tempPattern.length <= 0) {
        $('#level-subtitle').text('Moove to the next Round');
        $('#level-subtitle').css("display", "block");
        getRandomPattern(level);
    }


});