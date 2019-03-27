import React from 'react';

import {
  Form,
  DatePicker,
  Icon,
  Input,
  Button,
  Modal,
  Select,
  Tabs,
  Row,
  Col,
  Table,
  Tag,
  Divider,
  Avatar,
} from 'antd';

import { uuid } from 'utils';

import styles from './scoreModal.less';

const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
const { TextArea } = Input;
const TabPane = Tabs.TabPane;

@Form.create()
// @connect((state) => ({
//   homePage: state.homePage,
// }))

class ScoreModal extends React.Component {
  state = {
    expand: false,
  };

  //  关闭添加信息弹框
  hideModal = () => {
    this.props.hideModal('relModVis');
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
  };

  onChangeTags = (value) => {
    console.log(`selected ${value}`);
  };

  columns = [
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      render: avatar => (<Avatar src={avatar}/>),
    }
    ,
    {
      title: '名字',
      dataIndex: 'name',
      key: 'name',
      render: (name, rec) => <a href="javascript:;">{name + ' (' + rec.name_cn + ')'}</a>,
    }, {
      title: '关系',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
      {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
    </span>
      ),
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
      <a href="javascript:;">修改</a>
      <Divider type="vertical"/>
      <a href="javascript:;">删除</a>
    </span>
      ),
    }];

  data = [{
    key: '1',
    name: 'Stephen Curry',
    name_cn: '斯蒂芬-库里',
    avatar: 'http://www.stat-nba.com/image/playerImage/526.jpg',
    tags: ['朋友', '队友'],
  }, {
    key: '2',
    name: 'Kevin Durant',
    name_cn: '凯文-杜兰特',
    avatar: 'http://www.stat-nba.com/image/playerImage/779.jpg',
    tags: ['朋友', '队友'],
  }, {
    key: '3',
    name: 'James Harden',
    name_cn: '詹姆斯-哈登',
    avatar: 'http://www.stat-nba.com/image/playerImage/1628.jpg',
    tags: ['朋友', '队友'],
  }, {
    key: '4',
    name: 'Russell Westbrook',
    name_cn: '拉塞尔-威斯布鲁克',
    avatar: 'http://www.stat-nba.com/image/playerImage/3920.jpg',
    tags: ['朋友', '队友'],
  }, {
    key: '5',
    name: 'Michael Jordan ',
    name_cn: '迈克尔-乔丹',
    avatar: 'http://www.stat-nba.com/image/playerImage/1717.jpg',
    tags: ['朋友', '队友'],
  }, {
    key: '6',
    name: 'Shaquille O\'Neal ',
    name_cn: '沙奎尔-奥尼尔',
    avatar: 'http://www.stat-nba.com/image/playerImage/2716.jpg',
    tags: ['朋友', '队友'],
  }];


  onChangeTab = (param) => {
    console.log('------');
  };

  render() {
    const { visible, form } = this.props;
    const { getFieldDecorator } = form;

    const tags = ['科比', '乔丹', '杜兰特'];
    const children = [];
    for (const item of tags) {
      children.push(<Option key={uuid()} value={item}>{item}</Option>);
    }


    const relationData = [{ title: '朋友', value: 'friend' }, { title: '队友', value: 'team' }];
    const relationChildren = [];
    for (const item of relationData) {
      const { title, value } = item;
      relationChildren.push(<Option key={value} value={value}>{title}</Option>);
    }

    const formItemLayout = {
      labelCol: { sm: { span: 8 } },
      wrapperCol: { sm: { span: 16 } },
    };

    return (
      <div className={styles.scoreModal}>
        <Modal
          title="比分数据"
          visible={visible}
          onOk={this.handleSubmit}
          onCancel={this.hideModal}
          width="1180px"
          footer={null}
        >
          <Form
            className={styles.scoreForm}
            onSubmit={this.handleSearch}
          >
            <Row gutter={24}>
              <Col span={6}>
                <Form.Item
                  {...formItemLayout}
                  label="名字"
                >
                  {getFieldDecorator('name_cn')(
                    <Input placeholder="请输入中文姓名"/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  {...formItemLayout}
                  label="赛季"
                >
                  {getFieldDecorator('name_cn')(
                    <Input placeholder="请输入中文姓名"/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  {...formItemLayout}
                  label="结果"
                >
                  {getFieldDecorator('name_cn')(
                    <Input placeholder="请输入中文姓名"/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  {...formItemLayout}
                  label="对手"
                >
                  {getFieldDecorator('name_cn')(
                    <Input placeholder="请输入中文姓名"/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  {...formItemLayout}
                  label="对手分"
                >
                  {getFieldDecorator('name_cn')(
                    <Input placeholder="请输入中文姓名"/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  {...formItemLayout}
                  label="球队分"
                >
                  {getFieldDecorator('name_cn')(
                    <Input placeholder="请输入中文姓名"/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  {...formItemLayout}
                  label="首发"
                >
                  {getFieldDecorator('name_cn')(
                    <Input placeholder="请输入中文姓名"/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  {...formItemLayout}
                  label="出场时间"
                >
                  {getFieldDecorator('name_cn')(
                    <Input placeholder="请输入中文姓名"/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  {...formItemLayout}
                  label="三分出手"
                >
                  {getFieldDecorator('name_cn')(
                    <Input placeholder="请输入中文姓名"/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  {...formItemLayout}
                  label="三分命中"
                >
                  {getFieldDecorator('name_cn')(
                    <Input placeholder="请输入中文姓名"/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  {...formItemLayout}
                  label="两分出手"
                >
                  {getFieldDecorator('name_cn')(
                    <Input placeholder="请输入中文姓名"/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  {...formItemLayout}
                  label="两分命中"
                >
                  {getFieldDecorator('name_cn')(
                    <Input placeholder="请输入中文姓名"/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  {...formItemLayout}
                  label="罚球出手"
                >
                  {getFieldDecorator('name_cn')(
                    <Input placeholder="请输入中文姓名"/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  {...formItemLayout}
                  label="罚球命中"
                >
                  {getFieldDecorator('name_cn')(
                    <Input placeholder="请输入中文姓名"/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  {...formItemLayout}
                  label="前场篮板"
                >
                  {getFieldDecorator('name_cn')(
                    <Input placeholder="请输入中文姓名"/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  {...formItemLayout}
                  label="后场篮板"
                >
                  {getFieldDecorator('name_cn')(
                    <Input placeholder="请输入中文姓名"/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  {...formItemLayout}
                  label="助攻"
                >
                  {getFieldDecorator('name_cn')(
                    <Input placeholder="请输入中文姓名"/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  {...formItemLayout}
                  label="抢断"
                >
                  {getFieldDecorator('name_cn')(
                    <Input placeholder="请输入中文姓名"/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  {...formItemLayout}
                  label="盖帽"
                >
                  {getFieldDecorator('name_cn')(
                    <Input placeholder="请输入中文姓名"/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  {...formItemLayout}
                  label="失误"
                >
                  {getFieldDecorator('name_cn')(
                    <Input placeholder="请输入中文姓名"/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  {...formItemLayout}
                  label="犯规"
                >
                  {getFieldDecorator('name_cn')(
                    <Input placeholder="请输入中文姓名"/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  {...formItemLayout}
                  label="得分"
                >
                  {getFieldDecorator('name_cn')(
                    <Input placeholder="请输入中文姓名"/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  {...formItemLayout}
                  label="比赛日期"
                >
                  {getFieldDecorator('name_cn')(
                    <Input placeholder="请输入中文姓名"/>,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit">保存</Button>
                <Button type="primary" htmlType="submit" style={{ marginLeft: 8 }}>查询</Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>清空</Button>
              </Col>
            </Row>
          </Form>

          <Table
            columns={this.columns}
            dataSource={this.data}
            className={styles.newsTable}
            size="small"
            style={{ marginTop: '15px' }}
          />

        </Modal>
      </div>
    );
  }
}

export default ScoreModal;
