import React from 'react';
import moment from 'moment';

import { Form, Modal, Row, Col } from 'antd';
import Organization from 'components/Organization/basketball';
import Team from 'components/Team/basketball';
import ConUploadOne from 'components/ConUploadOne';
import Domain from 'components/Domain/player';
import School from 'components/School';
import Nationality from 'components/Nationality';
import City from 'components/City';
import ConSelect from 'components/ConSelect';
import ConDate from 'components/ConDate';
import ConInputNumber from 'components/ConInputNumber';
import ConInput from 'components/ConInput';
import ConTextArea from 'components/ConTextArea';

import styles from './index.less';

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
      const { status } = this.props;
      if (status === 'desc') {
        this.onClickClose();
        return;
      }
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

  // 更新封面图片
  updatePicture = (imgUrl) => {
    this.setState({ imgUrl });
  };


  render() {
    const { visible, form, status, basicData = {} } = this.props;


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
          width="860px"
        >
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col span={12}>
                <Domain
                  formItemLayout={formItemLayout}
                  form={form}
                  required={true}
                  defValue={basicData.domain}
                  disabled={disabled}
                />
              </Col>
              <Col span={12}>
                <ConSelect
                  form={form}
                  formItemLayout={formItemLayout}
                  id="remark"
                  label="标签"
                  placeholder="请选择标签"
                  mode="tags"
                  disabled={disabled}
                  data={[]}
                  defValue={basicData.remark}
                />
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Organization
                  formItemLayout={formItemLayout}
                  required={true}
                  form={form}
                  defValue={basicData.organization}
                  disabled={disabled}
                />
              </Col>
              <Col span={12}>
                <Team
                  formItemLayout={formItemLayout}
                  required={true}
                  form={form}
                  defValue={basicData.team}
                  disabled={disabled}
                />
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="name_cn"
                  label="中文名"
                  placeholder="请输入中文姓名"
                  disabled={disabled}
                  defValue={basicData.name_cn}
                />
              </Col>
              <Col span={12}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="name"
                  label="英文名"
                  placeholder="请输入英文名"
                  disabled={disabled}
                  defValue={basicData.name}
                />
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <ConSelect
                  form={form}
                  formItemLayout={formItemLayout}
                  id="gender"
                  label="性别"
                  placeholder="请选择性别"
                  disabled={disabled}
                  data={['男', '女']}
                  defValue={basicData.gender || '男'}
                />
              </Col>
              <Col span={12}>
                <ConDate
                  id="birthday"
                  label="生日"
                  placeholder="请选择生日"
                  form={form}
                  formItemLayout={formItemLayout}
                  disabled={disabled}
                  defValue={basicData.birthday}
                />
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <ConInputNumber
                  form={form}
                  formItemLayout={formItemLayout}
                  id="height"
                  label="身高"
                  placeholder="请输入或者选择身高，单位cm"
                  disabled={disabled}
                  defValue={basicData.height}
                  min={1}
                  max={250}
                />
              </Col>
              <Col span={12}>
                <ConInputNumber
                  form={form}
                  formItemLayout={formItemLayout}
                  id="weight"
                  label="体重"
                  placeholder="请输入或者选择体重，单位kg"
                  disabled={disabled}
                  defValue={basicData.height}
                  min={1}
                  max={300}
                />
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="email"
                  label="邮箱"
                  placeholder="请输入邮箱"
                  disabled={disabled}
                  defValue={basicData.email}
                />
              </Col>
              <Col span={12}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="phone"
                  label="手机号"
                  placeholder="请输入手机号"
                  disabled={disabled}
                  defValue={basicData.phone}
                />
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <School
                  formItemLayout={formItemLayout}
                  form={form}
                  disabled={disabled}
                  defValue={basicData.school}
                />
              </Col>
              <Col span={12}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="hometown"
                  label="家乡"
                  placeholder="请输入家乡"
                  disabled={disabled}
                  defValue={basicData.hometown}
                />
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Nationality
                  formItemLayout={formItemLayout}
                  form={form}
                  disabled={disabled}
                  defValue={basicData.nationality}
                />
              </Col>
              <Col span={12}>
                <City
                  formItemLayout={formItemLayout}
                  form={form}
                  disabled={disabled}
                  defValue={basicData.city}
                />
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="wiki_baidu"
                  label="百科"
                  placeholder="请输入百科"
                  disabled={disabled}
                  defValue={basicData.wiki_baidu}
                />
              </Col>

              <Col span={12}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="wiki"
                  label="wiki"
                  placeholder="请输入wiki百科地址"
                  disabled={disabled}
                  defValue={basicData.wiki}
                />
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <ConUploadOne
                  title="上传头像"
                  formItemLayout={formItemLayoutLine}
                  imageUrl={basicData.avatar}
                  disabled={disabled}
                  label="头像"
                  updatePicture={this.updatePicture}
                />
              </Col>
            </Row>

            <Row>
              <ConTextArea
                form={form}
                formItemLayout={formItemLayoutLine}
                id="abstract"
                label="摘要"
                placeholder="请输入明星摘要信息"
                disabled={disabled}
                defValue={basicData.abstract}
              />

            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default BasicModal;
