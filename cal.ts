const buttonContainer = document.getElementsByClassName('grid-container')[0] as HTMLDivElement;
const display = document.getElementsByTagName('input')[0] as HTMLInputElement;

const calArea = document.querySelector('.cal-area');
let isDragging = false;
let offsetX, offsetY;

calArea.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - calArea.getBoundingClientRect().left;
    offsetY = e.clientY - calArea.getBoundingClientRect().top;
    
    calArea.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const left = e.clientX - offsetX;
        const top = e.clientY - offsetY;

        calArea.style.left = `${left}px`;
        calArea.style.top = `${top}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    
    calArea.style.cursor = 'grab';
});

function handleClick(button: string): void {
    const operators = ['+', '-', '*', '/' , '%'];
    if (button === 'AC') {
        display.value = '';
    } else if (button === '=') {
        try {
            display.value = eval(display.value);
        } catch (e) {
            display.value = 'Error';
        }
    } else if (button === 'X') {
        display.value = display.value.slice(0, -1);
    } else if (operators.includes(button)) {
        if (operators.includes(display.value.slice(-1))) {
            display.value = display.value.slice(0, -1) + button;
        } else {
            display.value += button;
        }
    } else if (display.value === '.') {
        const lastNumber = display.value.split(/[\+\-\*\/\%]/)[-1];
        if (!lastNumber.includes('.'))
            display.value += button;
        }else {
        display.value += button;
    }
}

function addButtons():void {
    const buttons = [
        ['AC', 'X', '%', '/'],
        ['7', '8', '9', '*'],
        ['4', '5', '6', '-'],
        ['3', '2', '1', '+'],
        ['00', '0', '.', '='],
    ]

    buttons.forEach((row) => {
        row.forEach((button) => {
            const buttonElement = document.createElement('button');
            buttonElement.textContent = button;
            buttonElement.classList.add('button');
            buttonElement.classList.add(button);
            buttonElement.addEventListener('click', () => handleClick(button));
            buttonContainer.appendChild(buttonElement);
        })
    })
}

addButtons();