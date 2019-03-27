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


  columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="javascript:;">{text}</a>,
  }, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    sorter: (a, b) => a.age - b.age,
  }, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  }, {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
      {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
    </span>
    ),
  }, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
      <a href="javascript:;">详情</a>
      <Divider type="vertical"/>
      <a href="javascript:;">删除</a>
    </span>
    ),
  }];

  data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  }, {
    key: '4',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  }, {
    key: '5',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  }, {
    key: '6',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  }, {
    key: '7',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
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
    tags: ['cool', 'teacher'],
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

    const menu = (
      <Menu>
        <Menu.Item>
          <div>当前</div>
        </Menu.Item>
        <Menu.Item>
          <div>100</div>
        </Menu.Item>
        <Menu.Item>
          <div>200</div>
        </Menu.Item>
        <Menu.Item>
          <div>500</div>
        </Menu.Item>
      </Menu>
    );

    return (
      <LayoutAdmin {...this.props} selectKey={['news']}>
      <div className={styles.adminNews}>
        <Search/>
        <div className="table-operations">
          <Button onClick={this.showModal}>添加新闻</Button>
          <Button onClick={this.clearFilters}>批量删除</Button>
          <Dropdown overlay={menu} placement="bottomCenter">
            <Button>导出excel</Button>
          </Dropdown>
        </div>
        {/*<NewsModal hideModal={this.hideModal} visible={visible}/>*/}
        <Table rowSelection={rowSelection} columns={this.columns} dataSource={this.data} className={styles.newsTable}/>
      </div>
      </LayoutAdmin>
    );
  }
}

export default AdminNews;
