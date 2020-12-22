class Calculator{
    constructor(previousOperandText, currentOperandText)
    {
        this.previousOperandText=previousOperandText;
        this.currentOperandText=currentOperandText;
        this.clear();
    };

    clear()
    {
        this.currentOperand='';
        this.previousOperand='';
        this.operation=undefined;
    }

    delete()
    {
        this.currentOperand=this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number)
    {
        if(number=== '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation)
    {
        if(this.currentOperand === '') return;
        if(this.previousOperand !== '')
        {
            this.compute();
        }
        this.operation=operation;
        this.previousOperand=this.currentOperand;
        this.currentOperand='';
    }

    compute()
    {    
        let computation;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if(isNaN(previous) || isNaN(current)) return;

        switch(this.operation)
        {
            case '+':
                computation=previous + current;
                break;
            case '-':
                computation=previous - current;
                break;
            case '/':
                computation=previous / current;
                break;
            case 'x':
                computation=previous * current;
                break;
            case '%':
                computation=previous % current;
                break;
            default: 
                return;

        }
        this.currentOperand=computation;
        this.operation=undefined;
        this.previousOperand='';
    }
    getDisplayNumber(number)
    {
        const floatNumber= parseFloat(number);
        if(isNaN(floatNumber)) return '';

        return floatNumber.toLocaleString('en');
    }
    updateDisplay()
    {
        this.currentOperandText.innerText=this.getDisplayNumber(this.currentOperand);
        if(this.operation != null)
        {
            this.previousOperandText.innerText=`${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        }else{
            this.previousOperandText.innerText='';
        }
    }
}

const previousOperandText=document.querySelector('[calc-previous]');
const currentOperandText=document.querySelector('[calc-current]');
const numberBtn=document.querySelectorAll('[calc-number]');
const operationBtn=document.querySelectorAll('[calc-operation]');
const clearBtn=document.querySelector('[calc-clear]');
const deleteBtn=document.querySelector('[calc-delete]');
const equalsBtn=document.querySelector('[calc-equals]');

const calculator=new Calculator(previousOperandText, currentOperandText);

numberBtn.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})
operationBtn.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsBtn.addEventListener('click', button =>{
    calculator.compute();
    calculator.updateDisplay();
})

clearBtn.addEventListener('click', button =>{
    calculator.clear();
    calculator.updateDisplay();
})

deleteBtn.addEventListener('click', button =>{
    calculator.delete();
    calculator.updateDisplay();
})