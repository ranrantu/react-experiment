import React,{Component, PureComponent} from 'react';

class Demo extends Component{
    constructor(){
        super();
        this.name = 'demo';
        this.state = {
            name:1,
        }
    }

    getName = () => {
        console.log(this.showContent());
        return '';
    }

    showContent = () => {
        return null;
    }

    buttonOnClick = () => {
        this.state.name = 2;
        this.props.button && this.props.button();
    }

    render(){
        return <div>
            <div style={{border:'1px solid #000',width:'200px'}} onClick={this.buttonOnClick}>
                按钮
            </div>
            {this.state.name}
        </div>;
    }
}

export default Demo;