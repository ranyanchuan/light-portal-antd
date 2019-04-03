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

const { TabPane } = Tabs;
const confirm = Modal.confirm;


@connect((state) => ({
  adminBasketball: state.adminBasketball,
  common: state.common,
}))

class AdminBasketball extends React.Component {

  state = {
    selectedRowKeys: [], // 选中行key
    selectedRowObj: {}, // 选中行对象

    loading: false,
    basModVis: false,
    basModStatus: 'add',
  };


  componentDidMount() {
    this.getStarData({});
  }

  /**
   * 获取最热球星
   */
  getStarData = (param={}) => {
    const { pageIndex = 0, size = 10 } = param;
    const jsonStr = `(pageIndex:${pageIndex},size:${size})`;
    const gql = `
        query {
               list${jsonStr}{
                 id:_id,
                 avatar,
                 name,
                 name_cn,
                 gender,
                 birthday,
                 nationality,
                 city,
                 school,
                 organization,
                 team,
               }
               count${jsonStr}
             }
        `;


    this.props.dispatch({
      type: 'adminBasketball/queryBasic',
      payload: { gql, pageIndex, size },
      callback: (response) => {
        const { list } = response;
        if(list && list.length>0){
          const {id}=list[0];
          this.setState({ selectedRowKeys: [id],selectedRowObj:list[0] });
        }
      },
    });
  };


  // 保存基本信息
  onClickSaveBasic = (data) => {

    const {basModStatus,selectedRowObj}=this.state;

    let payload = data;
    let type="";

    if(basModStatus==='edit'){
      payload={};
      type="common/upd";
      payload.condition={ _id: selectedRowObj['id'] };
      payload.content= data;
    }
    // 添加类型
    if(basModStatus==='add'){
      type="common/add";
      payload.occupation=['basketball'];
      payload.category=['player'];
    }

    // 删除类型
    if(basModStatus==='del'){
      type="common/del";
      payload['_id']= selectedRowObj['id'];
    }

    // 添加操作表名
    payload.table='star';

    // 添加或者更新明星基本数据
    this.props.dispatch({
      type,
      payload,
      callback: (res) => {
        this.setState({ loading: false });
        const {status}=res;
        if(status==='success'){
          this.getStarData();
        }else{
          console.log('更新失败');
        }
      },
    });
  };


  // 改变tab
  onChangeTab = (param) => {
    console.log('param', param);
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
  onSelectChange = (selectedRowKeys,selectedRowObjs) => {
    this.setState({ selectedRowKeys,selectedRowObj:selectedRowObjs[0] });
  };


  // 删除基本确定弹框

  showDeleteConfirm=()=> {
    this.setState({basModStatus: 'del' });
    const _this=this;
    confirm({
      title: '您确定要删除吗',
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        _this.onClickSaveBasic({});
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }


  // 添加弹框
  onClickAdd = () => {
    this.setState({ basModVis: true, basModStatus: 'add' });
  };

  // 编辑弹框
  onClickEdit = () => {
    this.setState({ basModVis: true, basModStatus: 'edit' });
  };
  // 详情弹框
  onClickDesc = () => {
    this.setState({ basModVis: true, basModStatus: 'desc' });
  };

  // 关闭弹框
  onClickClose = () => {
    this.setState({ basModVis: false, basModStatus: 'add' });
  };

  // 修改分页
  onChangeBasicPage = (data) => {
    const {current,pageSize}=data;
    const param={pageIndex:current-1, size :pageSize};
    this.getStarData(param);
  };


  hideModal = () => {
    const { modalVisible } = this.state;
    for (let item in modalVisible) {
      modalVisible[item] = false;
    }
    this.setState({ modalVisible });
  };

  onChange = () => {
    console.log('00000');
  };

  render() {

    const { basicObj = {} } = this.props.adminBasketball;
    const { pageIndex, count, size } = basicObj;

    const { basModVis, selectedRowKeys, basModStatus,selectedRowObj} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      type: 'radio',
    };

    const relationData = [
      {
        key: '1',
        name: 'Stephen Curry',
        name_cn: '斯蒂芬-库里',
        avatar: 'http://www.stat-nba.com/image/playerImage/526.jpg',
        relation: ['朋友', '队友'],
      }, {
        key: '2',
        name: 'Kevin Durant',
        name_cn: '凯文-杜兰特',
        avatar: 'http://www.stat-nba.com/image/playerImage/779.jpg',
        relation: ['朋友', '队友'],
      }, {
        key: '3',
        name: 'James Harden',
        name_cn: '詹姆斯-哈登',
        avatar: 'http://www.stat-nba.com/image/playerImage/1628.jpg',
        relation: ['朋友', '队友'],
      }, {
        key: '4',
        name: 'Russell Westbrook',
        name_cn: '拉塞尔-威斯布鲁克',
        avatar: 'http://www.stat-nba.com/image/playerImage/3920.jpg',
        relation: ['朋友', '队友'],
      }, {
        key: '5',
        name: 'Michael Jordan ',
        name_cn: '迈克尔-乔丹',
        avatar: 'http://www.stat-nba.com/image/playerImage/1717.jpg',
        relation: ['朋友', '队友'],
      }, {
        key: '6',
        name: 'Shaquille O\'Neal ',
        name_cn: '沙奎尔-奥尼尔',
        avatar: 'http://www.stat-nba.com/image/playerImage/2716.jpg',
        relation: ['朋友', '队友'],
      }];


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


    return (
      <LayoutAdmin {...this.props} selectKey={['basketball']}>
        <div className={styles.adminBasketball}>
          <Search/>
          <div className="table-operations">
            <Button onClick={this.onClickAdd}>添加</Button>
            <Button onClick={this.onClickEdit}>编辑</Button>
            <Button onClick={this.onClickDesc}>详情</Button>
            <Button onClick={this.showDeleteConfirm}>删除</Button>
          </div>
          {basicObj &&
          <Table
            size="small"
            rowKey={record => record.id}
            rowSelection={rowSelection}
            columns={this.columns}
            dataSource={(basicObj && basicObj.list) ? basicObj.list : []}
            pagination={{
              current: pageIndex+1,
              total: count,
              pageSize: size,
            }}
            onChange={this.onChangeBasicPage}
            className={styles.newsTable}
          />
          }


          {/*子表数据*/}
          <Tabs defaultActiveKey="1" onChange={this.onChangeTab}>
            <TabPane tab="比分数据" key="1">
              <Score/>
            </TabPane>
            <TabPane tab="查看关系" key="2">
              <Relation relationDataArray={relationData}/>
            </TabPane>
            <TabPane tab="查看荣誉" key="3">
              <Honor honorDataArray={honorData}/>
            </TabPane>
            <TabPane tab="生涯薪金" key="4">
              <Salary salaryDataArray={salaryData}/>
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

