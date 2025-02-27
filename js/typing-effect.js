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
    }

    async startTyping() {
        for (const effect of this.typingEffects) {
            await effect.type();
            await new Promise(resolve => setTimeout(resolve, this.delayBetweenTexts));
        }
        
        // After all typing is complete, show the CTA section
        const ctaSection = document.querySelector('.cta-section');
        if (ctaSection) {
            ctaSection.style.display = 'block';
            // Add a small delay before showing to make the transition smoother
            setTimeout(() => {
                ctaSection.style.opacity = '1';
            }, 300);
        }
    }
}

// Initialize typing effect immediately when page loads
document.addEventListener('DOMContentLoaded', () => {
    const typingElements = document.querySelectorAll('.typing-text');
    // Slower typing (40ms per char) and longer pause between sentences (1000ms)
    const sequentialTyping = new SequentialTyping(typingElements, 40, 1000);
    
    // Start typing after a longer initial delay (2.5 seconds)
    setTimeout(() => {
        sequentialTyping.startTyping();
    }, 2500);
});
