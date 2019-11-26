/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }

    return array;
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    var mapArray = [];

    for (let i = 0; i < array.length; i++) {
        mapArray.push(fn(array[i], i, array));
    }

    return mapArray;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    let i = 0;

    let result = initial || array[i++];

    while (i < array.length) {
        result = fn(result, array[i], i, array);
        i++
    }

    return result

    //  if (initial == undefined) { 
    //     prev = array[0];
    //     i = 1;
    // } else {
    //     prev = initial;
    //     i = 0;
    // }
    // for (i; i < array.length; i++) {
    //     prev= fn(prev, array[i], i, array);
    // }

    // return prev;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {

    var keys = []

    for (var item in obj) {
        if (obj.hasOwnProperty(item)) {
            keys.push(item)
        }
    }

    keys.forEach(function(item, i, keys) {
        keys[i] = keys[i].toUpperCase();
    })

    return keys;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
    // var sliceArr = []

    // if (from > 0 && to > 0) {
    //     for (i = 0; i < array.length; i++) {
    //         sliceArr.push(arrai[i])
    //     }
    // } else if (from == undefined) {
    //     for (i = from; i < array.length; i++) {
    //         sliceArr.push(arrai[i])
    //     }
    // }
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};