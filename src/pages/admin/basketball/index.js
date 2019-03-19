/* eslint-disable import/first */
/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Button, Input, Layout, Menu, Table, Divider, Tag } from 'antd';

import Search from './search';
import BasicModal from './basicModal';
import RelationModal from './relationModal';
import ScoreModal from './scoreModal';
import HonorModal from './honorModal';
import SalaryModal from './salaryModal';

import styles from './index.less';

class AdminBasketball extends React.Component {

  state = {
    selectedRowKeys: ['1'], // Check here to configure the default column
    loading: false,
    modalVisible: {
      basModVis: false,
      relModVis: false,
      scoModVis: false,
      honModVis: false,
      salModVis: false,
    },
  };


  columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="javascript:;">{text}</a>,
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    sorter: (a, b) => a.age - b.age,
  }, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  }, {
    title: '标签',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
      {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
    </span>
    ),
  }, {
    title: '操作',
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


  showModal = (param) => {
    const {modalVisible}=this.state;
    for(let item in modalVisible){
      modalVisible[item]=false;
    }
    modalVisible[param]=true;
    this.setState({ modalVisible });
  };

  hideModal = () => {
    const {modalVisible}=this.state;
    for(let item in modalVisible){
      modalVisible[item]=false;
    }
    this.setState({ modalVisible });
  };

  render() {

    const { loading, selectedRowKeys, modalVisible } = this.state;
    const { relModVis, basModVis,scoModVis,honModVis,salModVis } = modalVisible;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      type: 'radio',
    };
    return (
      <div className={styles.adminBasketball}>
        <Search/>
        <div className="table-operations">
          <Button onClick={this.showModal.bind(this, 'basModVis')}>添加信息</Button>
          <Button onClick={this.clearFilters}>编辑信息</Button>
          <Button onClick={this.showModal.bind(this, 'scoModVis')}>比分数据</Button>
          <Button onClick={this.showModal.bind(this, 'relModVis')}>查看关系</Button>
          <Button onClick={this.showModal.bind(this, 'honModVis')}>查看荣誉</Button>
          <Button onClick={this.showModal.bind(this,'salModVis')}>生涯薪金</Button>
        </div>
        <BasicModal hideModal={this.hideModal} visible={basModVis}/>
        <RelationModal hideModal={this.hideModal} visible={relModVis}/>
        <ScoreModal hideModal={this.hideModal} visible={scoModVis}/>
        <HonorModal hideModal={this.hideModal} visible={honModVis}/>
        <SalaryModal hideModal={this.hideModal} visible={salModVis}/>
        <Table rowSelection={rowSelection} columns={this.columns} dataSource={this.data} className={styles.newsTable}/>
      </div>
    );
  }
}

export default AdminBasketball;
