class Drumkit {
    constructor() {
        this.pads = document.querySelectorAll('.pad');
        this.playBtn = document.querySelector('.play');
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.currentKick = './sounds/kick-classic.wav';
        this.currentSnare = './sounds/snare-acoustic01.wav';
        this.currentHihat = './sounds/hihat-acoustic01.wav';
        this.selects = document.querySelectorAll('select');
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
        this.muteBtns = document.querySelectorAll('.mute');
        this.tempoSlider = document.querySelector('.tempo-slider');
    }

    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        //LOOP
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            //CHECK ACTIVE PADS
            if (bar.classList.contains("active")) {
                //CHECK SOUND INDIVIDUALLY
                if (bar.classList.contains("kick-pad")) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (bar.classList.contains("snare-pad")) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if (bar.classList.contains("hihat-pad")) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });

        this.index++;
    }

    start() {
        const interval = (60 / this.bpm) * 1000;
        if (!this.isPlaying) {
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
        } else {
            clearInterval(this.isPlaying);
            this.isPlaying = null;
            this.index = 0;
        }
    }
    updateBtn() {
        if (!this.isPlaying) {
            this.playBtn.innerText = 'Play';
            this.playBtn.classList.add('active');
        } else {
            this.playBtn.innerText = 'Stop';
            this.playBtn.classList.remove('active');
        }
    }
    changeSound(e) {
        const selectionName = e.target.name;
        const selectionValue = e.target.value;

        switch (selectionName) {
            case "kick-select":
                this.kickAudio.src = selectionValue;
                break;
            case "snare-select":
                this.snareAudio.src = selectionValue;
                break;
            case "hihat-select":
                this.hihatAudio.src = selectionValue;
                break;
        }
    }

    mute(e) {
        const muteIndex = e.target.getAttribute('data-track');
        e.target.classList.toggle('active');
        if (e.target.classList.contains('active')) {
            switch (muteIndex) {
                case '0':
                    this.kickAudio.volume = 0;
                    break;
                case '1':
                    this.snareAudio.volume = 0;
                    break;
                case '2':
                    this.hihatAudio.volume = 0;
                    break;
            }
        } else {
            switch (muteIndex) {
                case '0':
                    this.kickAudio.volume = 1;
                    break;
                case '1':
                    this.snareAudio.volume = 1;
                    break;
                case '2':
                    this.hihatAudio.volume = 1;
                    break;
            }
        }
    }

    changeTempo(e) {
        const tempoText = document.querySelector('.tempo-nr');
        tempoText.innerText = e.target.value;
        this.bpm = e.target.value;

    }

    // updateTempo(e) {
    //     clearInterval(this.isPlaying);
    //     this.isPlaying = null;
    //     this.bpm = e.target.value;

    //     const playBtn = document.querySelector('.play');
    //     if(playBtn.classList.contains('active')) {
    //         this.start();
    //         this.updateBtn();
    //     }
    // }

    updateTempo(e) {
        this.bpm = e.target.value;
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playBtn = document.querySelector(".play");
        if (playBtn.classList.contains("active")) {
            this.start();
        }
    }

    activePad() {
        this.classList.toggle('active');
    }
}

const drumKit = new Drumkit();


drumKit.playBtn.addEventListener('click', () => {
    drumKit.start();
    drumKit.updateBtn();
});

drumKit.pads.forEach(pad => {
    pad.addEventListener('click', drumKit.activePad);
    pad.addEventListener('animationend', function () {
        this.style.animation = "";
    });
});

drumKit.selects.forEach(select => {
    select.addEventListener('change', function (e) {
        drumKit.changeSound(e);
    });
});

drumKit.muteBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
        drumKit.mute(e);
    })
});

// drumKit.tempoSlider.addEventListener('input', function(e) {
//     drumKit.changeTempo(e);
// });

// drumKit.tempoSlider.addEventListener('change', function(e) {
//     drumKit.updateTempo(e);
// });

drumKit.tempoSlider.addEventListener("input", function (e) {
    drumKit.changeTempo(e);
});
drumKit.tempoSlider.addEventListener("change", function (e) {
    drumKit.updateTempo(e);
});
