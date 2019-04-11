import React from 'react';
import moment from 'moment';
import {
  Form,
  DatePicker,
  Input,
  Button,
  Modal,
  Select,
  Row,
  Col,
  Table,
  InputNumber,
} from 'antd';

import styles from './index.less';

const Option = Select.Option;
const ruleDate = 'YYYY-MM-DD';

@Form.create()
class Salary extends React.Component {
  state = {
    visible: false,
    status: '',
    selectedRowKeys: [], // 选中行key
    selectedRowObj: {}, // 选中行对象
  };

  queryInfo = { domain: ['basketball'], category: ['player'] };


  componentWillReceiveProps(nextProps) {
    const { salaryDataObj } = nextProps;
    const { list = [] } = salaryDataObj || {};
    if (list.length > 0 && this.props.salaryDataObj !== salaryDataObj) {
      const { _id } = list[0];
      this.setState({ selectedRowKeys: [_id], selectedRowObj: list[0] });
    }
  }

  // 更新选中的数据
  onSelectChange = (selectedRowKeys, selectedRowObjs) => {
    this.setState({ selectedRowKeys, selectedRowObj: selectedRowObjs[0] });
  };


  // 展示弹框
  onShowModal = (status) => {
    this.setState({ visible: true, status });
  };

  // 删除
  onClickDel = () => {
    const { showDelCon } = this.props;
    const { selectedRowObj } = this.state;
    let payload = { type: 'common/del', _id: selectedRowObj['_id'], table: 'salary' };
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
      console.log('fieldsValue', fieldsValue);
      if (!err) {
        // 日期格式
        if (fieldsValue.eDate) {
          fieldsValue.eDate = moment(fieldsValue.eDate).format(ruleDate);
        }
        // 日期格式
        if (fieldsValue.sDate) {
          fieldsValue.sDate = moment(fieldsValue.sDate).format(ruleDate);
        }

        const { status, selectedRowObj } = this.state;
        const { basicRow, onActionTable } = this.props;

        let payload = {};
        // 主表_id
        const { _id } = basicRow;
        // 添加
        if (status === 'add') {
          payload = fieldsValue;
          payload.type = 'common/add';
          payload.basicId = _id;
        }
        // 编辑
        if (status === 'edit') {
          payload.type = 'common/upd';
          payload.condition = { _id: selectedRowObj['_id'] };
          payload.content = fieldsValue;

        }
        // 添加操作表名
        payload.table = 'salary';
        onActionTable(payload);
        this.onClickClose();
      }
    });
  };


  columns = [
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
      title: '资薪',
      dataIndex: 'money',
      key: 'money',
    },
    {
      title: '单位',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
  ];


  // 标题对象
  titleObj = {
    add: '添加资薪数据',
    edit: '编辑资薪数据',
    desc: '查看资薪数据',
  };


  render() {
    const { form, salaryDataObj, basicRow } = this.props;
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
    //  选中的数据
    const salaryData = status !== 'add' ? selectedRowObj : {};

    const btnDisable = (salaryDataObj.list && salaryDataObj.list.length > 0) ? false : true;
    // 添加按钮disabled
    const addBtnDisable = basicRow._id ? false : true;

    return (
      <div className={styles.salaryModal}>
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
                  label="开始"
                >
                  {getFieldDecorator('sDate', {
                    initialValue: salaryData.sDate ? moment(salaryData.sDate) : null,
                  })(
                    <DatePicker disabled={disabled} placeholder="请选择日期" style={{ width: '100%' }}/>,
                  )}
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  label="结束"
                >
                  {getFieldDecorator('eDate', {
                    initialValue: salaryData.eDate ? moment(salaryData.eDate) : null,
                  })(
                    <DatePicker disabled={disabled} placeholder="请选择日期" style={{ width: '100%' }}/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  label="资薪"
                >
                  {getFieldDecorator('money', {
                    initialValue: salaryData.money ? salaryData.money : '0',
                  })(
                    <InputNumber disabled={disabled} min={0} placeholder="请输入或者选择资薪" style={{ width: '100%' }}/>,
                  )}
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  label="单位"
                  hasFeedback
                >
                  {getFieldDecorator('unit', {
                    initialValue: salaryData.unit ? salaryData.unit : '',
                  })(
                    <Select placeholder="请选择资薪单位" disabled={disabled}>
                      <Option value="￥">人民币 ￥</Option>
                      <Option value="$">美元 $</Option>
                      <Option value="€">欧元 €</Option>
                      <Option value="￡">英镑 ￡</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>


              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  label="备注"
                >
                  {getFieldDecorator('remark', {
                    initialValue: salaryData.remark || '',
                  })(
                    <Input placeholder="请填写备注" disabled={disabled}/>,
                  )}
                </Form.Item>
              </Col>

            </Row>
          </Form>
        </Modal>
        <Table
          rowKey={record => record._id}
          columns={this.columns}
          dataSource={salaryDataObj.list ? salaryDataObj.list : []}
          pagination={{
            current: salaryDataObj.pageIndex + 1,
            total: salaryDataObj.count,
            pageSize: salaryDataObj.size,
          }}
          onChange={this.onChangePage}
          size="small"
          rowSelection={rowSelection}
        />
      </div>
    );
  }
}

export default Salary;
