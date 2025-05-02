function Calculator() {
    this.display = document.querySelector('.display');

    this.initiate = () => {
        this.captureClicks();
        this.pressEnter();
        this.pressCleaner();
    };

    this.addNumDisplay = el => this.display.value += el.innerText;

    this.clearDisplay = () => this.display.value = '';

    this.calculate = () => {
        const expression = this.display.value;
        const isValid = /^[\d+\-*/().]+$/.test(expression);

        if(!isValid) {
            alert('Invalid expression');
            return;
        }

        try {
            const result = Function('return ' + expression)();

            this.display.value = String(result);
        } catch (e) {
            alert(`Error calculating expression: ${e.message}`);
            this.clearDisplay();
            return;
        }
    };

    this.delete = () => this.display.value = this.display.value.slice(0, -1);

    this.pressCleaner = () => {
        this.display.addEventListener('keydown', (e) => {
            if (e.key === 'c' || e.key === 'C') {
                e.preventDefault();
                this.clearDisplay();
            }
        });
    };

    this.pressDelete = () => {
        this.display.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace') {
                this.delete();
            }
        });
    };

    this.pressEnter = () => {
        this.display.addEventListener('keyup', (e) => {
           if (e.key === 'Enter') {
               this.calculate();
           }
        });
    };

    this.captureClicks = () => {
        document.addEventListener('click', e => {
            const el = e.target;

            if (el.classList.contains('btn-num')) this.addNumDisplay(el);
            if (el.classList.contains('btn-eq')) this.calculate();
            if (el.classList.contains('btn-clear')) this.clearDisplay();
            if (el.classList.contains('btn-del')) this.delete(el);
        });
    };
}

const calculator = new Calculator();
calculator.initiate();