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
        // Only grab input values if timer was fully stopped (not paused)
        if (!isPaused) {
            let h = parseInt(document.getElementById("hours").value) || 0;
            let m = parseInt(document.getElementById("minutes").value) || 0;
            let s = parseInt(document.getElementById("seconds").value) || 0;
            totalSeconds = h * 3600 + m * 60 + s;
            updateDisplay();
        }

        if (interval !== null) return; // prevent double intervals

        isPaused = false;

        interval = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(interval);
                interval = null;
                document.getElementById("countdown-display").innerHTML = "<span style='font-size: 48px;'>Time's up!</span>";
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
};