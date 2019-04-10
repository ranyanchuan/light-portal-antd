/* eslint-disable import/first */
/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { connect } from 'dva';
import { Button, Modal, Table, Tag } from 'antd';

import LayoutAdmin from 'components/Admin/LayoutAdmin';
import Search from 'components/Admin/News/Search';
import NewsModal from 'components/Admin/News/NewsModal';

import styles from './index.less';
import moment from 'moment';

const ruleDate = 'YYYY-MM-DD';
const confirm = Modal.confirm;


@connect((state) => ({
  common: state.common,
}))

class AdminNews extends React.Component {

  state = {
    selectedRowKeys: [], // Check here to configure the default column
    selectedRowObj: {}, // 选中行对象

    loading: false,
    visible: false,
    status: 'add',

    newsDataObj: {}, //  新闻数据
  };

  componentDidMount() {
    this.getTableData({ table: 'news' });
  }


  // 搜索面板值
  onSearchPannel = (param) => {
    this.getTableData({ table: 'news', ...param });
  };


  // 展示弹框
  onShowModal = (status) => {
    this.setState({ visible: true, status });
  };


  // 修改分页
  onChangePage = (data) => {
    const { current, pageSize } = data;
    const param = {
      pageIndex: current - 1,
      size: pageSize,
    };

    const searchObj = this.child.getSearchValue();
    // 获取分页数据
    this.getTableData({ ...param, ...searchObj });
  };


  // 获取表格数据
  getTableData = (payload) => {

    // 清空表信息
    this.setState({ newsDataObj: {} });


    this.props.dispatch({
      type: 'common/query',
      payload,
      callback: (response) => {
        const { list = [] } = response;
        const stateTemp = { newsDataObj: response };
        // 更新 table 数据
        if (list.length > 0) {
          const { _id } = list[0];
          stateTemp.selectedRowKeys = [_id];
          stateTemp.selectedRowObj = list[0];
        }
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
          const searchObj = this.child.getSearchValue();
          const param = { table, ...searchObj };
          // 获取表格数据
          this.getTableData(param);
        } else {
          console.log(type, '失败');
        }
      },
    });
  };


  // 将json 数据拼接为 payload 对象
  json2payload = (data) => {
    const { status, selectedRowObj } = this.state;
    let payload = data;
    if (status === 'edit') {
      payload = {};
      payload.type = 'common/upd';
      payload.condition = { _id: selectedRowObj['id'] };
      payload.content = data;
    }
    // 添加类型
    if (status === 'add') {
      payload.type = 'common/add';
    }

    // 添加操作表名
    payload.table = 'news';
    // 获取表格数据
    this.onActionTable(payload);
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
    let payload = { type: 'common/del', _id: selectedRowObj['_id'], table: 'news' };
    this.showDelCon(payload);
  };


  columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      key: 'cover',
      render: (cover) => {
        return <img src={cover} alt="封面" style={{ height: 40 }}/>;
      },

    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
      render: text => <a href="javascript:;">{text && text.length > 0 ? text[0] : ''}</a>,
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      render: (text) => {
        return text ? moment(text).format(ruleDate) : '';
      },
    },
    {
      title: '标签',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
        {tags && tags.length > 0 && tags.slice(0, 3).map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
        </span>
      ),
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: text => <a href="javascript:;">{text}</a>,
    },
  ];

  // 单选框操作
  onSelectChange = (selectedRowKeys, selectedRowObjs) => {
    this.setState({ selectedRowKeys, selectedRowObj: selectedRowObjs[0] });
  };

  // 关闭弹框
  onClickClose = () => {
    this.setState({ visible: false, status: 'add' });
  };


  render() {

    const { status, selectedRowKeys, selectedRowObj, visible, newsDataObj } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      type: 'radio',
    };


    const btnDisable = (newsDataObj.list && newsDataObj.list.length > 0) ? false : true;

    return (
      <LayoutAdmin {...this.props} selectKey={['news']}>
        <div className={styles.adminNew}>
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
          {/*新闻弹框*/}
          <NewsModal
            visible={visible}
            onSave={this.json2payload}
            status={status}
            onClose={this.onClickClose}
            basicData={status !== 'add' ? selectedRowObj : {}}
          />
          <Table
            rowKey={record => record._id}
            rowSelection={rowSelection}
            columns={this.columns}
            size="small"
            dataSource={newsDataObj.list ? newsDataObj.list : []}
            pagination={{
              current: newsDataObj.pageIndex + 1,
              total: newsDataObj.count,
              pageSize: newsDataObj.size,
            }}
            onChange={this.onChangePage}
          />
        </div>
      </LayoutAdmin>
    );
  }
}

export default AdminNews;
