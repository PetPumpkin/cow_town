var audioOn = true;

function audioToggle(){
    audioOn = !audioOn;

    document.getElementById("soundOnText").innerHTML = audioOn? "on" : "off";

    Howler.volume(audioOn? 1 : 0)
}

var audio_gameStart = new Howl({
    src: ['src/audio/gameStart.mp3']
});

var audio_gameEnd = new Howl({
    src: ['src/audio/gameEnd.mp3']
});

var audio_gotFood = new Howl({
    src: ['src/audio/foodGot.mp3']
});

var audio_gotWood = new Howl({
    src: ['src/audio/woodGot.mp3']
});

var audio_buildTick = new Howl({
    src: ['src/audio/buildTick.mp3']
});

var audio_buildingFinished = new Howl({
    src: ['src/audio/buildingFinished.mp3']
});

var audio_attackRound = new Howl({
    src: ['src/audio/attackRound.mp3']
});

var audio_buttonPressUp = new Howl({
    src: ['src/audio/buttonPressUp.mp3']
});

var audio_buttonPressDown = new Howl({
    src: ['src/audio/buttonPressDown.mp3']
});

var audio_villagerDeath = new Howl({
    src: ['src/audio/villagerDeath.mp3']
});

var audio_buildingChange = new Howl({
    src: ['src/audio/buildingChange.mp3']
});

var audio_dayFinished = new Howl({
    src: ['src/audio/dayFinished.mp3']
});

var audio_upgradeComplete = new Howl({
    src: ['src/audio/upgradeComplete.mp3']
});

