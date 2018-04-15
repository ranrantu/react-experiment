import React, {Component} from 'react'
import {connect} from 'dva'
import { Card, Icon } from 'antd'
import { Loader } from 'components'
import moment from 'moment';
import classnames from 'classnames'
import styles from './index.less'

export default class IconList extends Component {
    render() {
        return (
            <div className={styles.iconlist}>
                <Card
                    style={{ padding: 0 }}
                    title={<div className={styles.title}>车辆鉴定</div>
                    }
                >
                    <div className={styles.cardContainer}>
                        <div className={styles.number}>123123123辆</div>
                        <div className={styles.des}>车辆鉴定数</div>
                        <div className={styles.compare}>
                            <div className={styles.left}>
                                <span className={styles.font}>
                                    比昨天<Icon type='arrow-up' className={ styles.iconRed } />
                                </span>
                                <span className={ styles.iconRed }>321132</span>
                            </div>
                            <div className={styles.right}>
                                <span className={styles.font}>
                                    比上周<Icon type='arrow-down' className={ styles.iconGreen } />
                                </span>
                                <span className={ styles.iconGreen }>321132</span>
                                </div>
                        </div>
                    </div>
                    <div>123</div>
                </Card>
            </div>
        )
    }
}

