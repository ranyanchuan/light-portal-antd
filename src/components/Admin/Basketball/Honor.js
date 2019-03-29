import React from 'react';

import { Form, DatePicker, Icon, Input, Button, Modal, Select, Row, Col, Table, Tag, Divider, Avatar } from 'antd';

import { uuid } from 'utils';

import styles from './index.less';
import { Upload } from 'antd/lib/upload';
import moment from 'moment';

const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
const { TextArea } = Input;


@Form.create()
// @connect((state) => ({
//   homePage: state.homePage,
// }))

class Honor extends React.Component {
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
    this.setState({visible:false});
  };

  onChangeTags = (value) => {
    console.log(`selected ${value}`);
  };

  columns = [
    {
      title: '时间',
      dataIndex: 'date',
      key: 'date',
    }, {
      title: '荣誉',
      key: 'title',
      dataIndex: 'title',
    }, {
      title: '备注',
      key: 'comment',
      dataIndex: 'comment',
    }
    ];




  render() {
    const {  form ,honorDataArray} = this.props;
    const {selectedRowKeys,visible,status}=this.state;
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
    const honorData = status !== 'add' ? honorDataArray[0] : {};


    return (
      <div>

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
                  label="日期"
                >
                  {getFieldDecorator('date',{
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
                  {getFieldDecorator('title',{
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
                  {getFieldDecorator('comment',{
                    initialValue: honorData.comment || '',
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
          dataSource={honorDataArray}
          size="small"
          rowSelection={rowSelection}
        />
      </div>
    );
  }
}

export default Honor;
