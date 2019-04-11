import React from 'react';

import { Form, Icon, Input, Button, Modal, Select, Row, Col, Table, Tag, Avatar, InputNumber } from 'antd';

import { uuid } from 'utils';
import { api } from 'utils/config';

import styles from './index.less';


const Option = Select.Option;
const { TextArea } = Input;


@Form.create()

class Paper extends React.Component {
  state = {
    expand: false,
    visible: false,
    status: '',
    imageUrl: '',
    selectedRowKeys: [], // 选中行key
    selectedRowObj: {}, // 选中行对象

  };



  componentWillReceiveProps(nextProps) {

    const { paperDataObj } = nextProps;
    const { list = [] } = paperDataObj || {};

    // 更新 table 数据
    if (list.length > 0 && this.props.paperDataObj !== paperDataObj) {
      const { _id, imageUrl } = list[0];
      this.setState({ selectedRowKeys: [_id], selectedRowObj: list[0], imageUrl });
    }
  }

  // 切换单选框
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };


  // 标题对象
  titleObj = {
    add: '添加论文',
    edit: '编辑论文',
    desc: '查看论文',
  };


  // 展示弹框
  onShowModal = (status) => {
    this.setState({ visible: true, status });
  };

  // 关闭弹框
  onClickClose = () => {
    this.setState({ visible: false, status: '' });
    this.props.form.resetFields();
  };


  // 修改分页
  onChangePage = (data) => {
    const { getTableData, basicRow } = this.props;
    const { current, pageSize } = data;
    const { _id: basicId } = basicRow;
    const param = { pageIndex: current - 1, size: pageSize, table: 'paper', basicId };
    getTableData(param);
  };


  //  提交form信息弹框
  handleSubmit = (e) => {
    // this.props.hideModal();
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        const { status, selectedRowObj } = this.state;
        const { basicRow, onActionTable } = this.props;

        let payload = {};
        // 主表id
        const { _id } = basicRow;
        // 添加类型
        if (status === 'add') {
          payload = fieldsValue;
          payload.type = 'common/add';
          payload.basicId = _id;
        }

        // 编辑操作
        if (status === 'edit') {
          payload.type = 'common/upd';
          payload.condition = { _id: selectedRowObj['_id'] };
          payload.content = fieldsValue;
        }
        // 添加操作表名
        payload.table = 'paper';
        onActionTable(payload);
        this.onClickClose();
      }
    });
  };

  // 删除
  onClickDel = () => {
    const { showDelCon } = this.props;
    const { selectedRowObj } = this.state;
    let payload = { type: 'common/del', _id: selectedRowObj['_id'], table: 'paper' };
    showDelCon(payload);
  };


  columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: (title, rec) => <a href="javascript:;">{title.slice(0,30)}</a>,
    },
    {
      title: '年份',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: '阅读量',
      dataIndex: 'view',
      key: 'view',
    },{
      title: '被引量',
      dataIndex: 'cited',
      key: 'cited',
    },{
      title: '点赞量',
      dataIndex: 'like',
      key: 'like',
    },
    {
      title: '收藏量',
      dataIndex: 'like',
      key: 'like',
    },
    {
      title: '点赞量',
      dataIndex: 'collect',
      key: 'collect',
    },
    {
      title: '期刊',
      dataIndex: 'periodical',
      key: 'periodical',
      render: periodical => (
        <span>
        {periodical && periodical.length > 0 && periodical.slice(0, 3).map(tag => <Tag key={tag}>{tag}</Tag>)}
        </span>
      ),
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
      render: author => (
        <span>
        {author && author.length > 0 && author.slice(0, 3).map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
        </span>
      ),
    }, {
      title: '关键词',
      dataIndex: 'keyword',
      key: 'keyword',
      render: keyword => (
        <span>
        {keyword && keyword.length > 0 && keyword.slice(0, 3).map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
        </span>
      ),
    },
  ];


  render() {
    const { form, paperDataObj, basicRow } = this.props;
    const { visible, selectedRowKeys, selectedRowObj, status } = this.state;

    const { getFieldDecorator } = form;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      type: 'radio',
    };

    // DOI(文献身份证) 期刊(ELSCI)


    const formItemLayout = {
      labelCol: { sm: { span: 6 } },
      wrapperCol: { sm: { span: 16 } },
    };


    const formItemLayoutLine = {
      labelCol: { sm: { span: 3 } },
      wrapperCol: { sm: { span: 20 } },
    };


    const disabled = status === 'desc' ? true : false;
    //  选中的数据
    const paperData = status !== 'add' ? selectedRowObj : {};

    const btnDisable = (paperDataObj.list && paperDataObj.list.length > 0) ? false : true;
    // 添加按钮disabled
    const addBtnDisable = basicRow._id ? false : true;


    return (
      <div className={styles.paperModal}>

        <div className="table-operations">
          <Button onClick={this.onShowModal.bind(this, 'add')} disabled={addBtnDisable}>添加</Button>
          <Button onClick={this.onShowModal.bind(this, 'edit')} disabled={btnDisable}>编辑</Button>
          <Button onClick={this.onShowModal.bind(this, 'desc')} disabled={btnDisable}>详情</Button>
          <Button onClick={this.onClickDel} disabled={btnDisable}>删除</Button>
        </div>
        <Modal
          title={this.titleObj[status]}
          visible={visible}
          onOk={this.handleSubmit}
          onCancel={this.onClickClose}
          okText="确认"
          cancelText="取消"
          width="960px"
        >
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="标题"
                >
                  {getFieldDecorator('title', {
                    initialValue: paperData.title || '',
                    rules: [{ required: true, message: '请输入论文标题' }],
                  })(
                    <Input placeholder="请输入论文标题" disabled={disabled}/>,
                  )}
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="作者"
                >
                  {getFieldDecorator('author', {
                    rules: [{ required: true, message: '请输入作者' }],
                    initialValue: paperData.author,
                  })(
                    <Select
                      disabled={disabled}
                      mode="tags"
                      placeholder="请输入作者"
                    >
                    </Select>,
                  )}
                </Form.Item>
              </Col>

            </Row>
            <Row>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="关键词"
                >
                  {getFieldDecorator('keyword', {
                    rules: [{ required: true, message: '请输入关键词' }],
                    initialValue: paperData.keyword,
                  })(
                    <Select
                      disabled={disabled}
                      mode="tags"
                      placeholder="请输入关键词"
                    >
                    </Select>,
                  )}
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="年份"
                >
                  {getFieldDecorator('year', {
                    initialValue: paperData.year,
                  })(
                    <InputNumber disabled={disabled} min={1990} max={2019} style={{ width: '100%' }}/>,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="期刊"
                >
                  {getFieldDecorator('periodical', {
                    initialValue: paperData.periodical,
                  })(
                    <Select
                      disabled={disabled}
                      mode="tags"
                      placeholder="请输入或者选择论文期刊"
                    >
                      <Option value="WOS">WOS</Option>
                      <Option value="EI">EI</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="DOI"
                >
                  {getFieldDecorator('doi', {
                    initialValue: paperData.doi,
                  })(
                    <Input placeholder="请输入论文DOI" disabled={disabled}/>,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="论文URL"
                >
                  {getFieldDecorator('url', {
                    initialValue: paperData.url,
                  })(
                    <Input placeholder="请输入论文URL" disabled={disabled}/>,
                  )}
                </Form.Item>
              </Col>


              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="阅读量"
                >
                  {getFieldDecorator('view', {
                    initialValue: paperData.view || '0',
                  })(
                    <InputNumber disabled={disabled} min={0} style={{ width: '100%' }}/>,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="被引量"
                >
                  {getFieldDecorator('cited', {
                    initialValue: paperData.cited || '0',
                  })(
                    <InputNumber disabled={disabled} min={0} style={{ width: '100%' }}/>,
                  )}
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="点赞量"
                >
                  {getFieldDecorator('like', {
                    initialValue: paperData.like || '0',
                  })(
                    <InputNumber disabled={disabled} min={0} style={{ width: '100%' }}/>,
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="收藏量"
                >
                  {getFieldDecorator('collect', {
                    initialValue: paperData.collect || '0',
                  })(
                    <InputNumber disabled={disabled} min={0} style={{ width: '100%' }}/>,
                  )}
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
                    initialValue: paperData.abstract || '',
                  })(
                    <TextArea style={{ height: 210 }} disabled={disabled}/>,
                  )}
                </Form.Item>
              </Col>
            </Row>


          </Form>
        </Modal>


        <Table
          columns={this.columns}
          rowKey={record => record._id}
          dataSource={(paperDataObj && paperDataObj.list) ? paperDataObj.list : []}
          rowSelection={rowSelection}
          pagination={{
            current: paperDataObj.pageIndex + 1,
            total: paperDataObj.count,
            pageSize: paperDataObj.size,
          }}
          onChange={this.onChangePage}
          size="small"
          style={{ marginTop: '15px' }}/>

      </div>
    );
  }
}

export default Paper;
