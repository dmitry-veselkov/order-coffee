const modal = document.getElementById('modal');
const openBtn = document.querySelector('.submit-button');
const closeBtn = document.querySelector(".close");
const modalContainer = document.querySelector('.modal-container');

const addButton = document.querySelector('.add-button');
const form = document.querySelector('form');

function getDrinksCount() {
    return document
        .querySelectorAll('.beverage')
        .length;
}

function updateBeverages() {
    const fieldsets = document.querySelectorAll('.beverage');

    fieldsets.forEach((fieldset, index) => {
        fieldset.style.position = 'relative';

        const title = fieldset.querySelector('.beverage-count');
        if (title) {
            title.textContent = `Напиток №${index + 1}`;
        }

        const radios = fieldset.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.name = `milk_${index + 1}`;
        });

        const checkboxes = fieldset.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.name = `options_${index + 1}`;
        });

        let removeBtn = fieldset.querySelector('.remove-btn');
        if (!removeBtn) {
            removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.innerHTML = '&#10006;';
            removeBtn.className = 'remove-btn';

            removeBtn.style.position = 'absolute';
            removeBtn.style.top = '20px';
            removeBtn.style.right = '20px';
            removeBtn.style.background = 'transparent';
            removeBtn.style.border = 'none';
            removeBtn.style.fontSize = '18px';

            fieldset.appendChild(removeBtn);
        }

        if (fieldsets.length === 1) {
            removeBtn.disabled = true;
            removeBtn.style.cursor = 'not-allowed';
            removeBtn.style.opacity = '0.3';
        } else {
            removeBtn.disabled = false;
            removeBtn.style.cursor = 'pointer';
            removeBtn.style.opacity = '1';
        }
    });
}

addButton.addEventListener('click', () => {
    const fieldsets = document.querySelectorAll('.beverage');

    const template = fieldsets[0];
    const newFieldset = template.cloneNode(true);

    const newCheckboxes = newFieldset.querySelectorAll('input[type="checkbox"]');
    newCheckboxes.forEach(cb => cb.checked = false);

    const newRadios = newFieldset.querySelectorAll('input[type="radio"]');
    if (newRadios.length > 0) newRadios[0].checked = true;

    const newTextarea = newFieldset.querySelector('textarea');
    if (newTextarea) {
        newTextarea.value = '';
    }

    const newOutput = newFieldset.querySelector('.live-output');
    if (newOutput) {
        newOutput.innerHTML = '';
    }

    template.parentNode.insertBefore(newFieldset, addButton.parentNode);

    updateBeverages();
});


form.addEventListener('click', (e) => {
    if (e.target.closest('.remove-btn')) {
        const fieldsets = document.querySelectorAll('.beverage');
        if (fieldsets.length > 1) {
            e.target.closest('.beverage').remove();
            updateBeverages();
        }
    }
});

updateBeverages();

form.addEventListener('input', (e) => {
    if (e.target.tagName.toLowerCase() === 'textarea') {

        const fieldset = e.target.closest('.beverage');
        const outputArea = fieldset.querySelector('.live-output');

        const text = e.target.value;

        const triggerWords = /(срочно|быстрее|побыстрее|скорее|поскорее|очень нужно)/gi;

        outputArea.innerHTML = text.replace(triggerWords, '<b>$&</b>');
    }
});

const drinksCountP = document.querySelector('.drinks-count');


function getDrinksWord(count) {
    const lastTwoDigits = count % 100;
    const lastDigit = count % 10;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return 'напитков';
    }

    if (lastDigit === 1) {
        return 'напиток';
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
        return 'напитка';
    }

    return 'напитков';
}


function getDrinksData() {
    return [
        {
            'title': 'Капучино',
            'milk': 'обычное',
            'dop': []
        },
        {
            'title': 'Какао',
            'milk': 'соевое',
            'dop': ['зефирки', 'шоколад']
        }
    ]
}

openBtn.onclick = () => {
    modal.style.display = "block";

    const drinksCount = getDrinksCount();
    const drinksWord = getDrinksWord(drinksCount);
    drinksCountP.textContent = `Вы заказали ${drinksCount} ${drinksWord}`;

    const drinksData = getDrinksData();
    let tablesItems = [];
    tablesItems.push('<table>');

    tablesItems.push('<table>');
};

closeBtn.onclick = () => {
    modal.style.display = "none";
};