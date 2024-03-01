const startBtn = document.querySelector(".startBtn");
const timeInputs = document.querySelectorAll(".time");
const timerDisplay = document.querySelector(".timer");
const stopBtn = document.querySelector(".stopBtn");
const form = document.querySelector(".form");
const clearBtn = document.querySelector(".clearBtn");

clearBtn.addEventListener("click", () => {
    timerDisplay.textContent = "";
    removeClearBtn();
    stopTimer();
    stopBtn.textContent = "Stop Timer";
    stopBtn.classList.remove("addStop");
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
});

function timeToSeconds(hours, minutes, seconds) {
    return hours * 3600 + minutes * 60 + seconds;
}

stopBtn.addEventListener("click", () => {
    if (timerInterval) {
        if (stopBtn.textContent == "Stop Timer") {
            stopBtn.textContent = "Resume";
            stopBtn.classList.add("addStop");
            stopTimer();
        } else {
            const timeString = timerDisplay.textContent;
            const [hoursStr, minutesStr, secondsStr] = timeString.split(":");
            const hours = parseInt(hoursStr);
            const minutes = parseInt(minutesStr);
            const seconds = parseInt(secondsStr);
            const totalSeconds = hours * 3600 + minutes * 60 + seconds;
            startTimer(totalSeconds);
            stopBtn.textContent = "Stop Timer";
            stopBtn.classList.remove("addStop");
        }
    }
});

startBtn.addEventListener("click", () => {
    const hours = parseInt(timeInputs[0].value) || 0;
    const minutes = parseInt(timeInputs[1].value) || 0;
    const seconds = parseInt(timeInputs[2].value) || 0;
    const totalSeconds = timeToSeconds(hours, minutes, seconds);
    startTimer(totalSeconds);
});

let timerInterval;

function startTimer(totalSeconds) {
    if (isNaN(totalSeconds) || totalSeconds <= 0) {
        alert("Please enter a valid time greater than 0.");
        return;
    }

    stopBtn.textContent = "Stop Timer";
    stopBtn.classList.remove("addStop");

    let timer = totalSeconds;
    timerInterval = setInterval(() => {
        timer--;

        if (timer < 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "Time is up!";
        } else {
            let hours = Math.floor(timer / 3600);
            let minutes = Math.floor((timer % 3600) / 60);
            let seconds = timer % 60;

            const displayHours = hours < 10 ? '0' + hours : hours;
            const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
            const displaySeconds = seconds < 10 ? '0' + seconds : seconds;

            timerDisplay.textContent = `${displayHours}:${displayMinutes}:${displaySeconds}`;
        }
        timeInputs.forEach(input => input.value = '');
        removeClearBtn();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function removeClearBtn() {
    if (timerDisplay.textContent) {
        clearBtn.style.display = "inline-block";
    } else {
        clearBtn.style.display = "none";
        stopTimer();
        stopBtn.classList.remove("addStop");
    }
}
removeClearBtn();