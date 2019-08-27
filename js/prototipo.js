function Animal(name) {
    this.name = name;

    this.vivir = function () {
        console.log('Vivo')
    }
}

function Perro(name) {
    Animal.call(this, name)
    this.ladrar = function() {
        console.log('Wao')
    }

    this.raza = function() {
        console.log(this.breed)
    }
}

function Aleman(name) {
    Perro.call(this, name)
}

let aleman = new Aleman('Pichichu')

Aleman.prototype.morder = function() {
    console.log('Muerdo');
}