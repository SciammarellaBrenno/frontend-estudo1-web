const helper = require('./helper');

interface Date {
    toYYYYMMDD() : string;
    isValid(): Boolean;
}

interface Number {
    toMoeda(casaDecimal: number, tipo: string): String;
    toDecimal(casaDecimal: number): String;
}

interface Boolean {
    toSimNao(): string;
}

interface Boolean {
    toIdaVolta(): string;
}

interface String {
    toDateYYYYMMDD() : string;
    toDateDDMMYYYY() : string;
    toDateTimeDDMMYYYY() : string;
}

Date.prototype.toYYYYMMDD = function() {
    return helper.AnoMesDia(this);
}

Date.prototype.isValid = function () { 
    return this.getTime() === this.getTime(); 
};

Number.prototype.toMoeda = function(casaDecimal: number = 2, tipo: string = 'R$') {
    let numero = this.toFixed(casaDecimal).split('.');
    numero[0] = `${tipo} ${numero[0].split(/(?=(?:...)*$)/).join('.')}`;
    
    return numero.join(',');
};

Number.prototype.toDecimal = function(casaDecimal: number = 2) {
    let numero = this.toFixed(casaDecimal).split('.');
    numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
    
    return numero.join(',');
};

Boolean.prototype.toSimNao = function() {
    return this == true ? 'Sim' : 'Não';
}

Boolean.prototype.toIdaVolta = function() {
    return this == true ? 'Ida' : 'Volta';
}

String.prototype.toDateYYYYMMDD = function() {

    if (!this) {
        return '';
    }

    return helper.AnoMesDia(new Date(helper.TrataDateTime(this)));
}

String.prototype.toDateDDMMYYYY = function() {

    if (!this) {
        return '';
    }

    return helper.DiaMesAno(new Date(helper.TrataDateTime(this)));
}

String.prototype.toDateTimeDDMMYYYY = function() {

    if (!this) {
        return '';
    }

    return helper.DiaMesAnoHora(new Date(helper.TrataDateTime(this)));
}