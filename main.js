const quizData = [
    {
        question: "In what year did Elite Fence and Outdoor of Tampa Bay begin providing fencing services?",
        options: ["2015", "2017", "2020", "2022"],
        correct: 1
    },
    {
        question: "Elite Fence and Outdoor is recognized for what key quality?",
        options: ["Fastest installation in the U.S.", "Cheapest fencing materials", "Elite Standard of Excellence in every project", "Lifetime free maintenance"],
        correct: 2
    },
    {
        question: "What is the recommended post set depth for a 6-foot fence?",
        options: ["18 inches", "24 inches", "30 inches", "36 inches"],
        correct: 2
    },
    {
        question: "Which fence types does Elite Fence and Outdoor install?",
        options: ["Vinyl only", "Aluminum only", "Vinyl, Aluminum, Chain Link, Trex", "Wood only"],
        correct: 2
    },
    {
        question: "What is one of the benefits of choosing a family-owned fence company like Elite?",
        options: ["Lower insurance costs", "Personalized attention and care", "Free fences for neighbors", "Faster permit approval"],
        correct: 1
    },
    {
        question: "Elite Fence and Outdoor primarily serves which region?",
        options: ["Miami and South Florida", "Tampa Bay and Central Florida", "Orlando and Jacksonville", "Pensacola and the Panhandle"],
        correct: 1
    },
    {
        question: "Elite Fence specializes in commercial fencing solutions for which clients?",
        options: ["Residential homes only", "Government projects only", "Industrial, commercial, and retail clients", "Schools and hospitals only"],
        correct: 2
    },
    {
        question: "Which statement about Elite Fence installations is TRUE?",
        options: ["They use only pre-made fence panels", "They assemble fences on-site for higher quality", "They do not install gates or pergolas", "They focus only on chain link fences"],
        correct: 1
    },
    {
        question: "What tool does Elite Fence provide for fast, obligation-free pricing?",
        options: ["A downloadable price sheet", "An Instant Online Quote tool", "A free phone hotline", "In-person estimates only"],
        correct: 1
    },
    {
        question: "What does ASTM stand for?",
        options: ["American Safety Testing Methods", "American Society for Testing and Materials", "Association of Standards for Technology & Materials", "Automated Standards Testing Management"],
        correct: 1
    }
];

const questionTextEl = document.getElementById('question-text');
const optionsContainerEl = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const resultsSection = document.getElementById('results-section');
const leadCaptureSection = document.getElementById('lead-capture-section');
const thankYouSection = document.getElementById('thank-you-section');
const scoreEl = document.getElementById('score');
const totalQuestionsEl = document.getElementById('total-questions');
const leadForm = document.getElementById('lead-form');

let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;

function showQuestion() {
    selectedOption = null;
    const question = quizData[currentQuestionIndex];
    questionTextEl.textContent = question.question;
    optionsContainerEl.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('w-full', 'text-left', 'p-4', 'border-2', 'border-gray-300', 'rounded-lg', 'quiz-option', 'hover:bg-gray-100');
        button.dataset.index = index;
        button.addEventListener('click', () => selectOption(button, index));
        optionsContainerEl.appendChild(button);
    });
    nextBtn.disabled = true;
}

function selectOption(button, index) {
    if (selectedOption !== null) return; // Prevent changing answer

    selectedOption = index;
    document.querySelectorAll('.quiz-option').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    nextBtn.disabled = false;
}

nextBtn.addEventListener('click', () => {
    if (selectedOption === null) return;

    const question = quizData[currentQuestionIndex];
    const correct = question.correct;
    const options = optionsContainerEl.children;

    if (selectedOption === correct) {
        score++;
    }
    
    // Show correct/incorrect feedback
    options[selectedOption].classList.add(selectedOption === correct ? 'correct' : 'incorrect');
    if (selectedOption !== correct) {
        options[correct].classList.add('correct');
    }

    // Disable all options after answering
    Array.from(options).forEach(btn => btn.disabled = true);
    
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            showQuestion();
            Array.from(options).forEach(btn => btn.disabled = false); // Re-enable for next question
        } else {
            showResults();
        }
    }, 1500); // Wait 1.5 seconds before next question
});

function showResults() {
    document.getElementById('question-section').classList.add('hidden');
    resultsSection.classList.remove('hidden');
    leadCaptureSection.classList.remove('hidden');
    thankYouSection.classList.remove('hidden');
    scoreEl.textContent = score;
    totalQuestionsEl.textContent = quizData.length;
}

leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Here you would typically send this data to a server or CRM
    console.log('Lead Captured:', { name, email, phone });

    leadCaptureSection.innerHTML = `<p class="text-lg text-green-700 font-semibold">Thank you for your submission!</p>`;
});

showQuestion();
