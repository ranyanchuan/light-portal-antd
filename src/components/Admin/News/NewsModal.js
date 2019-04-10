import React from 'react';
import { Form, Input, Modal, Select, Row, Col } from 'antd';
import Occupation from 'components/Occupation';
import Category from 'components/Category';
import Tag from 'components/Tag/news';
import DateCon from 'components/DateCon';
import UploadPicture from 'components/UploadPicture';

import styles from './index.less';

const { TextArea } = Input;


@Form.create()

class newsModal extends React.Component {
  state = {
    imageUrl: '',
  };

  //  关闭添加信息弹框
  hideModal = () => {
    this.setState({ imageUrl: '' });
    this.props.onClose();
    this.props.form.resetFields();
  };

  //  提交form信息弹框
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        const { imageUrl } = this.state;
        // 添加图片url
        if (imageUrl) {
          fieldsValue.cover = imageUrl;
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


  // 标题对象
  titleObj = {
    add: '添加新闻信息',
    edit: '编辑新闻信息',
    desc: '查看新闻信息',
  };



  render() {
    const { visible, form, status,basicData = {} } = this.props;
    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: { sm: { span: 4 } },
      wrapperCol: { sm: { span: 20 } },
    };

    // 新闻内容
    const formItemLayoutDesc = {
      labelCol: { sm: { span: 2 } },
      wrapperCol: { sm: { span: 22 } },
    };

    const disabled=(status==='desc')? true:false;

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
                <Category defValue={basicData.category} formItemLayout={formItemLayout} form={form} required={true} disabled={disabled}/>
              </Col>
              <Col span={12}>
                <Occupation defValue={basicData.occupation} formItemLayout={formItemLayout} form={form} required={true} disabled={disabled}/>
              </Col>

            </Row>
            <Row>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="作者"
                >
                  {getFieldDecorator('author', {
                    initialValue: basicData.author,
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
                    initialValue: basicData.title || '',
                    rules: [{ required: true, message: '请输入标题' }],

                  })(
                    <Input placeholder="请输入标题" disabled={disabled}/>,
                  )}
                </Form.Item>
              </Col>

            </Row>
            <Row>
              <Col span={12}>
                <DateCon defValue={basicData.date} formItemLayout={formItemLayout} form={form} required={true} disabled={disabled}/>
              </Col>

              <Col span={12}>
                <Tag defValue={basicData.tags} formItemLayout={formItemLayout} form={form} disabled={disabled}/>
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
                  {...formItemLayoutDesc}
                  label="详情"
                >
                  {getFieldDecorator('desc',{
                    initialValue: basicData.desc || '',
                  })(
                    <TextArea style={{ height: 210 }} disabled={disabled}/>,
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
