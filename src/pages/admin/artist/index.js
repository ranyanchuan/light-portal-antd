/* eslint-disable import/first */
/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Button, Modal, Tabs, Table, Avatar, Tag } from 'antd';

import LayoutAdmin from 'components/Admin/LayoutAdmin';
import Search from 'components/Admin/Artist/Search';
import Actor from 'components/Admin/Artist/Actor';
import Singer from 'components/Admin/Artist/Singer';
import Model from 'components/Admin/Artist/Model';
import Host from 'components/Admin/Artist/Host';
import BasicModal from 'components/Admin/Artist/BasicModal';

import Relation from 'components/Admin/Common/Relation';
import Honor from 'components/Admin/Common/Honor';
import Salary from 'components/Admin/Common/Salary';
import Score from 'components/Admin/Basketball/Score';


import { domain2key } from 'utils';


import styles from './index.less';


const { TabPane } = Tabs;
const confirm = Modal.confirm;
const ruleDate = 'YYYY-MM-DD';

@connect((state) => ({
  common: state.common,
}))

class AdminArtist extends React.Component {

  state = {
    searchObj: {}, //搜索面板数据
    defaultActiveKey: 'honor', // 默认选中tab
    selectedRowKeys: [], // 选中行key
    selectedRowObj: {}, // 选中行对象

    loading: false,
    basModVis: false,
    basModStatus: 'add',

    actorDataObj: {}, // 影视数据
    modelDataObj: {}, // 模特数据
    singerDataObj: {}, // 音乐数据
    hostDataObj: {}, // 音乐数据
    scoreDataObj: {}, // 比分数据
    relationDataObj: {}, // 关系数据
    starDataObj: {}, // 基本数据
    honorDataObj: {}, // 荣誉数据
    salaryDataObj: {}, // 资薪数据
  };


  componentDidMount() {
    this.getTableData({ table: 'star', category: ['artist'] });
  }

  // 搜索面板值
  onSearchPannel = (param) => {
    this.getTableData({ ...param, table: 'star', category: ['artist'] });
  };


  // 获取表格数据
  getTableData = (payload) => {
    const { table } = payload;
    // 清空主表信息
    const tempState = {};
    const { defaultActiveKey } = this.state;
    tempState[defaultActiveKey + 'TableLoading'] = true;
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
      tempState[table + 'TableLoading'] = true;
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
          const param = { table:defaultActiveKey, basicId: _id };

          this.getTableData(param);

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
            param.category = ['artist'];
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
      payload.category = ['artist'];
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
      title: '星座',
      dataIndex: 'constellation',
      key: 'constellation',
    },
    {
      title: '领域',
      dataIndex: 'domain',
      key: 'domain',
      render: tags => (
        <span>
        {tags && tags.length > 0 && tags.slice(0, 3).map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
        </span>
      ),
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


    //  更改主表信息
    let childrenTable = '';

    let { defaultActiveKey } = this.state;
    const {domain}=selectedRowObjs[0];
    const commonTable = ['relation',"honor","salary"];
    // 判断是否公有
    if (commonTable.includes(defaultActiveKey)) {
      childrenTable = defaultActiveKey;
    } else {
      // 判断职业
      const tableNameArray = domain2key(domain);
      if (tableNameArray.includes(defaultActiveKey)) {
        childrenTable = defaultActiveKey;
      } else {
        // 默认第一个
        childrenTable = tableNameArray[0];
      }
    }

    this.setState({defaultActiveKey: childrenTable, selectedRowKeys, selectedRowObj: selectedRowObjs[0] });

    const param = { table: childrenTable, basicId: selectedRowObjs[0]._id };
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
    this.getTableData({ ...param, ...searchObj, table: 'star', category: ['artist'] });
  };


  render() {

    const { starTableLoading, basModVis, selectedRowKeys,
      basModStatus, defaultActiveKey, selectedRowObj,
      starDataObj,actorDataObj, modelDataObj,singerDataObj,scoreDataObj,
      relationDataObj, honorDataObj, salaryDataObj,hostDataObj
    } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      type: 'radio',
    };

    const btnDisable = (starDataObj.list && starDataObj.list.length > 0) ? false : true;

    const { domain } = selectedRowObj;

    return (
      <LayoutAdmin {...this.props} selectKey={['artist']} openKeys={['player']}>
        <div className={styles.adminArtist}>
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
            {domain && domain.includes('演员') &&
            <TabPane tab="影视作品" key="actor">
              <Actor
                actorDataObj={actorDataObj}
                onActionTable={this.onActionTable}
                basicRow={selectedRowObj}
                getTableData={this.getTableData}
                showDelCon={this.showDelCon}
                loading={this.state.actorTableLoading}
              />
            </TabPane>
            }

            {domain && domain.includes('歌手') &&
            <TabPane tab="音乐作品" key="singer">
              <Singer
                singerDataObj={singerDataObj}
                onActionTable={this.onActionTable}
                basicRow={selectedRowObj}
                getTableData={this.getTableData}
                showDelCon={this.showDelCon}
                loading={this.state.singerTableLoading}
              />
            </TabPane>
            }

            {domain && domain.includes('模特') &&
            <TabPane tab="模特作品" key="model">
              <Model
                modelDataObj={modelDataObj}
                onActionTable={this.onActionTable}
                basicRow={selectedRowObj}
                showDelCon={this.showDelCon}
                getTableData={this.getTableData}
                loading={this.state.modelTableLoading}

              />
            </TabPane>
            }

            {domain && domain.includes('主持人') &&
            <TabPane tab="主持节目" key="host">
              <Host
                hostDataObj={hostDataObj}
                onActionTable={this.onActionTable}
                basicRow={selectedRowObj}
                showDelCon={this.showDelCon}
                getTableData={this.getTableData}
              />
            </TabPane>
            }


            {domain && domain.includes('导演') &&
            <TabPane tab="导演作品" key="director">
              <Score
                scoreDataObj={scoreDataObj}
                onActionTable={this.onActionTable}
                basicRow={selectedRowObj}
                showDelCon={this.showDelCon}
                getTableData={this.getTableData}
              />
            </TabPane>
            }

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

export default AdminArtist;

