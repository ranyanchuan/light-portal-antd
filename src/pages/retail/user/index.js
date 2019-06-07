/* eslint-disable import/first */
/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Button, Modal, Table } from 'antd';

import Search from 'components/Retail/userSearch';

import BasicModal from 'components/Retail/userBasicModel';

import styles from './index.less';


const confirm = Modal.confirm;
const ruleDate = 'YYYY-MM-DD';

@connect((state) => ({
  common: state.common,
}))

class User extends React.Component {

  state = {
    searchObj: {}, //搜索面板数据
    selectedRowKeys: [], // 选中行key
    selectedRowObj: {}, // 选中行对象

    loading: false,
    basModVis: false,
    basModStatus: 'add',

    retailUserDataObj: {}, // 影视数据

  };


  componentDidMount() {
    this.getTableData({ table: 'retailUser' });
  }

  // 搜索面板值
  onSearchPannel = (param) => {
    this.getTableData({ ...param, table: 'retailUser' });
  };


  // 获取表格数据
  getTableData = (payload) => {
    const { table } = payload;
    // 清空主表信息
    const tempState = {};
    tempState.inboundTableLoading = true;
    tempState.retailUserDataObj = {};

    this.setState(tempState);

    this.props.dispatch({
      type: 'common/query',
      payload,
      callback: (response) => {

        const { list = [] } = response;
        const stateTemp = {};
        // 更新 table 数据
        if (list.length > 0) {
          const { _id } = list[0];
          stateTemp.selectedRowKeys = [_id];
          stateTemp.selectedRowObj = list[0];
        }
        stateTemp[table + 'DataObj'] = response;
        stateTemp[table + 'TableLoading'] = false;
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
        const { status } = res;
        if (status === 'success') {
          // 获取table 数据
          let param = this.child.getSearchValue();
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
    }
    // 添加操作表名
    payload.table = 'retailUser';
    // 获取表格数据
    this.onActionTable(payload);
  };


  columns = [

    {
      title: '名字',
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '身份证号',
      dataIndex: 'card',
      key: 'card',
    },
    {
      title: '居住镇',
      dataIndex: 'town',
      key: 'town',
    },
    {
      title: '居住村',
      dataIndex: 'village',
      key: 'village',
    },
    {
      title: '居住组',
      dataIndex: 'group',
      key: 'group',
    },
  ];


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
    const { selectedRowKeys } = this.state;
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      let payload = { type: 'common/del', _id: selectedRowKeys[0], table: 'retailUser' };
      this.showDelCon(payload);
    }

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
    this.getTableData({ ...param, ...searchObj, table: 'retailUser'});
  };

  onSelectChange = (value) => {
    this.setState({ selectedRowKeys: value });
  };



  render() {

    const {
      starTableLoading, basModVis, selectedRowKeys,
      basModStatus, selectedRowObj, retailUserDataObj,
    } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      type: 'radio',
    };

    const btnDisable = (retailUserDataObj.list && retailUserDataObj.list.length > 0) ? false : true;


    return (
      <div className={styles.user}>
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
          loading={starTableLoading}
          size="small"
          rowKey={record => record._id}
          rowSelection={rowSelection}
          columns={this.columns}
          dataSource={retailUserDataObj.list ? retailUserDataObj.list : []}
          pagination={{
            current: retailUserDataObj.pageIndex + 1,
            total: retailUserDataObj.count,
            pageSize: retailUserDataObj.size,
          }}
          onChange={this.onChangeBasicPage}
          className={styles.newsTable}
        />

        <BasicModal
          visible={basModVis}
          status={basModStatus}
          onClose={this.onClickClose}
          onSave={this.onClickSaveBasic}
          basicData={basModStatus !== 'add' ? selectedRowObj : {}}
        />
      </div>

    );
  }
}

export default User;

