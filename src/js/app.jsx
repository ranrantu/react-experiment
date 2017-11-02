import React,{Component,PureComponent,PropTypes} from 'react';
import ReactDom from 'react-dom';
import Demo from './test';

class App extends PureComponent {
    constructor(...args){
        super(...args);
        this.state = {
            param:[1]
        }
    }

    onClick = () => {
        this.state.param.push(2)
        this.setState({
            param:[...this.state.param]
        })
    }

    render(){
        console.log(Demo.prototype);
        return <div>
            <div style={{border:'1px solid #000'}} onClick={this.onClick}>123</div>
            <Demo a={this.state.param} button={()=>{
                this.setState({
                    param:1000
                });
            }} />
        </div>
    }
}

ReactDom.render(<App/>,document.body.appendChild(document.createElement('div')));