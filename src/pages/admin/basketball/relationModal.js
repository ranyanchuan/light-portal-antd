import React from 'react';

import { Form, DatePicker, Icon, Input, Button, Modal, Select, Row, Col, Table, Tag, Divider, Avatar } from 'antd';

import { uuid } from 'utils';

import styles from './index.less';

const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
const { TextArea } = Input;


@Form.create()
// @connect((state) => ({
//   homePage: state.homePage,
// }))

class relationModal extends React.Component {
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
      render: avatar => (<Avatar src={avatar} />)
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


    return (
      <div className={styles.raltionModal}>
        <Modal
          title="查看关系"
          visible={visible}
          onOk={this.handleSubmit}
          onCancel={this.hideModal}
          width="860px"
          footer={null}
        >
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('name')(
                <Select
                  mode="tags"
                  style={{ width: '350px' }}
                  placeholder="请选择或姓名"
                  onChange={this.onChangeTags}
                >
                  {children}
                </Select>,
              )}
            </Form.Item>


            <Form.Item>
              {getFieldDecorator('relation')(
                <Select
                  style={{ width: '200px' }}
                  mode="tags"
                  placeholder="请选择或关系"
                  onChange={this.onChangeTags}
                >
                  {relationChildren}
                </Select>,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary">查询</Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary">添加</Button>
            </Form.Item>
          </Form>
          <Table columns={this.columns} dataSource={this.data} className={styles.newsTable} size="small" style={{marginTop:'15px'}} />
        </Modal>
      </div>
    );
  }
}

export default relationModal;
