// Digital clock script
function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    var hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    var AMPM = "AM";

    var intHours = parseInt(hours);
    if (intHours > 12) {
        hours = (intHours-12).toString().padStart(2, '0');;
        AMPM = "PM";
    }
    else if (intHours == 0) {
        hours = "12";
    }
    clock.textContent = `${hours}:${minutes}:${seconds} ${AMPM}`;
}
setInterval(updateClock, 1000);
updateClock();  // Initialize clock display immediately

// Play white noise on button click
document.getElementById('play-noise').addEventListener('click', function() {
    const whiteNoise = document.getElementById('white-noise');
    whiteNoise.play();
});

// Schedule wake-up sound and sunrise effect
function startWakeUp() {
    // Gradually brighten the screen
    let brightness = 0;
    const interval = setInterval(() => {
        if (brightness >= 100) clearInterval(interval);
        document.body.style.backgroundColor = `hsl(0, 0%, ${brightness}%)`;
        brightness++;
    }, 12000); // This would brighten the screen over 20 minutes (600ms * 100)

    // Play bird sounds after a delay
    setTimeout(() => {
        const birdSound = new Audio('birds.mp3');
        birdSound.loop = true;
        birdSound.play();

        const whiteNoise = document.getElementById('white-noise');
        whiteNoise.pause();  // Pause the white noise
    }, 600000); // Play bird sounds after 10 minutes
}

function setAlarm() {
    const alarmTimeInput = document.getElementById('alarmTime').value;
    const alarmText = document.getElementById('confirmation');
    
    // Split the input into hours and minutes
    let [hours, minutes] = alarmTimeInput.split(':').map(Number);

    // Validate input
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || minutes < 0 || minutes >= 60) {
        alert("Please enter a valid time in the format HH:MM");
        return;
    }

    alarmText.textContent = `Alarm will sound in ${hours} hours and ${minutes} minutes.`;
    setTimeout(() => {
        // Hide the text
        alarmText.textContent = ''; 
        // Hide the input field
        document.getElementById('alarmTime').style.display = 'none' 
        // Hide the label
        const label = document.querySelector('label[for="alarmTime"]');
        label.style.display = 'none'; 
        // Hide the button
        const button = document.querySelector('button[onclick="setAlarm()"]');
        button.style.display = 'none'; 
    }, 5000); // 5000 milliseconds = 5 seconds

    

    // Convert to milliseconds
    let timeInMS = 0;
    timeInMS += hours * 3600000; // Convert hours to milliseconds
    timeInMS += minutes * 60000; // Convert minutes to milliseconds

    // Call startWakeUp 20 minutes before the alarm
    setTimeout(startWakeUp, timeInMS - 1200000); // Subtract 20 minutes (1,200,000 ms) from total time
}
