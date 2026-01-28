class TypingEffect {
    constructor(element, text, speed = 50) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.currentChar = 0;
        this.isComplete = false;
    }

    type() {
        return new Promise((resolve) => {
            // Add typing class to start cursor animation
            this.element.classList.add('typing');
            
            const typeNextChar = () => {
                if (this.currentChar < this.text.length) {
                    this.element.textContent = this.text.slice(0, this.currentChar + 1);
                    this.currentChar++;
                    setTimeout(typeNextChar, this.speed);
                } else {
                    this.isComplete = true;
                    // Remove typing class and add typing-complete class
                    this.element.classList.remove('typing');
                    this.element.classList.add('typing-complete');
                    resolve();
                }
            };
            typeNextChar();
        });
    }
}

class SequentialTyping {
    constructor(elements, speed = 50, delayBetweenTexts = 500) {
        this.typingEffects = Array.from(elements).map(el =>
            new TypingEffect(el, el.dataset.text, speed)
        );
        this.currentIndex = 0;
        this.delayBetweenTexts = delayBetweenTexts;
        this.skipped = false;
    }

    async startTyping() {
        for (const effect of this.typingEffects) {
            if (this.skipped) return;
            await effect.type();
            if (this.skipped) return;
            await new Promise(resolve => setTimeout(resolve, this.delayBetweenTexts));
        }

        this.showCTA();
    }

    showCTA() {
        // After all typing is complete, show the CTA section
        const ctaSection = document.querySelector('.cta-section');
        if (ctaSection) {
            ctaSection.style.display = 'block';
            // Add a small delay before showing to make the transition smoother
            setTimeout(() => {
                ctaSection.style.opacity = '1';
            }, 300);
        }

        // Hide skip link
        const skipLink = document.getElementById('skip-animation');
        if (skipLink) {
            skipLink.style.display = 'none';
        }
    }

    skip() {
        this.skipped = true;

        // Immediately show all text
        for (const effect of this.typingEffects) {
            effect.element.textContent = effect.text;
            effect.element.classList.remove('typing');
            effect.element.classList.add('typing-complete');
            effect.isComplete = true;
        }

        this.showCTA();
    }
}

// Global reference for skip functionality
let globalTypingInstance = null;

function skipTypingAnimation() {
    if (globalTypingInstance) {
        globalTypingInstance.skip();
    }
}

// Initialize typing effect immediately when page loads
document.addEventListener('DOMContentLoaded', () => {
    const typingElements = document.querySelectorAll('.typing-text');
    // Faster typing (28ms per char) and shorter pause between sentences (600ms)
    globalTypingInstance = new SequentialTyping(typingElements, 28, 600);

    // Start typing after a shorter initial delay (1.5 seconds)
    setTimeout(() => {
        globalTypingInstance.startTyping();
    }, 1500);

    // Show skip link after 2 seconds
    setTimeout(() => {
        const skipLink = document.getElementById('skip-animation');
        if (skipLink) {
            skipLink.style.opacity = '1';
        }
    }, 2000);
});
