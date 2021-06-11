'use strict'

function loadFromStorage(key) {
    var str = localStorage.getItem(key)
    if (str) return JSON.parse(str)
}


function saveToStorage(Key, value) {
    localStorage.setItem(Key, JSON.stringify(value))
    return value
}

