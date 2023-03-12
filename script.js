const play = document.getElementById('play');
const pause = document.getElementById('pause');
const reset = document.getElementById('reset');
const standardMode = document.getElementById('standard');
const shortMode = document.getElementById('short');
const longMode = document.getElementById('long');
const minutesContainer = document.getElementById('minutes');
const secondsContainer = document.getElementById('seconds');
const hoursContainer = document.getElementById('hours');
const alarm = new Audio('./assets/alarm.mp3');
const modes = document.querySelectorAll('.modes div');



window.onload = function() {

    let time, 
        timer,
        mode;

    minutesContainer.oninput = function() {
        clearInterval(timer);
        time = parseInt(hoursContainer.value) * 60 * 60 + parseInt(minutesContainer.value) * 60 +  parseInt(secondsContainer.value);
        mode = 'none';
    }
    secondsContainer.oninput = function() {
        clearInterval(timer);
        time = parseInt(hoursContainer.value) * 60 * 60 + parseInt(minutesContainer.value) * 60 +  parseInt(secondsContainer.value);
        mode = 'none';
    }

    standardMode.onclick = function() {
        //1 hour
        clearInterval(timer);
        mode = 'standard';
        hoursContainer.value = '1';
        minutesContainer.value = '00';
        secondsContainer.value = '00';
        time = parseInt(hoursContainer.value) * 60 * 60;
        
        play.style.pointerEvents = 'auto'; // block play button
    };
        
    shortMode.onclick = function() {

        //30 minutes
        clearInterval(timer);
        mode = 'short';
        hoursContainer.value = '00';
        minutesContainer.value = '30';
        secondsContainer.value = '00';
        time = parseInt(minutesContainer.value) * 60;
        play.style.pointerEvents = 'auto'; // block play button
    };
        
    longMode.onclick = function() {
        //45 minutes
        clearInterval(timer);
        mode='long';
        hoursContainer.value = '00';
        minutesContainer.value = '45';
        secondsContainer.value = '00';
        time = parseInt(minutesContainer.value) * 60;
        play.style.pointerEvents = 'auto'; // block play button
    };

    // function to change color of switched mode button only
    document.addEventListener('click', function(event) {
        for (let mode of modes) {
            if (mode == event.target) {
                mode.style.backgroundColor = '#afab91';
            } else if (mode != event.target && event.target.className == 'mode'){
                mode.style.backgroundColor = 'inherit';
            }
        }
    });

    play.onclick = function() {
        play.style.pointerEvents = 'none';
        timer = setInterval(() => {

            let hours = time/60/60%60;
            let minutes = time/60%60;
            let seconds = time%60;


            if (time <= 0) {
                clearInterval(timer);
                alarm.play();
            } else {
                let strHours = `${Math.trunc(hours)}`;
                let strMinutes = `${Math.trunc(minutes)}`;
                let strSeconds = `${Math.trunc(seconds)}`;
                if (seconds < 10) {
                    strSeconds = `0${Math.trunc(seconds)}`;
                };
                hoursContainer.value = strHours;
                minutesContainer.value = strMinutes;
                secondsContainer.value = strSeconds;
                --time;
            };
            
        }, 1000);
        
        pause.onclick = function() {
            clearInterval(timer);
            play.style.pointerEvents = 'auto';
        }
    };

    reset.onclick = function() {
        if (mode == 'standard') {
            standardMode.click();
        } else if (mode == 'short') {
            shortMode.click();
        } else if (mode == 'long') {
            longMode.click();
        }
    };

    standardMode.click(); // standard mode will be chosen automatically after starting the app
}



    
