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

class honorModal extends React.Component {
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
      title: '时间',
      dataIndex: 'date',
      key: 'date',
    }, {
      title: '荣誉',
      key: 'title',
      dataIndex: 'title',
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
    date: '2018-11-01',
    title: '11-12赛季总冠军(迈阿密热火)',
  }, {
    key: '2',
    date: '2018-11-01',
    title: '11-12赛季总冠军(迈阿密热火)',
  }, {
    key: '3',
    date: '2018-11-01',
    title: '11-12赛季总冠军(迈阿密热火)',
  }, {
    key: '4',
    date: '2018-11-01',
    title: '11-12赛季总冠军(迈阿密热火)',
  }, {
    key: '5',
    date: '2018-11-01',
    title: '11-12赛季总冠军(迈阿密热火)',
  }, {
    key: '6',
    date: '2018-11-01',
    title: '11-12赛季总冠军(迈阿密热火)',
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
          title="查看荣誉"
          visible={visible}
          onOk={this.handleSubmit}
          onCancel={this.hideModal}
          width="860px"
          footer={null}
        >
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('date')(
                <DatePicker placeholder="请选择日期" style={{ width: '100%' }}/>,
              )}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator('title')(
                <Input placeholder="请输入明星荣誉" style={{ width: '400px' }}/>,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary">查询</Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary">添加</Button>
            </Form.Item>
          </Form>
          <Table columns={this.columns} dataSource={this.data} className={styles.newsTable} size="small"
                 style={{ marginTop: '15px' }}/>
        </Modal>
      </div>
    );
  }
}

export default honorModal;
