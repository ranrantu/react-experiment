import React, {Component} from 'react'
import classnames from 'classnames'

class SvgPathGenerator extends Component {
    constructor(...args) {
        super(...args);
    }

    renderSVGMap = () => {
        const map = document.createElement('svg');
    }

    renderArrow = (path, direction) => {
        const svgPath = <path d={'M' + ''}/>
    }

    getTriangle = (direction, end) => {
        if (direction === 'down') {
            return `M${end[0] - 8},${end[1] - 12} ${end[0] + 8},${end[1] - 12} ${end[0]},${end[1]}`
        } else if (direction === 'left') {
            return `M${end[0]},${end[1]} ${end[0] + 14},${end[1] - 8} ${end[0] + 14},${end[1] + 8}`
        } else if (direction === 'right') {
            return `M${end[0]},${end[1]} ${end[0] - 14},${end[1] - 8} ${end[0] - 14},${end[1] + 8}`
        }
    }

    render() {
        const {width, height, path} = this.props;
        const offset = 30;
        const pathList = this.props.pathList.map((item, index) => {
            const {start, end, from, to} = item;
            let path = '';
            let direction = 'down';
            if (from === to && (+from) % 2 !== 0) {
                path = start[1] === end[1] ?
                    [start, [end[0]+3,end[1]]]
                    : [
                        start.join(','),
                        end[0] > start[0] ? (end[0] + offset + ',' + start[1]) : (start[0] + offset + ',' + start[1]),
                        end[0] > start[0] ? (end[0] + offset + ',' + end[1]) : (start[0] + offset + ',' + end[1]),
                        [end[0]+3,end[1]].join(',')
                    ];
                direction = 'left';
            } else if (from === '2' && to === '0') {
                path = (start[0] === end[0]) ?
                    [start, [end[0],end[1]-3]]
                    : [
                        start.join(','),
                        `${start[0]},${end[1] > start[1] ? (start[1] + (end[1] - start[1]) / 2) : (end[1] + (start[1] - end[1]) / 2)}`,
                        `${end[0]},${end[1] > start[1] ? (start[1] + (end[1] - start[1]) / 2) : (end[1] + (+start[1] - end[1]) / 2)}`,
                        [end[0],end[1]-3].join(',')
                    ];
                direction = 'down';
            } else if(from === '3' && to === '1'){
                path = (start[1] === end[1])?
                    [start, [end[0]-3,end[1]]]
                    : [
                        start.join(','),
                        [end[0]-3,end[1]].join(',')
                    ];
                direction = 'right';
            } else if ((from === '1' || from === '3') && to === '0') {
                path = [start.join(','), end[0] + ',' + start[1], [end[0],end[1]-3].join(',')];
                direction = 'down';
            }
            return <g key={index}>
                {
                    path.length === 2 ?
                        <polyline points={'' + path.map(item=>{
                            return direction === 'down' ? [item[0]+1,item[1]] : [item[0],item[1]+1];
                        }).join(' ') + ' ' + path.reverse().map(item=>{
                            return direction === 'down' ? [item[0]-1,item[1]] : [item[0],item[1]-1];
                        }).join(' ')}
                              fill="transparent"
                              stroke="url(#Gradient2)"
                              strokeWidth="2"
                        ></polyline> :
                        <polyline points={'' + path.join(' ')}
                              fill="transparent"
                              stroke="url(#Gradient2)"
                              strokeWidth="4"
                        ></polyline>
                }
                <path d={this.getTriangle(direction, end)}
                      fill="url(#Gradient2)"></path>
                <circle cx={start[0]} cy={start[1]} r="5" fill="url(#Gradient2)"></circle>
            </g>;
        })
        console.log(width,height);
        return <div style={{background: 'transparent', width: width, height: height}}>
            <svg style={{width: width, height: height,position:'absolute',left:0,top:0}}
                 version="1.1" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="Gradient2" x1="0" y1="0" x2="-1" y2="-1">
                        <stop offset="0%" stopColor="#FFEC00"/>
                        <stop offset="100%" stopColor="#FECC00"/>
                    </linearGradient>
                    <marker id="Triangle" viewBox="0 0 10 10" refX="1" refY="5"
                            markerWidth="6" markerHeight="6" orient="auto">
                        <path d="M 0 0 L 10 5 L 0 10 z" />
                    </marker>
                </defs>
                {pathList}
            </svg>
        </div>
    }
}

export default SvgPathGenerator
