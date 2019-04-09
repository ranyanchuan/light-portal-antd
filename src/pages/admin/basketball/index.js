/* eslint-disable import/first */
/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { connect } from 'dva';

import { Button, Modal, Tabs, Menu, Table, Divider, Tag, Avatar, Pagination } from 'antd';

import LayoutAdmin from 'components/Admin/LayoutAdmin';
import Search from 'components/Admin/Basketball/Search';
import Score from 'components/Admin/Basketball/Score';
import Relation from 'components/Admin/Basketball/Relation';
import Honor from 'components/Admin/Basketball/Honor';
import Salary from 'components/Admin/Basketball/Salary';
import BasicModal from 'components/Admin/Basketball/BasicModal';

import { clearQuotationMark } from 'utils';



import styles from './index.less';
import moment from 'moment';

const { TabPane } = Tabs;
const confirm = Modal.confirm;
const ruleDate = 'YYYY-MM-DD';


@connect((state) => ({
  adminBasketball: state.adminBasketball,
  common: state.common,
}))

class AdminBasketball extends React.Component {

  state = {
    defaultActiveKey: 'score', // 默认选中tab
    selectedRowKeys: [], // 选中行key
    selectedRowObj: {}, // 选中行对象

    loading: false,
    basModVis: false,
    basModStatus: 'add',

    scoreDataObj: null, // 比分数据
    relationDataObj: null, // 关系数据
    starDataObj: {}, // 基本数据

  };

  componentDidMount() {
    this.getTableData({ table: 'star', occupation: ['basketball'], category: ['player'] });
  }

  // 获取表格数据
  getTableData = (payload) => {
    const { table } = payload;
    this.props.dispatch({
      type: 'common/query',
      payload,
      callback: (response) => {

        const { list = [] } = response;
        const stateTemp = {};
        // 更新 table 数据
        if (list.length > 0 && table === 'star') {
          const { _id } = list[0];
          stateTemp.selectedRowKeys = [_id];
          stateTemp.selectedRowObj = list[0];

          const { defaultActiveKey } = this.state;
          const param = { table: defaultActiveKey, basicId: _id };
          this.getTableData(param);

        }
        stateTemp[table + 'DataObj'] = response;
        // 更新表格数据
        this.setState(stateTemp);
      },
    });
  };

  // 添加 || 更新 || 删除
  onActionTable = (payload) => {
    const { type, table } = payload;
    delete  payload.type;
    // 添加或者更新明星基本数据
    this.props.dispatch({
      type,
      payload,
      callback: (res) => {
        this.setState({ loading: false });
        const { selectedRowObj } = this.state;
        const { status } = res;
        if (status === 'success') {
          // 获取table 数据
          const param = { table };
          // 非主表
          if (table !== 'star') {
            param.basicId = selectedRowObj['_id'];
          }
          // 获取表格数据
          this.getTableData(param);
        } else {
          console.log(type, '失败');
        }
      },
    });
  };


  // 保存基本信息
  onClickSaveBasic = (data) => {

    const { basModStatus, selectedRowObj } = this.state;
    let payload = data;
    if (basModStatus === 'edit') {
      payload = {};
      payload.type = 'common/upd';
      payload.condition = { _id: selectedRowObj['id'] };
      payload.content = data;
    }
    // 添加类型
    if (basModStatus === 'add') {
      payload.type = 'common/add';
      payload.occupation = ['basketball'];
      payload.category = ['player'];
    }

    // 删除类型
    if (basModStatus === 'del') {
      payload.type = 'common/del';
      payload['_id'] = selectedRowObj['id'];
    }
    // 添加操作表名
    payload.table = 'star';
    // 获取表格数据
    this.onActionTable(payload);


  };


  // 改变tab
  onChangeTab = (table) => {
    const { selectedRowObj } = this.state;
    const { _id: basicId } = selectedRowObj;

    // 子表必须添加
    if (basicId) {
      const payload = { basicId, table };
      // 获取table 数据
      this.getTableData(payload);
    }
    // 更新tabs
    this.setState({ defaultActiveKey: table });

  };


  columns = [
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      render: avatar => (<Avatar src={avatar}/>),
    },
    {
      title: '名字',
      dataIndex: 'name',
      key: 'name',
      render: (text, item) => {
        const { name_cn } = item;
        const title = text ? (name_cn ? (text + '(' + name_cn + ')') : text) : name_cn;
        return <a href="javascript:;">{title}</a>;
      },
    },

    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: '出生日期',
      dataIndex: 'birthday',
      key: 'birthday',
      render: (text) => {
        return text ? moment(text).format(ruleDate) : '';
      },
    },

    {
      title: '国籍',
      dataIndex: 'nationality',
      key: 'nationality',
    },
    {
      title: '城市',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: '组织',
      dataIndex: 'organization',
      key: 'organization',
      render: text => <span>{text && Array.isArray(text) ? text.join(' | ') : ''}</span>,
    },
    {
      title: '球队',
      dataIndex: 'team',
      key: 'team',
      render: text => <span>{text && Array.isArray(text) ? text.join(' | ') : ''}</span>,
    },


    {
      title: '学校',
      dataIndex: 'school',
      key: 'school',
      render: text => <span>{text && Array.isArray(text) ? text.join(' | ') : ''}</span>,
    },

  ];

  // 更新选中的数据
  onSelectChange = (selectedRowKeys, selectedRowObjs) => {
    this.setState({ selectedRowKeys, selectedRowObj: selectedRowObjs[0] });
  };


  // 删除弹框确认
  showDelCon = (payload) => {
    const _this = this;
    confirm({
      title: '您确定要删除吗',
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        // 删除数据
        _this.getTableData(payload);
      },
      onCancel() {
        console.log('取消删除');
      },
    });
  };


  // 展示弹框
  onShowModal = (basModStatus) => {
    this.setState({ basModVis: true, basModStatus });
  };

  //  删除弹框
  onClickDel = () => {
    const { selectedRowObj } = this.state;
    let payload = { type: 'common/del', _id: selectedRowObj['_id'], table: 'star' };
    this.showDelCon(payload);

  };

  // 关闭弹框
  onClickClose = () => {
    this.setState({ basModVis: false, basModStatus: 'add' });
  };

  // 修改分页
  onChangeBasicPage = (data) => {
    const { current, pageSize } = data;
    const param = { pageIndex: current - 1, size: pageSize };
    this.getStarData(param);
  };


  hideModal = () => {
    const { modalVisible } = this.state;
    for (let item in modalVisible) {
      modalVisible[item] = false;
    }
    this.setState({ modalVisible });
  };


  render() {

    const { basModVis, selectedRowKeys, basModStatus, defaultActiveKey, selectedRowObj, starDataObj, scoreDataObj, relationDataObj } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      type: 'radio',
    };


    const honorData = [{
      key: '1',
      date: '2018-11-01',
      title: '11-12赛季总冠军(迈阿密热火)',
      comment: 'xxxxxxxxx',
    }, {
      key: '2',
      date: '2018-11-01',
      title: '11-12赛季总冠军(迈阿密热火)',
      comment: 'xxxxxxxxx',

    }, {
      key: '3',
      date: '2018-11-01',
      title: '11-12赛季总冠军(迈阿密热火)',
      comment: 'xxxxxxxxx',

    }, {
      key: '4',
      date: '2018-11-01',
      title: '11-12赛季总冠军(迈阿密热火)',
      comment: 'xxxxxxxxx',

    }, {
      key: '5',
      date: '2018-11-01',
      title: '11-12赛季总冠军(迈阿密热火)',
      comment: 'xxxxxxxxx',

    }, {
      key: '6',
      date: '2018-11-01',
      title: '11-12赛季总冠军(迈阿密热火)',
      comment: 'xxxxxxxxx',

    }];


    const salaryData = [
      {
        key: '1',
        start_date: '2018-01-01',
        end_date: '2018-12-31',
        money: '1000',
        unit: '$',
        comment: 'xxx',
      },
      {
        key: '2',
        start_date: '2018-01-01',
        end_date: '2018-12-31',
        money: '1000',
        unit: '$',
        comment: 'xxx',
      },
      {
        key: '3',
        start_date: '2018-01-01',
        end_date: '2018-12-31',
        money: '1000',
        unit: '$',
        comment: 'xxx',
      },
      {
        key: '4',
        start_date: '2018-01-01',
        end_date: '2018-12-31',
        money: '1000',
        unit: '$',
        comment: 'xxx',
      },
      {
        key: '5',
        start_date: '2018-01-01',
        end_date: '2018-12-31',
        money: '1000',
        unit: '$',
        comment: 'xxx',
      },
    ];


    console.log('basicDateObj', starDataObj);


    return (
      <LayoutAdmin {...this.props} selectKey={['basketball']}>
        <div className={styles.adminBasketball}>
          <Search/>
          <div className="table-operations">
            <Button onClick={this.onShowModal.bind(this, 'add')}>添加</Button>
            <Button onClick={this.onShowModal.bind(this, 'edit')}>编辑</Button>
            <Button onClick={this.onShowModal.bind(this, 'desc')}>详情</Button>
            <Button onClick={this.onClickDel}>删除</Button>
          </div>
          <Table
            size="small"
            rowKey={record => record._id}
            rowSelection={rowSelection}
            columns={this.columns}
            dataSource={starDataObj.list && starDataObj.list.length > 0 ? starDataObj.list : []}
            pagination={{
              current: starDataObj.pageIndex + 1,
              total: starDataObj.count,
              pageSize: starDataObj.size,
            }}
            onChange={this.onChangeBasicPage}
            className={styles.newsTable}
          />


          {/*子表数据*/}
          <Tabs defaultActiveKey={defaultActiveKey} onChange={this.onChangeTab}>
            <TabPane tab="比分数据" key="score">
              <Score
                scoreDataObj={scoreDataObj}
                onActionTable={this.onActionTable}
                basicRow={selectedRowObj}
                showDelCon={this.showDelCon}
              />
            </TabPane>
            <TabPane tab="查看关系" key="relation">
              <Relation
                relationDataObj={relationDataObj}
                basicRow={selectedRowObj}
                showDelCon={this.showDelCon}
                onActionTable={this.onActionTable}
              />
            </TabPane>
            <TabPane tab="查看荣誉" key="honor">
              <Honor honorDataArray={honorData} basicRow={selectedRowObj}/>
            </TabPane>
            <TabPane tab="生涯薪金" key="salary">
              <Salary salaryDataArray={salaryData} basicRow={selectedRowObj}/>
            </TabPane>
          </Tabs>
          <BasicModal
            visible={basModVis}
            status={basModStatus}
            onClose={this.onClickClose}
            onSave={this.onClickSaveBasic}
            basicData={basModStatus !== 'add' ? selectedRowObj : {}}
          />
        </div>
      </LayoutAdmin>
    );
  }
}

export default AdminBasketball;

