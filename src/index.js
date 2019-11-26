/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
  for (let i = 0; i < array.length; i++ ) {
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

    for (let i = 0; i < array.length; i++ ) {
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
  var prev, i;

    if (initial == undefined) { 
        prev = array[0];
        i = 1;
    } else {
        prev = initial;
        i = 0;
    }
    for (i; i < array.length; i++) {
        prev= fn(prev, array[i], i, array);
    }

    return prev;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    
    var keys = []

    for (var item in obj) {keys.push(item)}

    keys.forEach ( function(item, i, keys) {
        keys[i] = keys[i].toUpperCase();
    })

    return keys;
  }

console.log(upperProps());
/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
  var array2 = [];

  if (to === undefined) {
      to = array.length;
  } else if (to < 0) {
      to = array.length + to;
  }

  if (from < 0) {
      from = 0;
  }

  if (from != to) {
      for (let i = from; i < to; i++) {
          if (i == array.length) {
              break;
          }
          array2[i - from] = array[i];
          if (i == to) {
              break;
          }
      }
  }

  return array2;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
