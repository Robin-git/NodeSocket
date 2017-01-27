"use strict";

const config = require('../server.config.js').config;

var random = function () {
    let ran = Math.random() * (5 - 0);
    return Math.round(ran);
}

var randomValid = function () {
    let ran = Math.round(Math.random() * (100 - 0));
    if (ran == 1) return 'Error';
    else return 'Valide';
}

var randomTime = function () {
    let ran = Math.random() * (500 - 100) + 100;
    return Math.round(ran);
}

var getEtape = function (loader) {
    if (loader < 10)
        return 'En cours...';
    else if (loader >= 10 && loader < 75)
        return 'Indexation...';
    else if (loader >= 75 && loader < 100)
        return 'En cours de typage...';
    else return 'Fini !';
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
            loader: 0,
            etape: 'Création',
            status: 'Valide'
        }
        array.push(data);
    }
    return array;
}

function sendLoading(array) {
    array.forEach((value, index) => {
        if (array[index]['status'] == 'Error') 
            return;
        else if (array[index]['loader'] < 100) array[index]['status'] = randomValid();
        if (array[index].loader >= 100) {
            array[index].loader = 100;
        } else {
            array[index].time -= 30;
            if (array[index].time < 0) array[index].time = 0;
            let loaded = Math.round((array[index].time / array[index].timetotal) * 100);
            array[index].loader = 100 - loaded;
            array[index].etape = getEtape(array[index].loader);
        }
    });
}

function reloadDocs(array) {
    let valid = 0;
    array.forEach((value, index) => {
        if (value.loader == 100 || value['status'] == 'Error') {
            valid++;
            return;
        }
    });
    if (valid === array.length) 
        return true;
    else 
        return false;
}

exports.generate = sendDoc;
exports.refreshLoad = sendLoading;
exports.reloadDocs = reloadDocs;