import React from 'react';

import {
  Form,
  DatePicker,
  Icon,
  Input,
  Button,
  Modal,
  Select,
  Row,
  Col,
  Table,
  Tag,
  Divider,
  Avatar,
  InputNumber,
} from 'antd';

import { uuid } from 'utils';

import styles from './index.less';
import { Upload } from 'antd/lib/upload';
import moment from 'moment';

const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
const { TextArea } = Input;


@Form.create()
class Salary extends React.Component {
  state = {
    expand: false,
    visible: false,
    selectedRowKeys: ['1'], // Check here to configure the default column

  };

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  // 打开弹框
  onClickAdd = () => {
    this.setState({ visible: true, status: 'add' });
  };


  // 编辑弹框
  onClickEdit = () => {
    this.setState({ visible: true, status: 'edit' });
  };
  // 详情弹框
  onClickDesc = () => {
    this.setState({ visible: true, status: 'desc' });
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

      if (err) {
        return;
      }
    });
    this.setState({ visible: false });
  };

  onChangeTags = (value) => {
    console.log(`selected ${value}`);
  };

  columns = [
    {
      title: '开始日期',
      dataIndex: 'start_date',
      key: 'start_date',
    },
    {
      title: '结束日期',
      dataIndex: 'end_date',
      key: 'end_date',
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
      dataIndex: 'comment',
      key: 'comment',
    }
    ];




  render() {
    const { form ,salaryDataArray} = this.props;
    const { selectedRowKeys, visible,status } = this.state;
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
    const salaryData = status !== 'add' ? salaryDataArray[0] : {};

    return (
      <div className={styles.raltionModal}>

        <div className="table-operations">
          <Button onClick={this.onClickAdd}>添加</Button>
          <Button onClick={this.onClickEdit}>编辑</Button>
          <Button onClick={this.onClickDesc}>详情</Button>
          <Button onClick={this.clearFilters}>删除</Button>
        </div>

        <Modal
          title="查看荣誉"
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
                  {getFieldDecorator('sDate',{
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
                  {getFieldDecorator('eDate',{
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
                  {getFieldDecorator('money',{
                    initialValue: salaryData.money ? salaryData.money: '0',
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
                  {getFieldDecorator('unit',{
                    initialValue: salaryData.unit ? salaryData.unit: '',
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
                  {getFieldDecorator('content',{
                    initialValue: salaryData.content ? salaryData.content: '',

                  })(
                    <Input placeholder="请填写备注" disabled={disabled}/>,
                  )}
                </Form.Item>
              </Col>

            </Row>
          </Form>
        </Modal>
        <Table
          columns={this.columns}
          dataSource={salaryDataArray}
          size="small"
          rowSelection={rowSelection}
        />
      </div>
    );
  }
}

export default Salary;
