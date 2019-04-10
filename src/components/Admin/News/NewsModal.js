import React from 'react';

import { Form, DatePicker, TimePicker, Input, InputNumber, Upload, Icon, Modal, Select, Row, Col } from 'antd';
import Occupation from 'components/Occupation';
import Category from 'components/Category';
import Tag from 'components/Tag/news';
import DateCon from 'components/DateCon';

import { uuid } from 'utils';



import styles from './index.less';

const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
const { TextArea } = Input;


@Form.create()
// @connect((state) => ({
//   homePage: state.homePage,
// }))

class newsModal extends React.Component {
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
    const { visible, form } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { sm: { span: 4 } },
      wrapperCol: { sm: { span: 20 } },
    };

    const formItemLayoutDesc = {
      labelCol: { sm: { span: 2 } },
      wrapperCol: { sm: { span: 22 } },
    };


    const config = {
      birthday: { rules: [{ type: 'object', required: true, message: '请选择日期' }] },
      name_cn: { rules: [{ required: true, message: '请输入中文姓名' }] },
      name: { rules: [{ required: true, message: '请输入英文姓名' }] },
      gender: { rules: [{ required: true, message: '请选择性别' }] },
      height: { rules: [{ type: 'number' }] },
      width: { rules: [{ type: 'number' }] },
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
          width="960px"
        >
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col span={12}>
                <Category formItemLayout={formItemLayout} form={form} required={true}/>
              </Col>
              <Col span={12}>
                <Occupation formItemLayout={formItemLayout} form={form} required={true}/>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="作者"
                >
                  {getFieldDecorator('author', {
                    initialValue: undefined,
                    rules: [{ required: true, message: '请输入作者姓名' }],

                  })(
                    <Select
                      mode="tags"
                      style={{ width: '100%' }}
                      placeholder="请输入作者姓名"
                    >
                    </Select>,
                  )}
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="标题"
                >
                  {getFieldDecorator('title',{
                    initialValue: '',
                    rules: [{ required: true, message: '请输入标题' }],

                  })(
                    <Input placeholder="请输入标题"/>,
                  )}
                </Form.Item>
              </Col>

              <Col span={12}>
                <DateCon formItemLayout={formItemLayout} form={form} required={true} />
              </Col>

              <Col span={12}>
                <Tag formItemLayout={formItemLayout} form={form}/>
              </Col>

              <Col span={12}>
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
              </Col>

            </Row>

            <Row>
              <Col span={24}>
                <Form.Item
                  {...formItemLayoutDesc}
                  label="详情"
                >
                  {getFieldDecorator('desc')(
                    <TextArea style={{ height: 260 }}/>,
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default newsModal;
