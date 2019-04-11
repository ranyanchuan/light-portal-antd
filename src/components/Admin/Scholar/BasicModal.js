import React from 'react';
import moment from 'moment';

import { Form, DatePicker, Input, Modal, Select, Row, Col } from 'antd';

import Tag from 'components/Tag/basketball';
import Domain from 'components/Domain/scholar';
import School from 'components/School';
import Nationality from 'components/Nationality';
import City from 'components/City';
import UploadPicture from 'components/UploadPicture';
import Education from 'components/Education';

import { api } from 'utils/config';


import styles from './index.less';

const Option = Select.Option;
const { TextArea } = Input;
const ruleDate = 'YYYY-MM-DD';

// 篮球运动员基本信息 添加 删除 详情
@Form.create()
class BasicModal extends React.Component {
  state = {
    loading: false,
    imageUrl: '',
  };

  componentWillReceiveProps(nextProps, nextState) {
    // 将头像 url 放到 state 中
    const { status, visible, basicData } = nextProps;
    if (visible && status !== 'add' && basicData) {
      const { avatar } = basicData;
      this.setState({ imageUrl: avatar });
    }
  }


  // 关闭添加信息弹框
  hideModal = () => {
    this.setState({ imageUrl: '' });
    this.props.onClose();
    this.props.form.resetFields();
  };

  //  提交form信息弹框
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      console.log('fieldsValue', fieldsValue);
      if (!err) {
        const { imageUrl } = this.state;
        // 添加头像url
        if (imageUrl) {
          fieldsValue.avatar = imageUrl;
        }
        // 日期格式
        if (fieldsValue.birthday) {
          fieldsValue.birthday = moment(fieldsValue.birthday).format(ruleDate);
        }
        this.props.onSave(fieldsValue);
        this.hideModal();
      }
    });
  };

  // 标题对象
  titleObj = {
    add: '添加基本信息',
    edit: '编辑基本信息',
    desc: '查看基本信息',
  };


  render() {
    const { visible, form, status, basicData = {} } = this.props;

    const { getFieldDecorator } = form;

    //label 和输入框比例
    const formItemLayout = {
      labelCol: { sm: { span: 6 } },
      wrapperCol: { sm: { span: 16 } },
    };

    const formItemLayoutLine = {
      labelCol: { sm: { span: 3 } },
      wrapperCol: { sm: { span: 20 } },
    };


    const disabled = status === 'desc' ? true : false;


    return (
      <div className={styles.basicModal}>
        <Modal
          title={this.titleObj[status]}
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
                <Form.Item
                  {...formItemLayout}
                  label="名字"
                >
                  {getFieldDecorator('name_cn', {
                    initialValue: basicData.name_cn || '',
                    rules: [{ required: true, message: '请输入中文名' }],
                  })(
                    <Input placeholder="请输入中文姓名" disabled={disabled}/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="英文名"
                >
                  {getFieldDecorator('name', {
                    initialValue: basicData.name || '',
                    rules: [{ required: true, message: '请输入英文名' }],
                  })(
                    <Input placeholder="请输入英文姓名" disabled={disabled}/>,
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="性别"
                  hasFeedback
                >
                  {getFieldDecorator('gender', {
                    initialValue: basicData.gender || '男',
                  })(
                    <Select disabled={disabled}>
                      <Option value="男">男</Option>
                      <Option value="女">女</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="生日"
                >
                  {getFieldDecorator('birthday', {
                    initialValue: basicData.birthday ? moment(basicData.birthday) : moment(),
                  })(
                    <DatePicker style={{ width: '100%' }} disabled={disabled}/>,
                  )}
                </Form.Item>
              </Col>
            </Row>


            <Row>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="邮箱"
                >
                  {getFieldDecorator('email', {
                    initialValue: basicData.email || '',
                  })(
                    <Input placeholder="请输入Email" disabled={disabled}/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="手机号"
                >
                  {getFieldDecorator('phone', {
                    initialValue: basicData.phone || '',
                  })(
                    <Input placeholder="请输入手机号" disabled={disabled}/>,
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Education formItemLayout={formItemLayout} form={form} disabled={disabled} defValue={basicData.education}/>
              </Col>
              <Col span={12}>
                <Tag formItemLayout={formItemLayout} form={form} disabled={disabled} defValue={basicData.tags}/>
              </Col>
            </Row>

            <Row>

              <Col span={12}>
                <Domain defValue={basicData.domain} formItemLayout={formItemLayout} form={form} required={true}
                        disabled={disabled}/>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="单位"
                >
                  {getFieldDecorator('affiliation', {
                    initialValue: basicData.affiliation || '',
                  })(
                    <Input placeholder="请输入单位" disabled={disabled}/>,
                  )}
                </Form.Item>
              </Col>
            </Row>





            <Row>
              <Col span={12}>
                <Nationality formItemLayout={formItemLayout} form={form} disabled={disabled}
                             defValue={basicData.nationality}/>
              </Col>
              <Col span={12}>
                <City formItemLayout={formItemLayout} form={form} disabled={disabled} defValue={basicData.city}/>
              </Col>
            </Row>


            <Row>
              <Col span={12}>
                <School formItemLayout={formItemLayout} form={form} disabled={disabled} defValue={basicData.school}/>
              </Col>

              <Col span={12}><
                Form.Item
                {...formItemLayout}
                label="家乡"
              >
                {getFieldDecorator('hometown', {
                  initialValue: basicData.hometown || '',
                })(
                  <Input placeholder="请输入家乡" disabled={disabled}/>,
                )}
              </Form.Item>
              </Col>
            </Row>


            <Row>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="百科"
                >
                  {getFieldDecorator('wiki_baidu', {
                    initialValue: basicData.wiki_baidu || '',
                  })(
                    <Input placeholder="请输入百度百科地址" disabled={disabled}/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="wiki"
                >
                  {getFieldDecorator('wiki', {
                    initialValue: basicData.wiki || '',
                  })(
                    <Input placeholder="请输入wiki百科地址" disabled={disabled}/>,
                  )}
                </Form.Item>
              </Col>
            </Row>





            <Row>
              <Col span={24}>
                <Form.Item
                  {...formItemLayoutLine}
                  label="头像"
                >
                  <UploadPicture
                    imageUrl={basicData.cover}
                    disabled={disabled}
                    updatePicture={this.updatePicture}
                  />
                </Form.Item>
              </Col>

            </Row>

            <Row>
              <Col span={24}>
                <Form.Item
                  {...formItemLayoutLine}
                  label="摘要"
                >
                  {getFieldDecorator('abstract', {
                    initialValue: basicData.abstract || '',
                  })(
                    <TextArea style={{ minHeight: 102 }} placeholder="请输入明星摘要信息" disabled={disabled}/>,
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

export default BasicModal;
