import React from 'react';
import moment from 'moment';

import { Form, DatePicker, Input, Button, Modal, Row, Col, Table } from 'antd';

import { uuid } from 'utils';
import styles from './index.less';


const ruleDate = 'YYYY-MM-DD';

@Form.create()

class Honor extends React.Component {
  state = {
    visible: false,
    status: '',
    selectedRowKeys: [], // 选中行key
    selectedRowObj: {}, // 选中行对象

  };


  componentWillReceiveProps(nextProps) {
    const { honorDataObj } = nextProps;
    const { list = [] } = honorDataObj || {};
    if (list.length > 0 && this.props.honorDataObj !== honorDataObj) {
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
    let payload = { type: 'common/del', _id: selectedRowObj['_id'], table: 'honor' };
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
      if (status === 'desc') {
        this.onClickClose();
        return;
      }

      if (!err) {
        // 日期格式
        if (fieldsValue.date) {
          fieldsValue.date = moment(fieldsValue.birthday).format(ruleDate);
        }

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
        payload.table = 'honor';
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
    const param = { pageIndex: current - 1, size: pageSize, table: 'honor', basicId };
    getTableData(param);
  };


  columns = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      render: (text) => {
        return text ? moment(text).format(ruleDate) : '';
      },
    }, {
      title: '荣誉',
      key: 'title',
      dataIndex: 'title',
    }, {
      title: '备注',
      key: 'remark',
      dataIndex: 'remark',
    },
  ];


  // 标题对象
  titleObj = {
    add: '添加荣誉数据',
    edit: '编辑荣誉数据',
    desc: '查看荣誉数据',
  };


  render() {
    const { form, honorDataObj, basicRow,loading } = this.props;
    const { visible, selectedRowKeys, selectedRowObj, status } = this.state;

    const { getFieldDecorator } = form;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      type: 'radio',
    };

    const formItemLayout = {
      labelCol: { sm: { span: 4 } },
      wrapperCol: { sm: { span: 19 } },
    };


    const disabled = status === 'desc' ? true : false;
    const honorData = status !== 'add' ? selectedRowObj : {};

    const btnDisable = (honorDataObj.list && honorDataObj.list.length > 0) ? false : true;

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
          width="760px"
          okText="确认"
          cancelText="取消"
        >
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  label="日期"
                >
                  {getFieldDecorator('date', {
                    initialValue: honorData.date ? moment(honorData.date) : null,
                  })(
                    <DatePicker placeholder="请选择日期" style={{ width: '100%' }} disabled={disabled}/>,
                  )}
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  label="荣誉"
                >
                  {getFieldDecorator('title', {
                    rules: [{ required: true }],
                    initialValue: honorData.title || '',
                  })(
                    <Input placeholder="请填写明星荣誉" disabled={disabled}/>,
                  )}
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  label="备注"
                >
                  {getFieldDecorator('remark', {
                    initialValue: honorData.remark || '',
                  })(
                    <Input placeholder="请填写备注" disabled={disabled}/>,
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
        <Table
          loading={loading}
          rowKey={record => record._id}
          columns={this.columns}
          dataSource={(honorDataObj && honorDataObj.list) ? honorDataObj.list : []}
          size="small"
          rowSelection={rowSelection}
          pagination={{
            current: honorDataObj.pageIndex + 1,
            total: honorDataObj.count,
            pageSize: honorDataObj.size,
          }}
          onChange={this.onChangePage}

        />
      </div>
    );
  }
}

export default Honor;
