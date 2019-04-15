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

class Host extends React.Component {
  state = {
    visible: false,
    status: '',
    imageUrl: 'https://extraimage.net/images/2019/02/27/08d7a330e6b843e41bbc6a59e64d3743.jpg',
    selectedRowKeys: [], // 选中行key
    selectedRowObj: {}, // 选中行对象

  };


  componentWillReceiveProps(nextProps) {
    const { hostDataObj } = nextProps;
    const { list = [] } = hostDataObj || {};
    if (list.length > 0 && this.props.hostDataObj !== hostDataObj) {
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
        payload.table = 'host';
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
    const param = { pageIndex: current - 1, size: pageSize, table: 'host', basicId };
    getTableData(param);
  };


  columns = [
    {
      title: '标题',
      key: 'title',
      dataIndex: 'title',
    },
    {
      title: '开始日期',
      dataIndex: 'sDate',
      key: 'sDate',
      render: (text) => {
        return text ? moment(text).format(ruleDate) : '';
      },
    },
    {
      title: '结束日期',
      dataIndex: 'eDate',
      key: 'eDate',
      render: (text) => {
        return text ? moment(text).format(ruleDate) : '';
      },
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
      title: '备注',
      key: 'remark',
      dataIndex: 'remark',
    },
  ];


  // 标题对象
  titleObj = {
    add: '添加主持节目数据',
    edit: '编辑主持节目数据',
    desc: '查看主持节目数据',
  };


  render() {
    const { form, hostDataObj, basicRow, loading } = this.props;
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
    const hostData = status !== 'add' ? selectedRowObj : {};

    const btnDisable = (hostDataObj.list && hostDataObj.list.length > 0) ? false : true;

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
                  placeholder="请输入节目标题"
                  message='请输入节目标题'
                  disabled={disabled}
                  required={true}
                  defValue={hostData.title}
                />
              </Col>
              <Col span={12}>
                <ConSelect
                  form={form}
                  formItemLayout={formItemLayout}
                  id="classify"
                  mode="tags"
                  label="类型"
                  placeholder="请选择节目类型"
                  disabled={disabled}
                  data={actorClassifyData}
                  defValue={hostData.classify}
                />
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <ConDate
                  id="sDate"
                  label="开始日期"
                  placeholder="请选择节目开始日期"
                  form={form}
                  formItemLayout={formItemLayout}
                  disabled={disabled}
                  defValue={hostData.sDate}
                />
              </Col>

              <Col span={12}>
                <ConDate
                  id="eDate"
                  label="结束日期"
                  placeholder="请选择节目结束日期"
                  form={form}
                  formItemLayout={formItemLayout}
                  disabled={disabled}
                  defValue={hostData.eDate}
                />
              </Col>
            </Row>

            <Row>
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
                  defValue={hostData.tags}
                />
              </Col>

              <Col span={12}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="remark"
                  label="备注"
                  placeholder="请输入备注"
                  disabled={disabled}
                  defValue={hostData.remark}
                />
              </Col>

            </Row>

          </Form>

        </Modal>
        <Table
          loading={loading}
          rowKey={record => record._id}
          columns={this.columns}
          dataSource={(hostDataObj && hostDataObj.list) ? hostDataObj.list : []}
          size="small"
          rowSelection={rowSelection}
          pagination={{
            current: hostDataObj.pageIndex + 1,
            total: hostDataObj.count,
            pageSize: hostDataObj.size,
          }}
          onChange={this.onChangePage}

        />
      </div>
    );
  }
}

export default Host;
