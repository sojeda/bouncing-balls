class Animal {
    constructor(name) {
        this.name = name
    }

    vivir() {
        console.log('Vivo')
    }
}

class Perro extends Animal {
    constructor(name, breed) {
        super(name)
        this.breed = breed
    }

    ladrar() {
        console.log('Wao')
    }

    raza() {
        console.log(this.breed)
    }
}

class Aleman extends Perro {
    constructor(name) {
        super(name, 'Aleman')
    }
}

let aleman = new Aleman('Pichichu')