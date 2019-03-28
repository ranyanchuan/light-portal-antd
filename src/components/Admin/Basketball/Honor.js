import React from 'react';

import { Form, DatePicker, Icon, Input, Button, Modal, Select, Row, Col, Table, Tag, Divider, Avatar } from 'antd';

import { uuid } from 'utils';

import styles from './index.less';
import { Upload } from 'antd/lib/upload';

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
  showModal=()=>{
    this.setState({visible:true});
  }

  //  关闭添加信息弹框
  hideModal = () => {
    this.setState({visible:false});
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


    }];

  data = [{
    key: '1',
    date: '2018-11-01',
    title: '11-12赛季总冠军(迈阿密热火)',
    comment:'xxxxxxxxx'
  }, {
    key: '2',
    date: '2018-11-01',
    title: '11-12赛季总冠军(迈阿密热火)',
    comment:'xxxxxxxxx'

  }, {
    key: '3',
    date: '2018-11-01',
    title: '11-12赛季总冠军(迈阿密热火)',
    comment:'xxxxxxxxx'

  }, {
    key: '4',
    date: '2018-11-01',
    title: '11-12赛季总冠军(迈阿密热火)',
    comment:'xxxxxxxxx'

  }, {
    key: '5',
    date: '2018-11-01',
    title: '11-12赛季总冠军(迈阿密热火)',
    comment:'xxxxxxxxx'

  }, {
    key: '6',
    date: '2018-11-01',
    title: '11-12赛季总冠军(迈阿密热火)',
    comment:'xxxxxxxxx'

  }];


  render() {
    const {  form } = this.props;
    const {selectedRowKeys,visible}=this.state;
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
                  label="日期"
                >
                  {getFieldDecorator('date')(
                    <DatePicker placeholder="请选择日期" style={{ width: '100%' }}/>,
                  )}
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  label="荣誉"
                >
                  {getFieldDecorator('honor',config.honor)(
                    <Input placeholder="请填写明星荣誉"/>,
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

export default Honor;
