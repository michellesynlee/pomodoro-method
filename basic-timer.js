window.onload = function () {
    let interval = null;
    let totalSeconds = 0;
    let isPaused = false;

    function updateDisplay() {
        const display = document.getElementById("countdown-display");
        let hrs = Math.floor(totalSeconds / 3600);
        let mins = Math.floor((totalSeconds % 3600) / 60);
        let secs = totalSeconds % 60;

        display.textContent =
            `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    window.startTimer = function () {
        if (interval !== null) return; // Already running
    
        // Read input values only if not paused
        if (!isPaused) {
            let h = parseInt(document.getElementById("hours").value) || 0;
            let m = parseInt(document.getElementById("minutes").value) || 0;
            let s = parseInt(document.getElementById("seconds").value) || 0;
            totalSeconds = h * 3600 + m * 60 + s;
    
            // Prevent start if time is 0
            if (totalSeconds === 0) {
                alert("Please enter a time greater than 0!");
                return;
            }
    
            updateDisplay();
        }
    
        isPaused = false;
    
        interval = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(interval);
                interval = null;
                document.getElementById("countdown-display").innerHTML = "<span style='font-size: 100px;'>BEEP! DONE!</span>";
                document.getElementById("timer-sound").play();
                document.getElementById("stop-sound-btn").style.display = "inline-block";
            } else {
                totalSeconds--;
                updateDisplay();
            }
        }, 1000);
    };
    

    window.pauseTimer = function () {
        clearInterval(interval);
        interval = null;
        isPaused = true;
    };

    window.resetTimer = function () {
        pauseTimer(); // stop if running
        totalSeconds = 0;
        isPaused = false;
        document.getElementById("hours").value = 0;
        document.getElementById("minutes").value = 0;
        document.getElementById("seconds").value = 0;
        document.getElementById("countdown-display").textContent = "00:00:00";
    };

    window.stopSound = function () {
        const sound = document.getElementById("timer-sound");
        sound.pause();
        sound.currentTime = 0; // reset to beginning
        document.getElementById("stop-sound-btn").style.display = "none";
    };

};