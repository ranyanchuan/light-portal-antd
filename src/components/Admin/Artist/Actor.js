import React from 'react';
import moment from 'moment';

import { Form, Button, Modal, Row, Col, Table, Tag } from 'antd';
import ConSelect from 'components/ConSelect';
import ConInput from 'components/ConInput';
import ConInputNumber from 'components/ConInputNumber';
import ConTime from 'components/ConTime';
import ConDate from 'components/ConDate';
import ConTextArea from 'components/ConTextArea';
import ConUploadOne from 'components/ConUploadOne';

import { api, actorClassifyData, languageData } from 'utils/config';

import styles from './index.less';

const ruleDate = 'YYYY-MM-DD';
const ruleTime = 'HH:mm';

@Form.create()

class Actor extends React.Component {
  state = {
    visible: false,
    status: '',
    imageUrl: 'https://extraimage.net/images/2019/02/27/08d7a330e6b843e41bbc6a59e64d3743.jpg',
    selectedRowKeys: [], // 选中行key
    selectedRowObj: {}, // 选中行对象

  };


  componentWillReceiveProps(nextProps) {
    const { actorDataObj } = nextProps;
    const { list = [] } = actorDataObj || {};
    if (list.length > 0 && this.props.actorDataObj !== actorDataObj) {
      const { _id, imageUrl } = list[0];
      this.setState({ selectedRowKeys: [_id], selectedRowObj: list[0], imageUrl });
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
      const { status, selectedRowObj, imageUrl } = this.state;

      if (!err) {

        const { basicRow, onActionTable } = this.props;

        // 添加 封面图片
        fieldsValue.cover = imageUrl;


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
        payload.table = 'actor';
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
      title: '语言',
      key: 'language',
      dataIndex: 'language',
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
    },{
      title: '导演',
      dataIndex: 'director',
      key: 'director',
      render: director => (
        <span>
        {director && director.length > 0 && director.slice(0, 3).map(tag => <Tag key={tag}>{tag}</Tag>)}
        </span>
      ),
    },
    {
      title: '编辑',
      dataIndex: 'editor',
      key: 'editor',
      render: editor => (
        <span>
        {editor && editor.length > 0 && editor.slice(0, 3).map(tag => <Tag key={tag}>{tag}</Tag>)}
        </span>
      ),
    },
    {
      title: '演员',
      dataIndex: 'actor',
      key: 'actor',
      render: actor => (
        <span>
        {actor && actor.length > 0 && actor.slice(0, 3).map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
        </span>
      ),
    }
  ];

  // 更新封面图片
  updatePicture = (imgUrl) => {
    this.setState({ imgUrl });
  };

  // 标题对象
  titleObj = {
    add: '添加影视数据',
    edit: '编辑影视数据',
    desc: '查看影视数据',
  };


  render() {
    const { form, actorDataObj, basicRow, loading } = this.props;
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


    const formItemLayoutLine = {
      labelCol: { sm: { span: 3 } },
      wrapperCol: { sm: { span: 20 } },
    };


    const disabled = status === 'desc' ? true : false;
    const actorData = status !== 'add' ? selectedRowObj : {};

    const btnDisable = (actorDataObj.list && actorDataObj.list.length > 0) ? false : true;

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
                  label="标题"
                  placeholder="请输入影视作品标题"
                  message='请输入影视作品标题'
                  disabled={disabled}
                  required={true}
                  defValue={actorData.title}
                />
              </Col>
              <Col span={12}>
                <ConSelect
                  form={form}
                  formItemLayout={formItemLayout}
                  id="actor"
                  label="演员"
                  mode="tags"
                  placeholder="请输入演员"
                  disabled={disabled}
                  data={[]}
                  required={true}
                  defValue={actorData.actor}
                />
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <ConInputNumber
                  form={form}
                  formItemLayout={formItemLayout}
                  id="year"
                  label="年份"
                  placeholder="请选择或者输入影视年份"
                  disabled={disabled}
                  defValue={actorData.year}
                  min={1990}
                  max={2019}
                />
              </Col>
              <Col span={12}>
                <ConTime
                  form={form}
                  formItemLayout={formItemLayout}
                  label="时长"
                  disabled={disabled}
                  defValue={actorData.time}
                />
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <ConDate
                  form={form}
                  formItemLayout={formItemLayout}
                  disabled={disabled}
                  defValue={actorData.date}
                />
              </Col>
              <Col span={12}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="place"
                  label="产地"
                  placeholder="请输入影视产地"
                  disabled={disabled}
                  defValue={actorData.place}
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
                  defValue={actorData.classify}

                />
              </Col>
              <Col span={12}>
                <ConSelect
                  form={form}
                  formItemLayout={formItemLayout}
                  id="language"
                  label="语言"
                  placeholder="请选择语言"
                  disabled={disabled}
                  data={languageData}
                  defValue={actorData.language}
                />
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <ConSelect
                  form={form}
                  formItemLayout={formItemLayout}
                  id="director"
                  label="导演"
                  mode="tags"
                  placeholder="请输入导演"
                  disabled={disabled}
                  data={[]}
                  defValue={actorData.director}
                />
              </Col>
              <Col span={12}>
                <ConSelect
                  form={form}
                  formItemLayout={formItemLayout}
                  id="editor"
                  label="编辑"
                  mode="tags"
                  placeholder="请输入编辑"
                  disabled={disabled}
                  data={[]}
                  defValue={actorData.editor}

                />
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="url"
                  label="影视URL"
                  placeholder="请输入影视URL"
                  disabled={disabled}
                  defValue={actorData.url}
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
                  defValue={actorData.tags}
                />
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <ConUploadOne
                  title="上传封面"
                  formItemLayout={formItemLayoutLine}
                  imageUrl={actorData.cover}
                  disabled={disabled}
                  label="封面"
                  updatePicture={this.updatePicture}
                />
              </Col>
            </Row>

            <Row>
              <ConTextArea
                form={form}
                formItemLayout={formItemLayoutLine}
                id="abstract"
                label="摘要"
                placeholder="请输入摘要"
                disabled={disabled}
                defValue={actorData.abstract}
              />
            </Row>
          </Form>

        </Modal>
        <Table
          loading={loading}
          rowKey={record => record._id}
          columns={this.columns}
          dataSource={(actorDataObj && actorDataObj.list) ? actorDataObj.list : []}
          size="small"
          rowSelection={rowSelection}
          pagination={{
            current: actorDataObj.pageIndex + 1,
            total: actorDataObj.count,
            pageSize: actorDataObj.size,
          }}
          onChange={this.onChangePage}

        />
      </div>
    );
  }
}

export default Actor;
