var buttonContainer = document.getElementsByClassName('grid-container')[0];
var display = document.getElementsByTagName('input')[0];
var calArea = document.querySelector('.cal-area');
var isDragging = false;
var offsetX, offsetY;
// Handle mouse down event
calArea.addEventListener('mousedown', function (e) {
    isDragging = true;
    // Calculate the initial offset from the mouse to the element's top-left corner
    offsetX = e.clientX - calArea.getBoundingClientRect().left;
    offsetY = e.clientY - calArea.getBoundingClientRect().top;
    // Change cursor to indicate drag
    calArea.style.cursor = 'grabbing';
});
// Handle mouse move event
document.addEventListener('mousemove', function (e) {
    if (isDragging) {
        // Calculate the new position of the element
        var left = e.clientX - offsetX;
        var top_1 = e.clientY - offsetY;
        // Apply the new position
        calArea.style.left = "".concat(left, "px");
        calArea.style.top = "".concat(top_1, "px");
    }
});
// Handle mouse up event
document.addEventListener('mouseup', function () {
    isDragging = false;
    // Change cursor back to grab
    calArea.style.cursor = 'grab';
});
function handleClick(button) {
    var operators = ['+', '-', '*', '/', '%'];
    if (button === 'AC') {
        display.value = '';
    }
    else if (button === '=') {
        try {
            display.value = eval(display.value);
        }
        catch (e) {
            display.value = 'Error';
        }
    }
    else if (button === 'X') {
        display.value = display.value.slice(0, -1);
    }
    else if (operators.includes(button)) {
        if (operators.includes(display.value.slice(-1))) {
            display.value = display.value.slice(0, -1) + button;
        }
        else {
            display.value += button;
        }
    }
    else if (display.value === '.') {
        var lastNumber = display.value.split(/[\+\-\*\/\%]/)[-1];
        if (!lastNumber.includes('.'))
            display.value += button;
    }
    else {
        display.value += button;
    }
}
function addButtons() {
    var buttons = [
        ['AC', 'X', '%', '/'],
        ['7', '8', '9', '*'],
        ['4', '5', '6', '-'],
        ['3', '2', '1', '+'],
        ['00', '0', '.', '='],
    ];
    buttons.forEach(function (row) {
        row.forEach(function (button) {
            var buttonElement = document.createElement('button');
            buttonElement.textContent = button;
            buttonElement.classList.add('button');
            buttonElement.classList.add(button);
            buttonElement.addEventListener('click', function () { return handleClick(button); });
            buttonContainer.appendChild(buttonElement);
        });
    });
}
addButtons();
