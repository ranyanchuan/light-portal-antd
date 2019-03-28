/* eslint-disable import/first */
/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Button, Input, Tabs, Menu, Table, Divider, Tag, Avatar } from 'antd';

import LayoutAdmin from 'components/Admin/LayoutAdmin';
import Search from 'components/Admin/Basketball/Search';
import Score from 'components/Admin/Basketball/Score';
import Relation from 'components/Admin/Basketball/Relation';
import Honor from 'components/Admin/Basketball/Honor';
import Salary from 'components/Admin/Basketball/Salary';

import styles from './index.less';

const {TabPane} = Tabs;

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


  // 保存基本信息
  onClickSaveBasic = (data) => {
    console.log('onClickSaveBasic', data);

  };

  // 改变tab
  onChangeTab=(param)=>{
    console.log('param', param);
  }

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
      render: (text,item) =>{
        const {name_cn}=item;
        const title=text?(name_cn?(text+"("+name_cn+")"):text):name_cn;
        return <a href="javascript:;">{title}</a>
      },
    },

    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
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
      render: text => <span>{text && Array.isArray(text)? text.join(" | "):""}</span>,
    },
    {
      title: '球队',
      dataIndex: 'team',
      key: 'team',
      render: text => <span>{text && Array.isArray(text)? text.join(" | "):""}</span>,
    },



    {
      title: '学校',
      dataIndex: 'school',
      key: 'school',
      render: text => <span>{text && Array.isArray(text)? text.join(" | "):""}</span>,
    },

    ];

  data = [
    {
      key: '1',
      id:'xxxx',
      avatar:'http://www.stat-nba.com/image/playerImage/526.jpg',
      name: 'John Brown',
      name_cn: '詹姆斯',
      nationality: '美国',
      city:'洛杉矶',
      organization: ['NBA','CBA'],
      team: ['骑士队','湖人队'],
      gender:'男',
      school: ['清华大学', '北京大学'],
      age: 32,

    },
    {
      key: '2',
      id:'xxxx',
      avatar:'http://www.stat-nba.com/image/playerImage/526.jpg',
      name: 'John Brown',
      name_cn: '詹姆斯',
      nationality: '美国',
      city:'洛杉矶',
      organization: ['NBA','CBA'],
      team: ['骑士队','湖人队'],
      gender:'男',
      school: ['清华大学', '北京大学'],
      age: 32,

    },
    {
      key: '3',
      id:'xxxx',
      avatar:'http://www.stat-nba.com/image/playerImage/526.jpg',
      name: 'John Brown',
      name_cn: '詹姆斯',
      nationality: '美国',
      city:'洛杉矶',
      organization: ['NBA','CBA'],
      team: ['骑士队','湖人队'],
      gender:'男',
      school: ['清华大学', '北京大学'],
      age: 32,

    },
    {
      key: '4',
      id:'xxxx',
      avatar:'http://www.stat-nba.com/image/playerImage/526.jpg',
      name: 'John Brown',
      name_cn: '詹姆斯',
      nationality: '美国',
      city:'洛杉矶',
      organization: ['NBA','CBA'],
      team: ['骑士队','湖人队'],
      gender:'男',
      school: ['清华大学', '北京大学'],
      age: 32,

    },
    {
      key: '5',
      id:'xxxx',
      avatar:'http://www.stat-nba.com/image/playerImage/526.jpg',
      name: 'John Brown',
      name_cn: '詹姆斯',
      nationality: '美国',
      city:'洛杉矶',
      organization: ['NBA','CBA'],
      team: ['骑士队','湖人队'],
      gender:'男',
      school: ['清华大学', '北京大学'],
      age: 32,

    },
    {
      key: '6',
      id:'xxxx',
      avatar:'http://www.stat-nba.com/image/playerImage/526.jpg',
      name: 'John Brown',
      name_cn: '詹姆斯',
      nationality: '美国',
      city:'洛杉矶',
      organization: ['NBA','CBA'],
      team: ['骑士队','湖人队'],
      gender:'男',
      school: ['清华大学', '北京大学'],
      age: 32,
    },


  ];

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };


  showModal = (param) => {
    const { modalVisible } = this.state;
    for (let item in modalVisible) {
      modalVisible[item] = false;
    }
    modalVisible[param] = true;
    this.setState({ modalVisible });
  };

  hideModal = () => {
    const { modalVisible } = this.state;
    for (let item in modalVisible) {
      modalVisible[item] = false;
    }
    this.setState({ modalVisible });
  };

  render() {

    const { loading, selectedRowKeys, modalVisible } = this.state;
    const { relModVis, basModVis, scoModVis, honModVis, salModVis } = modalVisible;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      type: 'radio',
    };
    return (
      <LayoutAdmin {...this.props} selectKey={['basketball']}>
        <div className={styles.adminBasketball}>
          <Search/>
          <div className="table-operations">
            <Button onClick={this.showModal.bind(this, 'basModVis')} save={this.onClickSaveBasic}>添加</Button>
            <Button onClick={this.clearFilters}>编辑</Button>
            <Button onClick={this.clearFilters}>详情</Button>
            <Button onClick={this.clearFilters}>删除</Button>
          </div>
          <Table
            size="small"
            rowSelection={rowSelection}
            columns={this.columns}
            dataSource={this.data}
            className={styles.newsTable}/>
          {/*子表数据*/}
          <Tabs defaultActiveKey="1" onChange={this.onChangeTab}>
            <TabPane tab="比分数据" key="1">
              <Score />
            </TabPane>
            <TabPane tab="查看关系" key="2">
              <Relation />
            </TabPane>
            <TabPane tab="查看荣誉" key="3">
              <Honor />
            </TabPane>
            <TabPane tab="生涯薪金" key="4">
              <Salary />
            </TabPane>
          </Tabs>

        </div>
      </LayoutAdmin>
    );
  }
}

export default AdminBasketball;

