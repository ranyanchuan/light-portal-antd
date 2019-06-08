/* eslint-disable import/first */
/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Button, Col, Form, Icon, Modal, Row, Table, Tabs } from 'antd';
import { querystring } from 'querystring';
import ConInput from 'components/ConInput';
import ConAutoSelect from 'components/ConAutoSelect';

import styles from './index.less';


const { TabPane } = Tabs;
const ruleDate = 'YYYY-MM-DD';


@connect((state) => ({
  common: state.common,
}))

class UserDesc extends React.Component {

  state = {
    searchObj: {}, //搜索面板数据


    loading: false,
    basModVis: false,
    basModStatus: 'add',
    logisticsDataObj: {}, // 影视数据
    retailUserDataObj: {}, // 影视数据

  };


  componentDidMount() {
    const { query } = this.props.location;
    if (query && query.phone) {
      this.getTableData({ table: 'logistics' });
      this.getTableData({ table: 'retailUser' });
    }
  }


  // 获取表格数据
  getTableData = (payload) => {
    let { table } = payload;
    const { query } = this.props.location;

    payload.phone = query.phone;

    // 清空主表信息
    const tempState = {};
    tempState.logisticsTableLoading = true;
    tempState.logisticsDataObj = {};

    this.setState(tempState);

    this.props.dispatch({
      type: 'common/query',
      payload,
      callback: (response) => {
        const stateTemp = {};
        // 更新 table 数据
        stateTemp[table + 'DataObj'] = response;
        stateTemp[table + 'TableLoading'] = false;
        // 更新表格数据
        this.setState(stateTemp);
      },
    });
  };


  columns = [
    {
      title: '购买日期',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => {
        return text ? moment(text).format(ruleDate) : '';
      },
    },
    {
      title: '种类',
      dataIndex: 'domain',
      key: 'domain',
    },
    {
      title: '名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: '型号',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },

    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },

    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        if (text) {
          return <span>
            <Icon type="clock-circle" style={{ color: '#ff4d00', marginRight: '10px' }}/>
              <span>正在配送</span>
              </span>;
        } else {
          return <span>
                      <Icon type="check-circle" style={{ color: '#53ff1b', marginRight: '10px' }}/>
                    <span>配送完成</span>
               </span>;
        }
      },
    },
  ];

  // 修改分页
  onChangeBasicPage = (data) => {
    const { current, pageSize } = data;
    const param = {
      pageIndex: current - 1,
      size: pageSize,
    };
    // 获取分页数据
    this.getTableData({ ...param, table: 'logistics' });
  };


  render() {

    const { logisticsTableLoading, logisticsDataObj, retailUserDataObj } = this.state;

    const userInfo = retailUserDataObj.list && retailUserDataObj.list.length > 0 ? retailUserDataObj.list[0] : {};


    const formItemLayout = {
      labelCol: { sm: { span: 4 } },
      wrapperCol: { sm: { span: 19 } },
    };


    return (
      <div className={styles.user}>
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSearch}
        >
          <Row gutter={24}>

            <Col span={8}>
              <ConInput
                formItemLayout={formItemLayout}
                id="name"
                label="名字"
                disabled={true}
                defValue={userInfo.name}
              />
            </Col>

            <Col span={8}>
              <ConInput
                formItemLayout={formItemLayout}
                id="phone"
                label="手机号"
                disabled={true}
                defValue={userInfo.phone}

              />
            </Col>

            <Col span={8}>
              <ConInput
                formItemLayout={formItemLayout}
                id="card"
                label="身份证号"
                disabled={true}
                defValue={userInfo.card}

              />
            </Col>


            <Col span={8}>

              <ConAutoSelect
                formItemLayout={formItemLayout}
                id="town"
                label="居住镇"
                data={['客田镇']}
                disabled={true}
                defValue={userInfo.town}

              />
            </Col>

            <Col span={8}>
              <ConAutoSelect
                formItemLayout={formItemLayout}
                id="village"
                label="居住村"
                data={['客田村', '百合村']}
                disabled={true}
                defValue={userInfo.village}

              />
            </Col>

            <Col span={8}>
              <ConAutoSelect
                formItemLayout={formItemLayout}
                id="group"
                label="居住组"
                data={['杨家村组']}
                disabled={true}
                defValue={userInfo.group}

              />
            </Col>

          </Row>

        </Form>

        <Tabs defaultActiveKey="1" onChange={this.onChangeTable}>
          <TabPane tab="消费明细" key="1">

            <Table
              loading={logisticsTableLoading}
              size="small"
              rowKey={record => record._id}
              columns={this.columns}
              dataSource={logisticsDataObj.list ? logisticsDataObj.list : []}
              pagination={{
                current: logisticsDataObj.pageIndex + 1,
                total: logisticsDataObj.count,
                pageSize: logisticsDataObj.size,
              }}
              onChange={this.onChangeBasicPage}
              className={styles.newsTable}
            />


          </TabPane>
          <TabPane tab="消费统计" key="2">

          </TabPane>
        </Tabs>
      </div>

    );
  }
}

export default UserDesc;

