import React, {Component} from 'react'
import {connect} from 'dva'
import {Button, Icon, Input, Select, Timeline, message, DatePicker} from 'antd'
import {Loader} from 'components'
import moment from 'moment';
import classnames from 'classnames'
import styles from './index.less'
import FlowMap from './flowMap'

/*
*          0
*   ///////////////
*   /             /
* 1 /             /  3
*   /             /
*   ///////////////
*          2
* */

export default class Flowsheet extends Component {
    constructor(...args) {
        super(...args)
        this.container = '';
        this.arrowList = [];
        this.state = {
            flowMapWidth:'auto'
        }
    }

    componentDidMount(){
        this.onresize();
        window.onresize = this.onresize;
    }

    onresize = () => {
        const target = document.querySelector('#flowMap');
        const rect = target.getBoundingClientRect();
        this.setState({flowMapWidth:rect.width + 'px'});
    }

    render() {
        const dataSource = [
            [
                {
                    title: '车辆鉴定',
                    content: '123,456辆',
                    inner: <span>比昨天 3.5%</span>,
                    lineTo: [
                        {depth: '1', index: '0', from: '1', to: '0'},
                        {depth: '1', index: '1', from: '2', to: '0'},
                        {depth: '1', index: '2', from: '3', to: '0'}
                    ]
                }
            ],
            [
                {
                    title: '发现问题车',
                    content: '123,456辆',
                    inner: <span>比昨天 3.5%</span>,
                    lineTo: [
                        {depth: '2', index: '0', from: '2', to: '0'},
                    ]
                },
                {
                    title: '发现低电车',
                    content: '123,456辆',
                    inner: <span>比昨天 3.5%</span>,
                    lineTo: [
                        {depth: '2', index: '4', from: '2', to: '0'},
                    ]
                },
                {
                    title: '发现沉默好车',
                    content: '123,456辆',
                    inner: <span>比昨天 3.5%</span>,
                    lineTo: [
                        {depth: '3', index: '4', from: '3', to: '3'},
                    ]
                },
                {
                    display:'none'
                }
            ],
            [
                {
                    title: '车辆入库',
                    content: '123,456辆',
                    inner: <span>比昨天 3.5%</span>,
                    lineTo: [
                        {depth: '2', index: '1', from: '3', to: '1'}
                    ]
                },
                {
                    title: '车辆维修',
                    content: '123,456辆',
                    inner: <span>比昨天 3.5%</span>,
                    lineTo: [
                        {depth: '2', index: '2', from: '3', to: '1'}
                    ]
                },
                {
                    title: '车辆质检',
                    content: '123,456辆',
                    inner: <span>比昨天 3.5%</span>,
                    lineTo: [
                        {depth: '2', index: '3', from: '3', to: '1'}
                    ]
                },
                {
                    title: '车辆出库',
                    content: '123,456辆',
                    inner: <span>比昨天 3.5%</span>,
                    lineTo: [
                        {depth: '3', index: '3', from: '2', to: '0'}
                    ]
                },
                {
                    title: '换电池',
                    content: '123,456辆',
                    inner: <span>比昨天 3.5%</span>,
                    lineTo: [
                        {depth: '3', index: '4', from: '2', to: '0'}
                    ]
                }
            ],
            [
                {
                    display:'none'
                },
                {
                    display:'none'
                },
                {
                    display:'none'
                },
                {
                    title: '维修投放',
                    content: '123,456辆',
                    inner: <span>比昨天 3.5%</span>,
                    lineTo: [
                        {depth: '3', index: '4', from: '3', to: '1'}
                    ]
                },
                {
                    title: '产单',
                    content: '123,456辆',
                    inner: <span>比昨天 3.5%</span>,
                }
            ]
        ];
        const config = {
            width:this.state.flowMapWidth,
            height:'700px',
            rectWidth:'120',      // box width
            rectHeight:'100'      // box height
        }
        return (
            <div id="flowMap" className={styles.flowsheet}>
                <FlowMap config={config} dataSource={dataSource}/>
            </div>
        )
    }
}

