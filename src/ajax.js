"use strict";

const config = require('../server.config.js').config;

var random = function () {
    let ran = Math.random() * (5 - 0);
    return Math.round(ran);
}

var randomTime = function () {
    let ran = Math.random() * (50 - 5) + 5;
    return Math.round(ran);
}

var randomDoc = function () {
    let ran = random();
    switch (ran) {
        case 0:
            return 'pdf';
        case 1:
            return 'facture';
        case 2:
            return 'png';
        case 3:
            return 'jpg';
        case 4:
            return 'psx';
        case 5:
            return 'rb';
        case 6:
            return 'py';
        default:
            return 'Error de typage';
    }
}

function sendDoc() {
    let array = [];
    for (let i = 0; i < config.documents.nb; i++) {
        let time = randomTime();
        let data = {
            id: i,
            document: randomDoc(),
            time: time,
            timetotal: time,
            loader: 0
        }
        array.push(data);
    }
    return array;
}

function sendLoading(array) {
    array.forEach((value, index) => {
        if (array[index].loader >= 100) {
            array.splice(index, 1);
        } else {
            --array[index].time;
            let loaded = Math.round((array[index].time / array[index].timetotal) * 100);
            array[index].loader = 100 - loaded;
        }
    });
}

exports.generate = sendDoc;
exports.refreshLoad = sendLoading;