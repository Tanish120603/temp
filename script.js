let currentStep = 1;
const totalSteps = 9;

// Valentine's Week Gifts Data
const valentineGifts = {
    7: {
        name: "Rose Day 🌹",
        date: "7th February",
        message: "Happy Rose Day, my rose.\n\nThis rose won't fade away like others.\nIt will always be here for you."
    },
    8: {
        name: "Propose Day 💍",
        date: "8th February",
        message: "I love you,\nwill you be my valentine?"
    },
    9: {
        name: "Chocolate Day 🍫",
        date: "9th February",
        message: "This is a virtual chocolate for you\n(you can eat these as many you want),\nSilk Caramel awaiting at home!\n (only 1 but)"
    },
    10: {
        name: "Teddy Day 🧸",
        date: "10th February",
        message: "Happy Teddy Day, to my teddy bear.\n\nCan't wait to cuddle this teddy!"
    },
    11: {
        name: "Promise Day 🤝",
        date: "11th February",
        message: "I promise I'll be there for you always,\nAnd don't you ever think again, I am going out of interest."
    },
    12: {
        name: "Hug Day 🤗",
        date: "12th February",
        message: "Sending you a big virtual hug,\na bigger one awaits at home!"
    },
    13: {
        name: "Kiss Day 💋",
        date: "13th February",
        message: "Happy Kiss Day to my bbg,\nMuaahh! 💋"
    },
    14: {
        name: "Valentine's Day 💕",
        date: "14th February",
        message: "Happy Valentine's Day baby,\nI love you! 💕"
    }
};

// Check and unlock gifts based on current date
function checkGiftAvailability() {
    const today = new Date();
    const currentDate = today.getDate();
    const currentMonth = today.getMonth() + 1; // JavaScript months are 0-indexed
    
    // Only unlock if we're in February
    if (currentMonth === 2) {
        for (let day = 7; day <= 14; day++) {
            const giftBox = document.getElementById(`gift-${day}`);
            if (giftBox) {
                if (currentDate >= day) {
                    giftBox.classList.remove('locked');
                    giftBox.classList.add('unlocked');
                    const lockOverlay = giftBox.querySelector('.lock-overlay');
                    if (lockOverlay) {
                        lockOverlay.style.display = 'none';
                    }
                }
            }
        }
    }
}

// Open gift popup
function openGift(day) {
    const giftBox = document.getElementById(`gift-${day}`);
    if (giftBox && giftBox.classList.contains('locked')) {
        alert('This gift will unlock on ' + valentineGifts[day].date + '! 💕');
        return;
    }
    
    const gift = valentineGifts[day];
    const modal = document.getElementById('gift-modal');
    const content = document.getElementById('gift-content');
    
    // Special handling for Propose Day (day 8) - add Yes/No buttons
    if (day === 8) {
        content.innerHTML = `
            <div class="gift-popup">
                <div class="gift-popup-emoji">💍</div>
                <h2>${gift.name}</h2>
                <div class="gift-popup-date">${gift.date}</div>
                <div class="gift-question-box">
                    <p class="gift-question">Will you be my Valentine? 💕</p>
                </div>
                <div class="gift-button-group">
                    <button class="btn-yes" onclick="handleProposeYes()">Yes! 💖</button>
                    <button class="btn-no" onmouseover="moveNoButton(this)">No 😢</button>
                </div>
            </div>
        `;
    } else {
        content.innerHTML = `
            <div class="gift-popup">
                <div class="gift-popup-emoji">${day === 7 ? '🌹' : day === 9 ? '🍫' : day === 10 ? '🧸' : day === 11 ? '🤝' : day === 12 ? '🤗' : day === 13 ? '💋' : '💕'}</div>
                <h2>${gift.name}</h2>
                <div class="gift-popup-date">${gift.date}</div>
                <p class="gift-popup-message">${gift.message.replace(/\n/g, '<br>')}</p>
            </div>
        `;
    }
    
    modal.style.display = 'flex';
}

// Handle Yes button in Propose Day popup
function handleProposeYes() {
    // Show celebration inside the gift modal
    const content = document.getElementById('gift-content');
    content.innerHTML = `
        <div class="gift-popup" style="text-align: center;">
            <div class="gift-popup-emoji">🎉</div>
            <h2 style="color: #e91e63; font-size: 2em;">Yay!</h2>
            <p class="gift-popup-message" style="text-align: center; border-left: none;">
                I knew you would say YES!<br>
                As if you had any other choice, hehe<br>
                I love you 😘❤️ !<br><br>
                <span style="font-size: 1.3em; color: #d63384; font-weight: bold;">I love you! 💕</span>
            </p>
            <div style="font-size: 2em; margin-top: 15px;">
                💕 💖 💗 💝 💕
            </div>
        </div>
    `;
}

// Close gift popup
function closeGift() {
    document.getElementById('gift-modal').style.display = 'none';
}


// Initialize gift availability on page load
document.addEventListener('DOMContentLoaded', function() {
    checkGiftAvailability();
    
    // Initialize No button movement for step 10
    const step10 = document.getElementById('step10');
    if (step10) {
        const noButton = step10.querySelector('.btn-no');
        if (noButton) {
            noButton.addEventListener('mouseenter', function() {
                moveNoButton(this);
            });
        }
    }
});

function nextStep() {
    if (currentStep < totalSteps) {
        // Hide current step
        const currentStepElement = document.getElementById(`step${currentStep}`);
        currentStepElement.classList.remove('active');
        currentStepElement.style.animation = 'fadeOut 0.5s ease-out';
        
        // Show next step
        currentStep++;
        setTimeout(() => {
            const nextStepElement = document.getElementById(`step${currentStep}`);
            currentStepElement.style.display = 'none';
            nextStepElement.style.display = 'block';
            setTimeout(() => {
                nextStepElement.classList.add('active');
                
                // Attach moveNoButton to any No buttons in this step
                const noButtons = nextStepElement.querySelectorAll('.btn-no');
                noButtons.forEach(btn => {
                    // Remove any existing listeners
                    btn.onmouseenter = null;
                    // Add new listener
                    btn.addEventListener('mouseenter', function(e) {
                        e.preventDefault();
                        moveNoButton(this);
                    }, { once: false });
                });
            }, 50);
        }, 500);
    }
}

function showFinalStep() {
    // No longer used - celebration is shown inside the gift modal
}

window.moveNoButton = function(button) {
    // Prevent multiple simultaneous animations
    if (button.dataset.moving === 'true') {
        return;
    }
    button.dataset.moving = 'true';
    
    // Initialize move count
    if (!button.dataset.moveCount) {
        button.dataset.moveCount = '0';
    }
    let moveCount = parseInt(button.dataset.moveCount);
    
    // Get the Yes button position (to avoid overlapping it)
    const buttonGroup = button.closest('.button-group') || button.closest('.gift-button-group');
    const yesButton = buttonGroup ? buttonGroup.querySelector('.btn-yes') : null;
    let yesRect = null;
    if (yesButton) {
        yesRect = yesButton.getBoundingClientRect();
    }
    
    // Use viewport dimensions for reliable positioning
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Conservative button size estimate
    const buttonWidth = 150;
    const buttonHeight = 60;
    
    // Safe padding from viewport edges
    const padding = 30;
    
    // Calculate safe bounds within the viewport
    const minX = padding;
    const minY = padding;
    const maxX = viewportWidth - buttonWidth - padding;
    const maxY = viewportHeight - buttonHeight - padding;
    
    // Ensure we have valid bounds
    if (maxX <= minX || maxY <= minY) {
        button.dataset.moving = 'false';
        return;
    }
    
    // Predefined positions as viewport percentages — spread around the screen
    const positionSets = [
        { x: 0.10, y: 0.15 },  // top-left
        { x: 0.70, y: 0.20 },  // top-right
        { x: 0.15, y: 0.70 },  // bottom-left
        { x: 0.65, y: 0.65 },  // bottom-right
        { x: 0.40, y: 0.15 },  // top-center
        { x: 0.10, y: 0.45 },  // middle-left
        { x: 0.70, y: 0.45 },  // middle-right
        { x: 0.40, y: 0.70 },  // bottom-center
    ];
    
    // Pick the next position, cycling through the set
    const posPercent = positionSets[moveCount % positionSets.length];
    
    let finalX = minX + (maxX - minX) * posPercent.x;
    let finalY = minY + (maxY - minY) * posPercent.y;
    
    // Clamp to safe bounds
    finalX = Math.max(minX, Math.min(maxX, finalX));
    finalY = Math.max(minY, Math.min(maxY, finalY));
    
    // Avoid overlapping the Yes button
    if (yesRect) {
        const overlapPad = 20;
        const btnRight = finalX + buttonWidth;
        const btnBottom = finalY + buttonHeight;
        const overlaps = !(btnRight < yesRect.left - overlapPad ||
                           finalX > yesRect.right + overlapPad ||
                           btnBottom < yesRect.top - overlapPad ||
                           finalY > yesRect.bottom + overlapPad);
        if (overlaps) {
            // Shift horizontally away from the Yes button
            if (finalX < yesRect.left) {
                finalX = Math.max(minX, yesRect.left - buttonWidth - overlapPad);
            } else {
                finalX = Math.min(maxX, yesRect.right + overlapPad);
            }
        }
    }
    
    // Apply the move using fixed positioning (viewport-relative)
    button.style.position = 'fixed';
    button.style.left = finalX + 'px';
    button.style.top = finalY + 'px';
    button.style.right = 'auto';
    button.style.bottom = 'auto';
    button.style.margin = '0';
    button.style.opacity = '1';
    button.style.transform = 'scale(1)';
    button.style.visibility = 'visible';
    button.style.display = 'block';
    button.style.pointerEvents = 'auto';
    button.style.transition = 'all 0.3s ease-out';
    button.style.zIndex = '10000';
    
    // Increment move count
    moveCount++;
    button.dataset.moveCount = moveCount.toString();
    
    // Reset moving flag after animation
    setTimeout(() => {
        button.dataset.moving = 'false';
    }, 350);
    
    // After 12 moves, hide the button
    if (moveCount >= 12) {
        setTimeout(() => {
            button.style.opacity = '0';
            button.style.transform = 'scale(0)';
            button.style.transition = 'all 0.5s ease-out';
            setTimeout(() => {
                button.style.display = 'none';
            }, 500);
        }, 350);
    }
};

function createConfetti() {
    const celebration = document.querySelector('.celebration');
    const colors = ['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1', '#ff69b4'];
    
    // Create more confetti
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = (Math.random() * 10 + 5) + 'px';
            confetti.style.height = (Math.random() * 10 + 5) + 'px';
            confetti.style.animation = `confettiFall ${Math.random() * 2 + 2}s linear`;
            celebration.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }, i * 100);
    }
}

// Add fadeOut animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.9);
        }
    }
`;
document.head.appendChild(style);

// Make all functions globally accessible for onclick handlers (after all functions are defined)
window.nextStep = nextStep;
window.showFinalStep = showFinalStep;
// moveNoButton is already defined as window.moveNoButton above
window.openGift = openGift;
window.closeGift = closeGift;
window.handleProposeYes = handleProposeYes;
