import React, {Component} from 'react'
import {connect} from 'dva'
import { Button, Icon, Input, Select, Timeline, message, DatePicker } from 'antd'
import { Loader } from 'components'
import moment from 'moment';
import classnames from 'classnames'
import styles from './index.less'
import Flowsheet from './flowsheet'
import IconList from './iconlist'
const Option = Select.Option

class Overview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: moment(new Date(new Date().getTime() - 86400000)).format('YYYY-MM-DD'),
            region_id: '',
            city_code: '',
        }
    }
    loadData = () => {
        console.log(222)
    }
    regionChange = (region_id) => {
        this.props.dispatch({
            type: 'business/citylist',
            payload: { region_id }
        })
        this.setState({ region_id })
    }
    render() {
        const { date, region_id, city_code } = this.state
        const { regionlist, citylist } = this.props.business
        return (
            <div className={classnames('content-inner', styles.Overview)}>
                <div className={styles.search}>
                    <div className={styles.divWidth}>
                        <span className={styles.width}>选择日期:</span>
                        <DatePicker size="large"
                            defaultValue={ moment(date, 'YYYY-MM-DD')}
                            onChange={(e) => this.setState({startday: moment(e).format('YYYY-MM-DD')})} 
                        />
                    </div>
                    <div className={styles.divWidth}>
                        <span style={{width: '40px', display: 'inline-block'}}>战区:</span>
                        <Select
                            className={styles.inputWidth}
                            onSelect={this.regionChange.bind(this)}
                            showSearch
                            value={"" + region_id}
                            filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                        >
                            <Option value="">全部</Option>
                            {
                                regionlist.length && regionlist.map((item, index) => (
                                    <Option key={''+index} value={"" + item.id}>{item.org_name}</Option>
                                ))
                            }
                        </Select>
                    </div>
                    <div className={styles.divWidth}>
                        <span style={{width: '40px', display: 'inline-block'}}>城市:</span>
                        <Select
                            className={styles.inputWidth}
                            onSelect={(e) => this.setState({city_code: e})}
                            showSearch
                            value={"" + city_code}
                            filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                        >
                            <Option value="">全部</Option>
                            {
                                citylist.length && citylist.map((item, index) => (
                                    <Option key={''+index} value={"" +item.id}>{item.org_name}</Option>
                                ))
                            }
                        </Select>
                    </div>
                    <Button type="primary" onClick={this.loadData} >查询</Button>
                </div>
                <div className={styles.content}>
                    <Flowsheet />
                    <IconList />
                </div>
            </div>
        )
    }
}

export default connect(({business, loading}) => ({business, loading}))(Overview)
