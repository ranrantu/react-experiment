import excel from 'js-export-excel';

class ComponentA {

}

class Demo {
    constructor(){
        // super();
        this.name = 'demo';
    }

    getName = () => {
        console.log(this.showContent());
        return this.name;
    }

    showContent = () => {
        return null;
    }
}

const contain = document.getElementById('container');

contain.innerHTML = new Demo().getName();