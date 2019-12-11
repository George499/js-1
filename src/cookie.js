/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

window.onload = createTable(getCookies());

function getCookies() {
    const cookie = document.cookie;

    return cookie.split('; ').reduce((prev, current) => {
        let [name, value] = current.split('=');

        prev[name] = value;

        return prev;
    }, {})

}

function createTable(cookiesObj = {}) {
    listTable.innerHTML = '';
    for (var obj in cookiesObj) {
        if (obj) {
            var chunk = filterNameInput.value;

            if (isMatching(cookiesObj[obj], chunk) || isMatching(obj, chunk)) { // сравнение табличных куки с фильтром
                var tableRow = document.createElement('tr');

                tableRow.className = 'row';
                listTable.appendChild(tableRow);

                var nameCell = document.createElement('td');

                nameCell.textContent = obj;
                tableRow.appendChild(nameCell);

                var valueCell = document.createElement('td');

                valueCell.textContent = cookiesObj[obj];
                tableRow.appendChild(valueCell);

                var deleteCell = document.createElement('td');
                var deleteButton = document.createElement('button');

                deleteButton.textContent = 'Удалить';
                deleteCell.appendChild(deleteButton);
                tableRow.appendChild(deleteCell);
            }
        }
    }
}

function isMatching(full, chunk) {
    return full.includes(chunk)
}

listTable.addEventListener('click', (e) => {
    var del = e.target;

    if (del.tagName === 'BUTTON') {
        var name = del.closest('.row').firstElementChild.innerText;

        listTable.removeChild(del.closest('.row'));
        deleteCookie(name);
    }
})

function deleteCookie(name) {
    document.cookie = name + '=' + ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
}

filterNameInput.addEventListener('keyup', function() {
    var cookieValue = filterNameInput.value;

    // вывод всез куки
    if (!cookieValue) {
        createTable(getCookies());
    } else { // фильтр куки 
        var resultCookies = {};

        for (var obj in getCookies()) {
            if (obj) {
                if (isMatching(obj, cookieValue) || isMatching(getCookies()[obj], cookieValue)) {
                    resultCookies[obj] = getCookies()[obj];
                }
            }
        }
        createTable(resultCookies);
    }
});

addButton.addEventListener('click', () => {
    document.cookie = `${addNameInput.value} = ${addValueInput.value}`;
    createTable(getCookies());
});