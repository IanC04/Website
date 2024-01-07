let facts = [];
let isSpinning = false;

const factButton = document.getElementById('fact-button');
const factDisplay = document.getElementById('fact-display');

async function loadFacts() {
    const response = await fetch('data/output/fun-facts.json');
    facts = await response.json();

    factButton.disabled = false;
    factButton.textContent = 'Show Fun Fact';
    console.log(`${facts.length} facts loaded.`);
}

function showRandomFact() {
    if (isSpinning) {
        return;
    }

    isSpinning = true;
    factDisplay.style.color = 'var(--text)';

    let spins = 0;
    const spinLimit = 10;
    const spinSpeed = 50;

    const spinInterval = setInterval(() => {
        const index = Math.floor(Math.random() * facts.length);
        factDisplay.textContent = facts[index];
        spins++;

        if (spins >= spinLimit) {
            clearInterval(spinInterval);
            isSpinning = false;
            factDisplay.style.color = 'var(--fact-color)';
        }
    }, spinSpeed);
}

factButton.addEventListener('click', showRandomFact);

loadFacts().catch(error => {
    console.error('Failed to load fun facts:', error);
    factDisplay.textContent = 'Could not load fun facts.';
    factButton.disabled = true;
});