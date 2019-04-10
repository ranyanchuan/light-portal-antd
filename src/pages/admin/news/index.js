/* eslint-disable import/first */
/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Button, Input, Dropdown, Menu, Table, Divider, Tag } from 'antd';

import LayoutAdmin from 'components/Admin/LayoutAdmin';
import Search from 'components/Admin/News/Search';

import styles from './index.less';

class AdminNews extends React.Component {

  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    visible: false,
  };


  // 展示弹框
  onShowModal = (status) => {
    this.setState({ visible: true, status });
  };


  columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      key: 'cover',
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '类型',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '标签',
      key: 'tag',
      dataIndex: 'tag',
      render: tags => (
        <span>
        {tags && tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
        </span>
      ),
    },
  ];

  data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tag: ['nice', 'developer'],
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tag: ['loser'],
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tag: ['cool', 'teacher'],
  }, {
    key: '4',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tag: ['cool', 'teacher'],
  }, {
    key: '5',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tag: ['cool', 'teacher'],
  }, {
    key: '6',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tag: ['cool', 'teacher'],
  }, {
    key: '7',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tag: ['cool', 'teacher'],
  }, {
    key: '8',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  }, {
    key: '9',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tag: ['cool', 'teacher'],
  }];

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };


  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

  render() {

    const { loading, selectedRowKeys, visible } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const addBtnDisable = false;
    const btnDisable = false;

    return (
      <LayoutAdmin {...this.props} selectKey={['news']}>
        <div className={styles.adminNew}>
          <Search/>
          <div className="table-operations">
            <Button onClick={this.onShowModal.bind(this, 'add')} disabled={addBtnDisable}>添加</Button>
            <Button onClick={this.onShowModal.bind(this, 'edit')} disabled={btnDisable}>编辑</Button>
            <Button onClick={this.onShowModal.bind(this, 'desc')} disabled={btnDisable}>详情</Button>
            <Button onClick={this.onClickDel} disabled={btnDisable}>删除</Button>
          </div>
          {/*<NewsModal hideModal={this.hideModal} visible={visible}/>*/}
          <Table
            rowSelection={rowSelection}
            columns={this.columns}
            dataSource={this.data}
            className={styles.newsTable}
            size="small"
          />
        </div>
      </LayoutAdmin>
    );
  }
}

export default AdminNews;
