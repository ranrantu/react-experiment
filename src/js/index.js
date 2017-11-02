
class Demo{
    constructor(){
        // super();
        this.name = 'demo';
    }

    getName = () => {
        console.log(this.showContent());
        return Context;
    }

    showContent = () => {
        return null;
    }
}

const contain = document.createElement('div');

contain.innerHTML = new Demo().getName();

document.body.appendChild(contain);

export default a = 2;