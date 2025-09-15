/* script.js */

// Function to update the countdown timer
function updateCountdown() {
  const eventDate = new Date('2025-10-12T00:00:00');
  const now = new Date();
  const diff = eventDate - now;

  let days = "00", hours = "00", minutes = "00", seconds = "00";

  if (diff > 0) {
    days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
    hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
    seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
  }

  // Check if elements exist before updating
  if (document.getElementById('days')) {
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
  }
}

// Initial call and interval for the countdown
updateCountdown();
setInterval(updateCountdown, 1000);


// Scroll effect for the main page
document.addEventListener("scroll", () => {
  const mainContent = document.querySelector(".main-content");
  const eventSection = document.querySelector(".event");
  
  if (mainContent && eventSection) {
      const eventTop = eventSection.getBoundingClientRect().top;

      const fadeStart = 500;
      const fadeEnd = 150;

      let opacity = 1;
      if (eventTop < fadeStart) {
        opacity = (eventTop - fadeEnd) / (fadeStart - fadeEnd);
        opacity = Math.max(0, Math.min(1, opacity)); 
      }

      mainContent.style.opacity = opacity;
      mainContent.style.transform = `translateY(${(1 - opacity) * -80}px)`;
  }
});