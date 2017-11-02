import React,{Component, PureComponent} from 'react';

class Demo extends PureComponent{
    constructor(){
        super();
        this.name = 'demo';
    }

    getName = () => {
        console.log(this.showContent());
        return '';
    }

    showContent = () => {
        return null;
    }

    buttonOnClick = () => {
        this.props.button && this.props.button();
    }

    render(){
        return <div>
            <div style={{border:'1px solid #000'}} onClick={this.buttonOnClick}>
                button
            </div>
            {this.props.a}
        </div>;
    }
}

export default Demo;