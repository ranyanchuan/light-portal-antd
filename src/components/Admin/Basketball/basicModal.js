import React from 'react';

import { Form, DatePicker, TimePicker, Input, InputNumber, Upload, Icon, Modal, Select, Row, Col } from 'antd';
import Organization from 'components/Organization/basketball';
import Team from 'components/Team/basketball';
import Tag from 'components/Tag/basketball';
import Position from 'components/Position/basketball';
import School from 'components/School';
import Nationality from 'components/Nationality';
import City from 'components/City';
import Shirt from 'components/PoloShirt/Basketball';


import styles from './index.less';

const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
const { TextArea } = Input;


@Form.create()
// @connect((state) => ({
//   homePage: state.homePage,
// }))

class basicModal extends React.Component {
  state = {
    expand: false,
  };

  //  关闭添加信息弹框
  hideModal = () => {
    this.props.hideModal('basModVis');
  };

  //  提交form信息弹框
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      console.log('fieldsValue', fieldsValue);
      if (err) {
        this.props.save(fieldsValue)
      }
    });
  };

  onChangeTags = (value) => {
    console.log(`selected ${value}`);
  };

  // 文件上传
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


    return (
      <div className={styles.basicModal}>
        <Modal
          title="添加信息"
          visible={visible}
          onOk={this.handleSubmit}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
          width="860px"
        >
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col span={12}>
                <Organization
                  formItemLayout={formItemLayout}
                  required={true}
                  form={form}
                />
              </Col>

              <Col span={12}>
                <Team
                  formItemLayout={formItemLayout}
                  required={true}
                  form={form}
                />
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="名字"
                >
                  {getFieldDecorator('name_cn', config.name_cn)(
                    <Input placeholder="请输入中文姓名"/>,
                  )}
                </Form.Item></Col>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="英文名"
                >
                  {getFieldDecorator('name', config.name)(
                    <Input placeholder="请输入英文姓名"/>,
                  )}
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="性别"
                  hasFeedback
                >
                  {getFieldDecorator('gender', config.gender)(
                    <Select placeholder="请选择性别">
                      <Option value="male">男</Option>
                      <Option value="female">女</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="生日"
                >
                  {getFieldDecorator('birthday')(
                    <DatePicker placeholder="请选择日期" style={{ width: '100%' }}/>,
                  )}
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="身高"
                >
                  {getFieldDecorator('height',config.height)(
                    <InputNumber min={1} max={250} placeholder="请输入或者选择身高，单位cm" style={{width:'100%'}}/>
                  )}
                </Form.Item></Col>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="体重"
                >
                  {getFieldDecorator('weight',config.width)(
                    <InputNumber min={1} max={300} placeholder="请输入或者选择体重，单位kg" style={{width:'100%'}} />
                  )}
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="邮箱"
                >
                  {getFieldDecorator('email')(
                    <Input placeholder="请输入Email"/>,
                  )}
                </Form.Item></Col>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="手机号"
                >
                  {getFieldDecorator('phone')(
                    <Input placeholder="请输入手机号"/>,
                  )}
                </Form.Item>
              </Col>

              <Col span={12}>
                <Tag formItemLayout={formItemLayout}  form={form}/>
              </Col>
              <Col span={12}>
                <Position  formItemLayout={formItemLayout}  form={form}/>
              </Col>

              <Col span={12}>
                <School formItemLayout={formItemLayout}  form={form}/>
              </Col>

              <Col span={12}><
                Form.Item
                {...formItemLayout}
                label="家乡"
              >
                {getFieldDecorator('hometown', config)(
                  <Input placeholder="请输入家乡"/>,
                )}
              </Form.Item>
              </Col>

              <Col span={12}>
                <Nationality formItemLayout={formItemLayout}  form={form}/>
              </Col>

              <Col span={12}>
                <City formItemLayout={formItemLayout}  form={form}/>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="百科"
                >
                  {getFieldDecorator('wiki_baidu', config)(
                    <Input placeholder="请输入百度百科地址"/>,
                  )}
                </Form.Item></Col>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="wiki"
                >
                  {getFieldDecorator('wiki', config)(
                    <Input placeholder="请输入wiki百科地址"/>,
                  )}
                </Form.Item>
              </Col>

              <Col span={12}>
                <Shirt formItemLayout={formItemLayout}  form={form}/>
               </Col>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="选秀"
                >
                  {getFieldDecorator('debut', config)(
                    <Input placeholder="请输入选秀情况"/>,
                  )}
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="头像"
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
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="摘要"
                >
                  {getFieldDecorator('abstract')(
                    <TextArea rows={6} placeholder="请输入明星摘要信息"/>,
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

export default basicModal;
