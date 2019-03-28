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
  showModal = () => {
    this.setState({ visible: true });
  };

  //  关闭添加信息弹框
  hideModal = () => {
    this.setState({ visible: false });
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

  data = [
    {
      key: '1',
      start_date: '2018-01-01',
      end_date: '2018-12-31',
      money: '1000',
      unit: '$',
      comment:'xxx',
    },
    {
      key: '2',
      start_date: '2018-01-01',
      end_date: '2018-12-31',
      money: '1000',
      unit: '$',
      comment:'xxx',
    },
    {
      key: '3',
      start_date: '2018-01-01',
      end_date: '2018-12-31',
      money: '1000',
      unit: '$',
      comment:'xxx',
    },
    {
      key: '4',
      start_date: '2018-01-01',
      end_date: '2018-12-31',
      money: '1000',
      unit: '$',
      comment:'xxx',
    },
    {
      key: '5',
      start_date: '2018-01-01',
      end_date: '2018-12-31',
      money: '1000',
      unit: '$',
      comment:'xxx',
    },
  ];


  render() {
    const { form } = this.props;
    const { selectedRowKeys, visible } = this.state;
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

    const config = {
      honor: { rules: [{ required: true, message: '请填写荣誉' }] },

    };


    return (
      <div className={styles.raltionModal}>

        <div className="table-operations">
          <Button onClick={this.showModal}>添加</Button>
          <Button onClick={this.clearFilters}>编辑</Button>
          <Button onClick={this.clearFilters}>详情</Button>
          <Button onClick={this.clearFilters}>删除</Button>
        </div>

        <Modal
          title="查看荣誉"
          visible={visible}
          onOk={this.handleSubmit}
          onCancel={this.hideModal}
          width="760px"
        >

          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  label="开始"
                >
                  {getFieldDecorator('sDate')(
                    <DatePicker placeholder="请选择日期" style={{ width: '100%' }}/>,
                  )}
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  label="结束"
                >
                  {getFieldDecorator('eDate')(
                    <DatePicker placeholder="请选择日期" style={{ width: '100%' }}/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  label="资薪"
                >
                  {getFieldDecorator('money')(
                    <InputNumber min={0} placeholder="请输入或者选择资薪" style={{ width: '100%' }}/>,
                  )}
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  label="单位"
                  hasFeedback
                >
                  {getFieldDecorator('unit')(
                    <Select placeholder="请选择资薪单位">
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
                  {getFieldDecorator('content')(
                    <Input placeholder="请填写备注"/>,
                  )}
                </Form.Item>
              </Col>

            </Row>
          </Form>
        </Modal>
        <Table
          columns={this.columns}
          dataSource={this.data}
          className={styles.newsTable}
          size="small"
          rowSelection={rowSelection}
        />
      </div>
    );
  }
}

export default Salary;
