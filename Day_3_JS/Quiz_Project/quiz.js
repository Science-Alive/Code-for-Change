// ============================
// VOLUNTEER FIT QUIZ ENGINE
// ============================

// 1. GLOBAL VARIABLES
let totalFitScore = 0;
let isSubmitted = false; 


// 2. CORE FUNCTION: Updates the total score from scratch.
function updateScore() {
    if (isSubmitted) return; 

    // 1. Reset the score to zero every time a button is clicked.
    totalFitScore = 0;
    
    // 2. DOM Manipulation: Find ALL radio buttons on the page
    const allRadioInputs = document.querySelectorAll('input[type="radio"]');

    // 3. Loop through all inputs 
    allRadioInputs.forEach(radio => {
        // 4. Conditional Check: If this radio button is selected...
        if (radio.checked) {
            // 5. Add its value to the total score.
            totalFitScore += parseInt(radio.value);
        }
    });

    console.log("New Total Score: " + totalFitScore);
}


// 3. RECOMMENDATION LOGIC
function getRecommendation() {
    if (isSubmitted) return;
    
    // Check if both questions were answered (Score will be > 0 if at least one was clicked)
    if (totalFitScore === 0) {
        document.getElementById("mission-title").textContent = "Please Select at Least One Option";
        document.getElementById("mission-description").textContent = "You need to answer at least one question to get a mission recommendation!";
        document.getElementById("result-block").style.display = "block";
        return;
    }
    
    isSubmitted = true; // Lock the quiz

    let missionTitle = "";
    let missionDescription = "";
    
    // Clear and Simple Conditionals based on score range
    // NOTE: Max possible score is 20.
    if (totalFitScore <= 8) { 
        missionTitle = "Community Outreach Team";
        missionDescription = "Your score suggests you prefer working with people and need flexible hours. Focus on local food drives and event support!";
    } else if (totalFitScore <= 15) { 
        missionTitle = "Tech & Social Media Advocate";
        missionDescription = "Your score makes you a perfect fit for building awareness websites and managing social media for a local non-profit.";
    } else { 
        missionTitle = "Dedicated Web Dev Leader";
        missionDescription = "Your score makes you a perfect fit for a dedicated tech role! Your mission is to build and maintain a complete website for a major local cause.";
    }
    
    // DOM MANIPULATION
    document.getElementById("mission-title").textContent = missionTitle;
    document.getElementById("mission-description").textContent = missionDescription;
    document.getElementById("result-block").style.display = "block";
    document.getElementById("submit-btn").disabled = true;

    console.log(`\nRecommendation Found! Mission: ${missionTitle} with a score of ${totalFitScore}`);
}


// 4. RESET FUNCTION
function resetQuiz() {
    // Reset Variables
    totalFitScore = 0;
    isSubmitted = false;

    // DOM Reset: Hide Results, Enable Button, and Uncheck Radios
    document.getElementById("result-block").style.display = "none";
    document.getElementById("submit-btn").disabled = false;
    
    // Uncheck all radio buttons
    const allRadioInputs = document.querySelectorAll('input[type="radio"]');
    allRadioInputs.forEach(radio => {
        radio.checked = false;
    });
    
    // Clear console for a fresh run
    console.clear();
    console.log("Quiz has been reset. Total score is 0. You can now click buttons!");
}

// Initial Setup
console.clear();
console.log("Volunteer Quiz Engine Loaded. Click the buttons to find your score!");
