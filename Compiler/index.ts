type htmlElement = HTMLElement | null;

/**
 * 闇黑模式
 */
let darkMode = () => {
    const [darkModeBtn, html] = [
        document.getElementById('darkModeBtn') as htmlElement,
        document.querySelector('html') as htmlElement,
    ];
    if (html && darkModeBtn) {
        const dataTheme: unknown = html.getAttribute('data-theme');
        localStorage.setItem("theme", dataTheme as string);
        if (localStorage.theme === 'dark') {
            html.setAttribute('data-theme', 'light');
            darkModeBtn.innerHTML = '<i class="ai-moon-fill"></i>';
        } else {
            html.setAttribute('data-theme', 'dark');
            darkModeBtn.innerHTML = '<i class="ai-sun-fill"></i>';
        }
    }
}

/**
 * 計算兩數計算結果
 * @param a 被計算值
 * @param b 計算值
 * @param calculator 計算方式 
 * @returns 計算結果
 */
let contValue = (a: number, b: number, calculator: string) => {
    switch (calculator) {
        case '+':
            return a + b + '';
        case '-':
            return a - b + '';
        case 'x':
            return a * b + '';
        case '÷':
            return a / b + '';
        default:
            return '';
    }
}

/**
 * 判斷點選值
 * @param clickValue 點選值
 */
let checkValue = (clickValue: string) => {
    const [value, answer, calculator] = [
        document.querySelector('#main') as htmlElement,
        document.querySelector('#answer') as htmlElement,
        document.querySelector('#calculator') as htmlElement
    ];
    if (value && answer && calculator) {
        value.innerText = value.innerText.trim();
        switch (clickValue) {
            case 'AC':
                value.innerHTML = '&nbsp;';
                break;
            case '±':
                if (value.innerText === '') {
                    value.innerHTML = '&nbsp;';
                } else {
                    value.innerText = Number(value.innerText) > 0 ? '-' + value.innerText : value.innerText.replace('-', '');
                }
                break;
            case '%':
                if (value.innerText === '') {
                    value.innerHTML = '&nbsp;';
                } else {
                    value.innerText = Number(value.innerText) / 100 + '';
                }
                break;
            case '.':
                value.innerText = value.innerText.includes('.') ? value.innerText : value.innerText + clickValue;
                break;
            case '+':
            case '-':
            case 'x':
            case '÷':
                if (value.innerText !== '') {
                    answer.innerText = value.innerText;
                }
                [calculator.innerText, value.innerHTML] = [clickValue, '&nbsp;'];
                break;
            case '=':
                value.innerText = contValue(Number(answer.innerText), Number(value.innerText), calculator.innerText);
                answer.innerText, calculator.innerText = '';
                break;
            default:
                if (value.innerText === '0') {
                    value.innerText = clickValue;
                } else {
                    value.innerText += clickValue;
                }
                break;
        }
    }
}

const darkModeBtn: htmlElement = document.getElementById('darkModeBtn');
darkModeBtn && darkModeBtn.addEventListener('click', darkMode);

const compilerBtn: NodeList = document.querySelectorAll('.compilerBtn');
for (let i: number = 0; i < compilerBtn.length; i ++) {
    compilerBtn[i].addEventListener('click', function (this: htmlElement) {
        const clickValue: unknown = this?.innerText;
        checkValue(clickValue as string);
    });
}