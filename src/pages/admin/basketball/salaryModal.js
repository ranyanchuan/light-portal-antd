import React from 'react';

import {
  Form,
  DatePicker,
  Icon,
  Input,
  Button,
  Modal,
  Select,
  Row,
  Col,
  Table,
  Tag,
  Divider,
  Avatar,
  InputNumber,
} from 'antd';

import { uuid } from 'utils';

import styles from './scoreModal.less';

const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
const { TextArea } = Input;


@Form.create()
// @connect((state) => ({
//   homePage: state.homePage,
// }))

class salaryModal extends React.Component {
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
      title: '开始时间',
      dataIndex: 'avatar',
      key: 'avatar',
      render: avatar => (<Avatar src={avatar} />)
    }
    ,
    {
      title: '结束时间',
      dataIndex: 'name',
      key: 'name',
      render: (name, rec) => <a href="javascript:;">{name + ' (' + rec.name_cn + ')'}</a>,
    }, {
      title: '球队',
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
      <a href="javascript:;">详情</a>
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
          title="生涯薪金"
          visible={visible}
          onOk={this.handleSubmit}
          onCancel={this.hideModal}
          width="900px"
          footer={null}
        >
          <Form
            className={styles.scoreForm}
            onSubmit={this.handleSearch}
          >
            <Row gutter={24} >
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="开始"
                >
                  {getFieldDecorator('sDate')(
                    <DatePicker placeholder="请选择日期" style={{ width: '100%' }}/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="结束"
                >
                  {getFieldDecorator('eDate')(
                    <DatePicker placeholder="请选择日期" style={{ width: '100%' }}/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="球队"
                >
                  {getFieldDecorator('team')(
                    <Input placeholder="请输入球队"/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="资薪"
                >
                  {getFieldDecorator('money')(
                    <InputNumber min={0}  placeholder="请输入或者选择资薪" style={{width:'100%'}}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="单位"
                  hasFeedback
                >
                  {getFieldDecorator('unit')(
                    <Select placeholder="请选择资薪单位">
                      <Option value="￥">人民币 ￥</Option>
                      <Option value="$">美元 $</Option>
                      <Option value="€">欧元 €</Option>
                      <Option value="￡">英镑 ￡</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit" >查询</Button>
                <Button type="primary" htmlType="submit" style={{ marginLeft: 8 }}>保存</Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>清空</Button>
              </Col>
            </Row>
          </Form>
          <Table columns={this.columns} dataSource={this.data} className={styles.newsTable} size="small" style={{marginTop:'15px'}} />
        </Modal>
      </div>
    );
  }
}

export default salaryModal;
