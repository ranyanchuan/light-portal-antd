import React from 'react';

import { Form, Icon, Input, Button, Modal, Select, Row, Col, Table, Tag, Upload, Avatar } from 'antd';

import { uuid } from 'utils';
import { api } from 'utils/config';

import styles from './index.less';


const Option = Select.Option;


@Form.create()
// @connect((state) => ({
//   homePage: state.homePage,
// }))

class Paper extends React.Component {
  state = {
    expand: false,
    visible: false,
    status: '',
    imageUrl: '',
    selectedRowKeys: [], // 选中行key
    selectedRowObj: {}, // 选中行对象

  };

  queryInfo = { occupation: ['basketball'], category: ['player'] };


  componentWillReceiveProps(nextProps) {

    const { relationDataObj } = nextProps;
    const { list = [] } = relationDataObj || {};

    // 更新 table 数据
    if (list.length > 0) {
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
    add: '添加关系',
    edit: '编辑关系',
    desc: '查看关系',
  };

  // 文件上传请处理
  beforeUpload = () => {

  };


  // 文件上传成处理
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      const { response } = info.fileList[0];
      const { url } = response;
      // 服务器端 头像地址
      this.setState({ imageUrl: url[0], loading: false });
    }
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
    const param = { pageIndex: current - 1, size: pageSize, table: 'relation', basicId };
    getTableData(param);
  };


  //  提交form信息弹框
  handleSubmit = (e) => {
    // this.props.hideModal();
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        const { status, selectedRowObj, imageUrl } = this.state;
        const { basicRow, onActionTable } = this.props;

        let payload = {};
        // 主表id
        const { _id } = basicRow;
        fieldsValue.imageUrl = imageUrl;
        // 添加类型
        if (status === 'add') {
          payload = { ...fieldsValue, ...this.queryInfo };
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
        payload.table = 'relation';
        onActionTable(payload);
      }
    });
    this.setState({ visible: false });
  };

  // 删除
  onClickDel = () => {
    const { showDelCon } = this.props;
    const { selectedRowObj } = this.state;
    let payload = { type: 'common/del', _id: selectedRowObj['_id'], table: 'relation' };
    showDelCon(payload);
  };


  columns = [
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      render: avatar => (<Avatar src={avatar}/>),
    },
    {
      title: '名字',
      dataIndex: 'name',
      key: 'name',
      render: (name, rec) => <a href="javascript:;">{name + ' (' + rec.name_cn + ')'}</a>,
    }, {
      title: '关系',
      key: 'relation',
      dataIndex: 'relation',
      render: relation => (
        <span>
          {relation.map(item => <Tag color="blue" key={item}>{item}</Tag>)}
        </span>
      ),
    }, {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    }];


  render() {
    const { form, relationDataObj, basicRow } = this.props;
    const { visible, selectedRowKeys, imageUrl, selectedRowObj, status } = this.state;

    const { getFieldDecorator } = form;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      type: 'radio',
    };


    // 下拉处理
    const relationSelect = ['朋友', '队友'];
    const relationChildren = relationSelect.map((item) => {
      return <Option key={item} value={item}>{item}</Option>;
    });


    const formItemLayout = {
      labelCol: { sm: { span: 4 } },
      wrapperCol: { sm: { span: 19 } },
    };


    const disabled = status === 'desc' ? true : false;
    //  选中的数据
    const relationData = status !== 'add' ? selectedRowObj : {};

    const btnDisable = (relationDataObj.list && relationDataObj.list.length > 0) ? false : true;
    // 添加按钮disabled
    const addBtnDisable = basicRow._id ? false : true;

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'}/>
        <div className="ant-upload-text">上传头像</div>
      </div>
    );


    return (
      <div className={styles.relationModal}>

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
          width="760px"
        >
          <Form onSubmit={this.handleSubmit}>
            <Row>


              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  label="头像"
                >
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={api.addFile}
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
                    disabled={status === 'desc' ? true : false}
                  >
                    {imageUrl && status !== 'add' ?
                      <img src={imageUrl} alt="avatar" style={{ width: 90, height: 90 }}/> : uploadButton}
                  </Upload>

                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  label="中文名"
                >
                  {getFieldDecorator('name_cn', {
                    initialValue: relationData.name_cn || '',
                  })(
                    <Input placeholder="请输入中文名" disabled={disabled}/>,
                  )}
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  label="英文名"
                >
                  {getFieldDecorator('name', {
                    initialValue: relationData.name || '',
                  })(
                    <Input placeholder="请输入英文名" disabled={disabled}/>,
                  )}
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  label="关系"
                >
                  {getFieldDecorator('relation', {
                    rules: [{ required: true, message: '请选择关系' }],
                    initialValue: relationData.relation,
                  })(
                    <Select
                      disabled={disabled}
                      mode="tags"
                      placeholder="请选择或关系"
                    >
                      {relationChildren}
                    </Select>,
                  )}
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  label="备注"
                >
                  {getFieldDecorator('remark', {
                    initialValue: relationData.remark || '',
                  })(
                    <Input placeholder="请输入英文名" disabled={disabled}/>,
                  )}
                </Form.Item>
              </Col>


            </Row>
          </Form>
        </Modal>


        <Table
          columns={this.columns}
          rowKey={record => record._id}
          dataSource={(relationDataObj && relationDataObj.list) ? relationDataObj.list : []}
          rowSelection={rowSelection}
          pagination={{
            current: relationDataObj.pageIndex + 1,
            total: relationDataObj.count,
            pageSize: relationDataObj.size,
          }}
          onChange={this.onChangePage}
          size="small"
          style={{ marginTop: '15px' }}/>

      </div>
    );
  }
}

export default Paper;
