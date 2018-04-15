import React, {Component} from 'react'
import SvgPathGenerator from './svgPathGenerator';
import styles from './index.less'
import classnames from 'classnames'

// const

class FlowMap extends Component {
    constructor(...args) {
        super(...args);
    }

    getAxisByLength = (length) => {
        if (length === 1) {
            return 400;
        } else if (length === 3) {
            return 150;
        } else if(length === 4){
            return 200;
        }else if (length === 5) {
            return 140;
        } else {
            return 150;
        }
    }

    getOffsetLeft = (length) => {
        if (length === 1) {
            return 240;
        } else {
            return 50;
        }
    }

    getAxisByFrom = (x, y, str) => {
        if (str == 0) {
            return [x + 60, y];
        } else if (str == 1) {
            return [x, y + 50];
        } else if (str == 2) {
            return [x + 60, y + 100];
        } else if (str == 3) {
            return [x + 120, y + 50];
        }
    }

    render() {
        const tree = this.props.dataSource;
        let boxes = [];
        let maskBoxes = [];
        let pathList = [];
        /* i行 j列 */
        for (let i = 0; i < tree.length; i++) {
            for (let j = 0; j < tree[i].length; j++) {
                tree[i][j].x = this.getOffsetLeft(tree[i].length) + (this.getAxisByLength(tree[i].length)*.7 + 50) * j;
                tree[i][j].y = 50 + i * 170;
                if(tree[i][j].display !== 'none'){
                    boxes.push(<div key={i + '' + j} className={classnames(styles.box,{[styles.active]:tree[i][j].active})}
                                    style={{left: tree[i][j].x + 'px', top: tree[i][j].y + 'px'}}>
                        <div className={classnames(styles.header)}>{tree[i][j].title}</div>
                        <div className={classnames(styles.title)}>{tree[i][j].content}</div>
                        <div className={classnames(styles.inner)}>{tree[i][j].inner}</div>
                    </div>);
                    maskBoxes.push(<div key={i + '' + j + 'maskbox'} className={classnames(styles.maskBox,{[styles.active]:tree[i][j].active})}
                                        style={{left: tree[i][j].x + 'px', top: tree[i][j].y + 'px'}}
                                        onMouseEnter={()=>{
                                            tree[i][j].active = true;
                                            this.setState({})
                                        }}
                                        onMouseLeave={()=>{
                                            tree[i][j].active = false;
                                            this.setState({})
                                        }}
                                        // onClick
                    ></div>)
                }
            }
        }
        for (let i = 0; i < tree.length; i++) {
            for (let j = 0; j < tree[i].length; j++) {
                if (tree[i][j].lineTo) {
                    const lines = tree[i][j].lineTo;
                    for (let l = 0; l < lines.length; l++) {
                        /* lines[l].depth  lines[l].index */
                        const {depth, index, from, to} = lines[l];
                        pathList.push({
                            start: this.getAxisByFrom(tree[i][j].x, tree[i][j].y, from),
                            end: this.getAxisByFrom(tree[depth][index].x, tree[depth][index].y, to),
                            from: from,
                            to: to
                        })
                    }
                }
            }
        }
        let maxLength = Math.max(...this.props.dataSource.map(item=>item.length)) * (+ this.props.config.rectWidth + 32) + 100;
        let width = '';

        if(maxLength > parseInt(this.props.config.width)){
            width = maxLength;
        }else{
            width = this.props.config.width;
        }
        console.log(this.props.config.width,maxLength,Math.max(...this.props.dataSource.map(item=>item.length)));
        return <div id="flowMap" style={{width:width,height:this.props.config.height}}>
            {boxes}
            <SvgPathGenerator
                width={width}
                height={this.props.config.height}
                pathList={pathList}
            />
            {maskBoxes}
        </div>
    }
}

export default FlowMap
