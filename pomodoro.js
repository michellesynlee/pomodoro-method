let pomodoroInterval = null;
let isPaused = false;
let isBreak = false;
let totalSeconds = 25 * 60;
let round = 1;

function updateDisplay() {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    document.getElementById("pomodoro-display").textContent =
        `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    document.getElementById("round-display").textContent =
        `Round ${round} of 4`;
}

function startPomodoro() {
    if (pomodoroInterval || round > 4) return;
    isPaused = false;

    pomodoroInterval = setInterval(() => {
        if (totalSeconds > 0) {
            totalSeconds--;
            updateDisplay();
        } else {
            clearInterval(pomodoroInterval);
            pomodoroInterval = null;

            if (!isBreak) {
                isBreak = true;
                totalSeconds = 5 * 60;
                alert("Break time!");
            } else {
                isBreak = false;
                round++;
                if (round > 4) {
                    alert("Congrats! You're done!");
                    return;
                }
                totalSeconds = 25 * 60;
                alert("Back to work!");
            }
            updateDisplay();
            startPomodoro();
        }
    }, 1000);
}

function pausePomodoro() {
    clearInterval(pomodoroInterval);
    pomodoroInterval = null;
    isPaused = true;
}

function resetPomodoro() {
    clearInterval(pomodoroInterval);
    pomodoroInterval = null;
    totalSeconds = 25 * 60;
    round = 1;
    isBreak = false;
    isPaused = false;
    updateDisplay();
}

