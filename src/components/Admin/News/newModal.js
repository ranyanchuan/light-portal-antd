import React from 'react';

import { Form, DatePicker, TimePicker, Input, InputNumber, Upload, Icon, Modal, Select, Row, Col } from 'antd';
import Organization from 'components/Organization/basketball';
import Team from 'components/Team/basketball';
import Tag from 'components/Tag/basketball';

import styles from './index.less';

const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
const { TextArea } = Input;


@Form.create()
// @connect((state) => ({
//   homePage: state.homePage,
// }))

class newModal extends React.Component {
  state = {
    expand: false,
  };

  //  关闭添加信息弹框
  hideModal = () => {
    this.props.hideModal('basModVis');
  };

  //  提交form信息弹框
  handleSubmit = (e) => {
    // this.props.hideModal();
    console.log('-----');
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      console.log('fieldsValue', fieldsValue);

      if (err) {
        return;
      }
    });
  };

  onChangeTags = (value) => {
    console.log(`selected ${value}`);
  };


  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { visible,form } = this.props;
    const { getFieldDecorator } =form;
    const formItemLayout = {
      labelCol: { sm: { span: 4 } },
      wrapperCol: { sm: { span: 19 } },
    };
    const config = {
      birthday: { rules: [{ type: 'object', required: true, message: '请选择日期' }] },
      name_cn: { rules: [{ required: true, message: '请输入中文姓名' }]},
      name: { rules: [{ required: true, message: '请输入英文姓名' }] },
      gender: { rules: [{ required: true, message: '请选择性别' }] },
      height: { rules: [{ type: 'number'}] },
      width: { rules: [{ type: 'number'}] },
    };

    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }


    return (
      <div className={styles.basicModal}>
        <Modal
          title="添加新闻"
          visible={visible}
          onOk={this.handleSubmit}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
          width="860px"
        >
          <Form onSubmit={this.handleSubmit}>

            <Form.Item
              {...formItemLayout}
              label="作者"
            >
              {getFieldDecorator('birthday')(
                <Input placeholder="请输入中文姓名"/>,
              )}
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label="标题"
            >
              {getFieldDecorator('name_cn', config.name_cn)(
                <Input placeholder="请输入中文姓名"/>,
              )}
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label="类型"
              hasFeedback
            >
              {getFieldDecorator('gender', config.gender)(
                <Select placeholder="请选择性别">
                  <Option value="male">男</Option>
                  <Option value="female">女</Option>
                </Select>,
              )}
            </Form.Item>


            <Form.Item
              {...formItemLayout}
              label="日期"
            >
              {getFieldDecorator('birthday')(
                <DatePicker placeholder="请选择日期" style={{ width: '100%' }}/>,
              )}
            </Form.Item>



            <Tag formItemLayout={formItemLayout}  form={form}/>

            <Form.Item
              {...formItemLayout}
              label="封面"
            >
              <div className="dropbox">
                {getFieldDecorator('dragger', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                })(
                  <Upload.Dragger name="files" action="/upload.do">
                    <p className="ant-upload-drag-icon" style={{ marginBottom: 25 }}>
                      <Icon type="inbox"/>
                    </p>
                    <p className="ant-upload-text">单击或拖动文件到此区域进行上载</p>
                  </Upload.Dragger>,
                )}
              </div>
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label="详情"
            >
              {getFieldDecorator('abstract')(
                  <TextArea />
              )}
            </Form.Item>


          </Form>
        </Modal>
      </div>
    );
  }
}

export default newModal;
