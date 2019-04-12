/* eslint-disable import/first */
/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Button, Modal, Tabs, Table, Avatar } from 'antd';

import LayoutAdmin from 'components/Admin/LayoutAdmin';
import Search from 'components/Admin/Football/Search';
import Score from 'components/Admin/Basketball/Score';
import BasicModal from 'components/Admin/Football/BasicModal';

import Relation from 'components/Admin/Common/Relation';
import Honor from 'components/Admin/Common/Honor';
import Salary from 'components/Admin/Common/Salary';

import styles from './index.less';


const { TabPane } = Tabs;
const confirm = Modal.confirm;
const ruleDate = 'YYYY-MM-DD';

@connect((state) => ({
  common: state.common,
}))

class AdminFootball extends React.Component {

  state = {
    searchObj: {}, //搜索面板数据
    defaultActiveKey: 'salary', // 默认选中tab
    selectedRowKeys: [], // 选中行key
    selectedRowObj: {}, // 选中行对象

    loading: false,
    basModVis: false,
    basModStatus: 'add',

    scoreDataObj: {}, // 比分数据
    relationDataObj: {}, // 关系数据
    starDataObj: {}, // 基本数据
    honorDataObj: {}, // 荣誉数据
    salaryDataObj: {}, // 资薪数据
  };


  componentDidMount() {
    this.getTableData({ table: 'star' });
  }

  // 搜索面板值
  onSearchPannel = (param) => {
    this.getTableData({ ...param, table: 'star' });
  };


  // 获取表格数据
  getTableData = (payload) => {
    const { table } = payload;
    // 清空主表信息
    const tempState = {};
    // 如果子表请求清空子表
    if (table !== 'star') {
      tempState[table + 'DataObj'] = {};
    }
    //  如果主表表请求清 主表 和 空子表
    if (table === 'star') {
      tempState.starDataObj = {};
      tempState.scoreDataObj = {};
      tempState.relationDataObj = {};
      tempState.honorDataObj = {};
      tempState.scoreDataObj = {};
      tempState.salaryDataObj = {};
      tempState.selectedRowKeys = []; // 选中行key
      tempState.selectedRowObj = {}; // 选中行对象
    }
    this.setState(tempState);

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
          let param = {};
          // 非主表
          if (table !== 'star') {
            param.basicId = selectedRowObj['_id'];
          }
          // 如果是主表请求 添加搜索信息
          if (table === 'star') {
            const searchObj = this.child.getSearchValue();
            param = searchObj;
          }
          param.table = table;

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
    let payload = {};
    if (basModStatus === 'edit') {
      payload.type = 'common/upd';
      payload.condition = { _id: selectedRowObj['_id'] };
      payload.content = data;
    }
    // 添加类型
    if (basModStatus === 'add') {
      payload = data;
      payload.type = 'common/add';
      payload.domain = ['basketball'];
      payload.category = ['player'];
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

    //  更改主表信息
    const { defaultActiveKey } = this.state;
    const param = { table: defaultActiveKey, basicId: selectedRowObjs[0]._id };
    this.getTableData(param);

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
        _this.onActionTable(payload);
      },
      onCancel() {
        console.log('取消删除');
      },
    });
  };

  //  删除弹框
  onClickDel = () => {
    const { selectedRowObj } = this.state;
    let payload = { type: 'common/del', _id: selectedRowObj['_id'], table: 'star' };
    this.showDelCon(payload);
  };


  // 展示弹框
  onShowModal = (basModStatus) => {
    this.setState({ basModVis: true, basModStatus });
  };


  // 关闭弹框
  onClickClose = () => {
    this.setState({ basModVis: false, basModStatus: 'add' });
  };

  // 修改分页
  onChangeBasicPage = (data) => {
    const { current, pageSize } = data;
    const searchObj = this.child.getSearchValue();
    const param = {
      pageIndex: current - 1,
      size: pageSize,
    };
    // 获取分页数据
    this.getTableData({ ...param, ...searchObj, table: 'star' });
  };


  render() {

    const { basModVis, selectedRowKeys, basModStatus, defaultActiveKey, selectedRowObj, starDataObj, scoreDataObj, relationDataObj, honorDataObj, salaryDataObj } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      type: 'radio',
    };

    const btnDisable = (starDataObj.list && starDataObj.list.length > 0) ? false : true;


    return (
      <LayoutAdmin {...this.props} selectKey={['volleyball']} openKeys={["player"]}>
        <div className={styles.adminSearchPannel}>
          <Search
            onSearch={this.onSearchPannel}
            // 设置ref属性
            onRef={(ref) => {
              this.child = ref;
            }}
          />
          <div className="table-operations">
            <Button onClick={this.onShowModal.bind(this, 'add')}>添加</Button>
            <Button onClick={this.onShowModal.bind(this, 'edit')} disabled={btnDisable}>编辑</Button>
            <Button onClick={this.onShowModal.bind(this, 'desc')} disabled={btnDisable}>详情</Button>
            <Button onClick={this.onClickDel} disabled={btnDisable}>删除</Button>
          </div>
          <Table
            size="small"
            rowKey={record => record._id}
            rowSelection={rowSelection}
            columns={this.columns}
            dataSource={starDataObj.list ? starDataObj.list : []}
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
            <TabPane tab="个人数据" key="score">
              <Score
                scoreDataObj={scoreDataObj}
                onActionTable={this.onActionTable}
                basicRow={selectedRowObj}
                showDelCon={this.showDelCon}
                getTableData={this.getTableData}
              />
            </TabPane>
            <TabPane tab="查看关系" key="relation">
              <Relation
                relationDataObj={relationDataObj}
                basicRow={selectedRowObj}
                showDelCon={this.showDelCon}
                onActionTable={this.onActionTable}
                getTableData={this.getTableData}
              />
            </TabPane>
            <TabPane tab="查看荣誉" key="honor">
              <Honor
                honorDataObj={honorDataObj}
                basicRow={selectedRowObj}
                showDelCon={this.showDelCon}
                onActionTable={this.onActionTable}
                getTableData={this.getTableData}
              />
            </TabPane>
            <TabPane tab="生涯薪金" key="salary">
              <Salary
                salaryDataObj={salaryDataObj}
                basicRow={selectedRowObj}
                showDelCon={this.showDelCon}
                onActionTable={this.onActionTable}
                getTableData={this.getTableData}
              />
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

export default AdminFootball;

