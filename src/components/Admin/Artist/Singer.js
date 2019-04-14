import React from 'react';
import moment from 'moment';

import { Form, Button, Modal, Row, Col, Table, Tag } from 'antd';
import ConSelect from 'components/ConSelect';
import ConInput from 'components/ConInput';
import ConInputNumber from 'components/ConInputNumber';
import ConTime from 'components/ConTime';
import ConDate from 'components/ConDate';

import { api, actorClassifyData } from 'utils/config';

import styles from './index.less';

const ruleDate = 'YYYY-MM-DD';
const ruleTime = 'HH:mm';

@Form.create()

class Singer extends React.Component {
  state = {
    visible: false,
    status: '',
    selectedRowKeys: [], // 选中行key
    selectedRowObj: {}, // 选中行对象

  };


  componentWillReceiveProps(nextProps) {
    const { singerDataObj } = nextProps;
    const { list = [] } = singerDataObj || {};
    if (list.length > 0 && this.props.singerDataObj !== singerDataObj) {
      const { _id } = list[0];
      this.setState({ selectedRowKeys: [_id], selectedRowObj: list[0] });
    }
  }


  onSelectChange = (selectedRowKeys, selectedRowObjs) => {
    this.setState({ selectedRowKeys, selectedRowObj: selectedRowObjs[0] });
  };

  // 展示弹框
  onShowModal = (status) => {
    this.setState({ visible: true, status });
  };

  onClickDel = () => {
    const { showDelCon } = this.props;
    const { selectedRowObj } = this.state;
    let payload = { type: 'common/del', _id: selectedRowObj['_id'], table: 'actor' };
    showDelCon(payload);
  };


  // 关闭弹框
  onClickClose = () => {
    this.setState({ visible: false, status: '' });
    this.props.form.resetFields();
  };


  //  提交form信息弹框
  handleSubmit = (e) => {
    // this.props.hideModal();
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      const { status, selectedRowObj } = this.state;

      if (!err) {

        const { basicRow, onActionTable } = this.props;
        let payload = {};
        // 主表_id
        const { _id } = basicRow;
        // 添加类型
        if (status === 'add') {
          payload = fieldsValue;
          payload.type = 'common/add';
          payload.basicId = _id;
        }
        // 编辑得分
        if (status === 'edit') {
          payload.type = 'common/upd';
          payload.condition = { _id: selectedRowObj['_id'] };
          payload.content = fieldsValue;

        }
        // 添加操作表名
        payload.table = 'singer';
        onActionTable(payload);
        this.onClickClose();
      }
    });
  };

  // 修改分页
  onChangePage = (data) => {
    const { getTableData, basicRow } = this.props;
    const { current, pageSize } = data;
    const { _id: basicId } = basicRow;
    const param = { pageIndex: current - 1, size: pageSize, table: 'actor', basicId };
    getTableData(param);
  };


  columns = [
    {
      title: '标题',
      key: 'title',
      dataIndex: 'title',
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
      title: '时长',
      key: 'time',
      dataIndex: 'time',
      render: (text) => {
        return text ? moment(text).format(ruleTime) : '';
      },
    },
    {
      title: '歌手',
      dataIndex: 'singer',
      key: 'singer',
      render: listItem => (
        <span>
        {listItem && listItem.length > 0 && listItem.slice(0, 3).map(tag => <Tag key={tag}>{tag}</Tag>)}
        </span>
      ),
    },
    {
      title: '作词',
      dataIndex: 'author',
      key: 'author',
      render: listItem => (
        <span>
        {listItem && listItem.length > 0 && listItem.slice(0, 3).map(tag => <Tag key={tag}>{tag}</Tag>)}
        </span>
      ),
    },
    {
      title: '作曲',
      dataIndex: 'composer',
      key: 'composer',
      render: listItem => (
        <span>
        {listItem && listItem.length > 0 && listItem.slice(0, 3).map(tag => <Tag key={tag}>{tag}</Tag>)}
        </span>
      ),
    },

    {
      title: '编曲',
      dataIndex: 'arranger',
      key: 'arranger',
      render: listItem => (
        <span>
        {listItem && listItem.length > 0 && listItem.slice(0, 3).map(tag => <Tag key={tag}>{tag}</Tag>)}
        </span>
      ),
    },

    {
      title: '制片人',
      dataIndex: 'producer',
      key: 'producer',
      render: listItem => (
        <span>
        {listItem && listItem.length > 0 && listItem.slice(0, 3).map(tag => <Tag key={tag}>{tag}</Tag>)}
        </span>
      ),
    },

    {
      title: '类型',
      dataIndex: 'classify',
      key: 'classify',
      render: listItem => (
        <span>
        {listItem && listItem.length > 0 && listItem.slice(0, 3).map(tag => <Tag key={tag}>{tag}</Tag>)}
        </span>
      ),
    },

    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      render: listItem => (
        <span>
        {listItem && listItem.length > 0 && listItem.slice(0, 3).map(tag => <Tag key={tag}>{tag}</Tag>)}
        </span>
      ),
    },

  ];


  // 标题对象
  titleObj = {
    add: '添加音乐数据',
    edit: '编辑音乐数据',
    desc: '查看音乐数据',
  };


  render() {
    const { form, singerDataObj, basicRow, loading } = this.props;
    const { visible, selectedRowKeys, selectedRowObj, status } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      type: 'radio',
    };

    const formItemLayout = {
      labelCol: { sm: { span: 6 } },
      wrapperCol: { sm: { span: 16 } },
    };


    const disabled = status === 'desc' ? true : false;
    const singerData = status !== 'add' ? selectedRowObj : {};

    const btnDisable = (singerDataObj.list && singerDataObj.list.length > 0) ? false : true;

    // 添加按钮disabled
    const addBtnDisable = basicRow._id ? false : true;

    return (
      <div>

        <div className="table-operations">
          <Button onClick={this.onShowModal.bind(this, 'add')} disabled={addBtnDisable}>添加</Button>
          <Button onClick={this.onShowModal.bind(this, 'edit')} disabled={btnDisable}>编辑</Button>
          <Button onClick={this.onShowModal.bind(this, 'desc')} disabled={btnDisable}>详情</Button>
          <Button onClick={this.onClickDel} disabled={btnDisable}>删除</Button>
        </div>

        <Modal
          title={this.titleObj[status]}
          visible={visible}
          onOk={this.handleSubmit}
          onCancel={this.onClickClose}
          width="960px"
          okText="确认"
          cancelText="取消"
        >
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col span={12}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="title"
                  label="歌曲"
                  placeholder="请输入歌曲标题"
                  message='请输入歌曲标题'
                  disabled={disabled}
                  required={true}
                  defValue={singerData.title}
                />
              </Col>
              <Col span={12}>
                <ConSelect
                  form={form}
                  formItemLayout={formItemLayout}
                  id="singer"
                  label="歌手"
                  mode="tags"
                  placeholder="请输入歌手"
                  disabled={disabled}
                  data={[]}
                  required={true}
                  defValue={singerData.singer}
                />
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <ConSelect
                  form={form}
                  formItemLayout={formItemLayout}
                  id="author"
                  label="作词"
                  mode="tags"
                  placeholder="请输入作词人"
                  disabled={disabled}
                  data={[]}
                  defValue={singerData.singer}
                />
              </Col>

              <Col span={12}>
                <ConSelect
                  form={form}
                  formItemLayout={formItemLayout}
                  id="composer"
                  label="作曲"
                  mode="tags"
                  placeholder="请输入作曲人"
                  disabled={disabled}
                  data={[]}
                  defValue={singerData.singer}
                />
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <ConSelect
                  form={form}
                  formItemLayout={formItemLayout}
                  id="arranger"
                  label="编曲"
                  mode="tags"
                  placeholder="请输入编曲人"
                  disabled={disabled}
                  data={[]}
                  defValue={singerData.singer}
                />
              </Col>

              <Col span={12}>
                <ConSelect
                  form={form}
                  formItemLayout={formItemLayout}
                  id="producer"
                  label="制片人"
                  mode="tags"
                  placeholder="请输入制片人"
                  disabled={disabled}
                  data={[]}
                  defValue={singerData.singer}
                />
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <ConDate
                  title={'首发日期'}
                  form={form}
                  formItemLayout={formItemLayout}
                  disabled={disabled}
                  defValue={singerData.date}
                />
              </Col>
              <Col span={12}>
                <ConTime
                  form={form}
                  formItemLayout={formItemLayout}
                  label="时长"
                  disabled={disabled}
                  defValue={singerData.time}
                />
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <ConSelect
                  form={form}
                  formItemLayout={formItemLayout}
                  id="classify"
                  mode="tags"
                  label="类型"
                  placeholder="请选择类型"
                  disabled={disabled}
                  data={actorClassifyData}
                  defValue={singerData.classify}
                />
              </Col>

              <Col span={12}>
                <ConSelect
                  form={form}
                  formItemLayout={formItemLayout}
                  id="tags"
                  label="标签"
                  mode="tags"
                  placeholder="请输入标签"
                  disabled={disabled}
                  data={[]}
                  defValue={singerData.tags}
                />
              </Col>
            </Row>
          </Form>
        </Modal>

        <Table
          loading={loading}
          rowKey={record => record._id}
          columns={this.columns}
          dataSource={(singerDataObj && singerDataObj.list) ? singerDataObj.list : []}
          size="small"
          rowSelection={rowSelection}
          pagination={{
            current: singerDataObj.pageIndex + 1,
            total: singerDataObj.count,
            pageSize: singerDataObj.size,
          }}
          onChange={this.onChangePage}

        />
      </div>
    );
  }
}

export default Singer;
