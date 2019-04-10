import React from 'react';
import moment from 'moment';
import { Form, Input, Modal, Select, Row, Col } from 'antd';
import Occupation from 'components/Occupation';
import Category from 'components/Category';
import Tag from 'components/Tag/news';
import DateCon from 'components/DateCon';
import UploadPicture from 'components/UploadPicture';

import styles from './index.less';

const ruleDate = 'YYYY-MM-DD';
const { TextArea } = Input;


@Form.create()
// @connect((state) => ({
//   homePage: state.homePage,
// }))

class newsModal extends React.Component {
  state = {
    imageUrl: 'http://i2.w.hjfile.cn/news/201606/201606142495515859.jpg',
  };

  //  关闭添加信息弹框
  hideModal = () => {
    this.props.hideModal();
  };

  //  提交form信息弹框
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        const { imageUrl } = this.state;
        // 添加图片url
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


  // 更新封面图片
  updatePicture = (imgUrl) => {
    this.setState({ imgUrl });
  };


  render() {
    const { visible, form, status } = this.props;
    const { getFieldDecorator } = form;
    const { imageUrl } = this.state;

    const disabled = false;


    const formItemLayout = {
      labelCol: { sm: { span: 4 } },
      wrapperCol: { sm: { span: 20 } },
    };

    // 新闻内容
    const formItemLayoutDesc = {
      labelCol: { sm: { span: 2 } },
      wrapperCol: { sm: { span: 22 } },
    };


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
                <Category formItemLayout={formItemLayout} form={form} required={true} disabled={disabled}/>
              </Col>
              <Col span={12}>
                <Occupation formItemLayout={formItemLayout} form={form} required={true} disabled={disabled}/>
              </Col>

            </Row>
            <Row>

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
                      disabled={disabled}
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
                  {getFieldDecorator('title', {
                    initialValue: '',
                    rules: [{ required: true, message: '请输入标题' }],

                  })(
                    <Input placeholder="请输入标题" disabled={disabled}/>,
                  )}
                </Form.Item>
              </Col>

            </Row>
            <Row>
              <Col span={12}>
                <DateCon formItemLayout={formItemLayout} form={form} required={true} disabled={disabled}/>
              </Col>

              <Col span={12}>
                <Tag formItemLayout={formItemLayout} form={form} disabled={disabled}/>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="封面"
                >
                  <UploadPicture
                    title="上传封面"
                    imageUrl={imageUrl}
                    disabled={disabled}
                    updatePicture={this.updatePicture}

                  />
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
