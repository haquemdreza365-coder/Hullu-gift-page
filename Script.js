document.addEventListener('DOMContentLoaded', function() {
    
    // --- Countdown Timer Logic (Resets daily for urgency) ---

    // Set the offer to expire at the end of the current day (11:59:59 PM)
    function getTargetDate() {
        let today = new Date();
        let target = new Date(today);
        target.setHours(23, 59, 59, 0); // Sets time to 11:59:59 PM tonight
        return target.getTime();
    }

    let countDownDate = getTargetDate();
    let timerElement = document.querySelector('.countdown-timer');
    let ctaButton = document.querySelector('.primary-cta');
    let urgencyText = document.querySelector('.limited-time-text');
    
    if (!timerElement || !ctaButton) return;

    let x = setInterval(function() {
        let now = new Date().getTime();
        let distance = countDownDate - now;
        
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        
        // Display the result
        timerElement.innerHTML = hours + ":" + minutes + ":" + seconds;
        
        // When the timer is finished
        if (distance < 0) {
            clearInterval(x);
            timerElement.innerHTML = "OFFER EXPIRED!";
            urgencyText.innerHTML = "SORRY, THE OFFER ENDED";
            
            // Disable the CTA button and change text
            ctaButton.innerHTML = "OFFER ENDED - TRY AGAIN TOMORROW";
            ctaButton.style.backgroundColor = '#95a5a6'; // Grey color
            ctaButton.style.pointerEvents = 'none'; 
            ctaButton.style.boxShadow = 'none';
        }
    }, 1000);

});