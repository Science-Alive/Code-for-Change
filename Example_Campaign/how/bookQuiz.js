document.addEventListener('DOMContentLoaded', () => {
  // 1. Data Structure: Array of Quiz Questions
  const quizData = [
    {
      question: "Question 1: What kind of movie do you prefer?",
      name: "q1",
      options: [
        { text: "A movie with a huge, imaginative world.", value: "A" },
        { text: "A documentary about real people doing amazing things.", value: "B" }
      ]
    },
    {
      question: "Question 2: What would you rather spend an afternoon doing?",
      name: "q2",
      options: [
        { text: "Solving a puzzle or mystery.", value: "C" },
        { text: "Learning a new skill or hobby.", value: "D" }
      ]
    }
  ];

  // 2. Global State Variables (Day 3: Variables)
  let currentQuestionIndex = 0;
  const userAnswers = {};

  // 3. Get DOM elements
  const quizArea = document.getElementById('quiz-area');
  const currentStepDisplay = document.getElementById('current-step');
  const totalStepsDisplay = document.getElementById('total-steps');

  if (!quizArea || !currentStepDisplay || !totalStepsDisplay) return;

  totalStepsDisplay.textContent = quizData.length;

  // 4. Function to Render the Current Question (Day 4: DOM Manipulation)
  function renderQuestion() {
    if (currentQuestionIndex >= quizData.length) {
      showResult();
      return;
    }

    const q = quizData[currentQuestionIndex];
    currentStepDisplay.textContent = currentQuestionIndex + 1;

    // Construct HTML for the question and options
    let html = `<h3>${q.question}</h3>`;
    q.options.forEach(option => {
      html += `
<label class="radio-option">
<input type="radio" name="${q.name}" value="${option.value}"> 
${option.text}
</label><br>
`;
    });

    // Add the button
    html += `<button id="nextButton">Next Question</button>`;

    // Inject the HTML into the page
    quizArea.innerHTML = html;

    // Attach event listener to the newly created button
    document.getElementById('nextButton').addEventListener('click', processAnswer);
  }

  // 5. Function to Process the Answer and Advance (Day 3: Functions)
  function processAnswer() {
    const q = quizData[currentQuestionIndex];
    const selectedOption = document.querySelector(`input[name="${q.name}"]:checked`);

    if (!selectedOption) {
      alert("Please select an option before moving on!");
      return;
    }

    // Store the answer
    userAnswers[q.name] = selectedOption.value;

    // Advance to the next question or show results
    currentQuestionIndex++;
    renderQuestion();
  }

  // 6. Function to Show the Final Result (Day 3: Conditionals/Logic)
  function showResult() {
    const q1Value = userAnswers.q1;
    const q2Value = userAnswers.q2;
    let recommendation = "";
    let resultClass = "";

    if (q1Value === 'A' && q2Value === 'C') {
      recommendation = "You should try <strong>Science Fiction</strong> or <strong>Fantasy</strong>! You love complex worlds and puzzles.";
      resultClass = "fantasy-result";
    } else if (q1Value === 'A' && q2Value === 'D') {
      recommendation = "You should try <strong>Graphic Novels</strong> or <strong>Epic Fantasy</strong>! You want escape and adventure.";
      resultClass = "graphic-result";
    } else if (q1Value === 'B' && q2Value === 'C') {
      recommendation = "You should try a <strong>Mystery / Thriller</strong>! You love puzzles, even in the real world.";
      resultClass = "mystery-result";
    } else if (q1Value === 'B' && q2Value === 'D') {
      recommendation = "You should try <strong>Non-Fiction / Biography</strong>! Your brain is always looking for new, real-world knowledge.";
      resultClass = "nonfiction-result";
    }

    // Final DOM update with the result
    quizArea.innerHTML = `
<div class="${resultClass}">
  <h3>🎉 Genre Recommendation!</h3>
  <p>${recommendation}</p>
  <p>Head to the library's official site to search this genre!</p>
</div>
<button onclick="window.location.reload()">Start Over</button>
`;
  }

  // Start the quiz when the page loads
  renderQuestion();
});
