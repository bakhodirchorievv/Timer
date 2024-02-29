const startBtn = document.querySelector(".startBtn");
const timeInput = document.querySelector(".time");
const timerDisplay = document.querySelector(".timer");
const stopBtn = document.querySelector(".stopBtn");
const form = document.querySelector(".form");
const clearBtn = document.querySelector(".clearBtn");

clearBtn.addEventListener("click", () => {
    timerDisplay.textContent = ""
    removeClearBtn()
    stopTimer()
    stopBtn.textContent = "Stop Timer"
    stopBtn.classList.remove("addStop")
})

form.addEventListener("submit", (e) => {
    e.preventDefault()
})

function timeToSeconds(timeString) {
    const [hoursStr, minutesStr, secondsStr] = timeString.split(":");
    const hours = parseInt(hoursStr);
    const minutes = parseInt(minutesStr);
    const seconds = parseInt(secondsStr);

    return hours * 3600 + minutes * 60 + seconds;
}

stopBtn.addEventListener("click", () => {
    if (timerDisplay.textContent) {
        if (stopBtn.textContent == "Stop Timer") {
            stopBtn.textContent = "Resume"
            stopBtn.classList.add("addStop")
            stopTimer();
        } else {
            const timeString = timerDisplay.textContent;
            const seconds = timeToSeconds(timeString);
            timeInput.value = seconds;
            startTimer()
            timeInput.value = ''
            stopBtn.textContent = "Stop Timer"
            stopBtn.classList.remove("addStop")
        }
    }
});

startBtn.addEventListener("click", () => {
    startTimer();
});

let timerInterval;

function startTimer() {
    const timeInSeconds = parseInt(timeInput.value);
    if (isNaN(timeInSeconds) || timeInSeconds <= 0) {
        alert("Please enter a valid time greater than 0.");
        return;
    }

    stopBtn.textContent = "Stop Timer"
    stopBtn.classList.remove("addStop")

    let hours = Math.floor(timeInSeconds / 3600);
    let minutes = Math.floor((timeInSeconds % 3600) / 60);
    let seconds = timeInSeconds % 60;

    let timer = timeInSeconds;
    timerInterval = setInterval(() => {
        timer--;

        if (timer < 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "Time is up!";
        } else {
            hours = Math.floor(timer / 3600);
            minutes = Math.floor((timer % 3600) / 60);
            seconds = timer % 60;

            const displayHours = hours < 10 ? '0' + hours : hours;
            const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
            const displaySeconds = seconds < 10 ? '0' + seconds : seconds;

            timerDisplay.textContent = `${displayHours}:${displayMinutes}:${displaySeconds}`;
        }
        timeInput.value = ''
        removeClearBtn()
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function removeClearBtn () {
    if (timerDisplay.textContent) {
        clearBtn.style.display = "inline-block"
    } else {
        clearBtn.style.display = "none"
        stopTimer()
        stopBtn.classList.remove("addStop")
    }
}
removeClearBtn()