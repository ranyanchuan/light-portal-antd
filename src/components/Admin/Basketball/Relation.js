import React from 'react';

import { Form, DatePicker, Icon, Input, Button, Modal, Select, Row, Col, Table, Tag, Upload, Avatar } from 'antd';

import { uuid } from 'utils';

import styles from './index.less';

const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
const { TextArea } = Input;


@Form.create()
// @connect((state) => ({
//   homePage: state.homePage,
// }))

class Relation extends React.Component {
  state = {
    expand: false,
    visible: false,
    selectedRowKeys: ['1'], // Check here to configure the default column
    status:'',
    imageUrl:this.props.relationDataArray[0].avatar,
  };

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  // 打开弹框
  onClickAdd = () => {
    this.setState({ visible: true, status: 'add' });
  };


  // 编辑弹框
  onClickEdit = () => {
    this.setState({ visible: true, status: 'edit' });
  };
  // 详情弹框
  onClickDesc = () => {
    this.setState({ visible: true, status: 'desc' });
  };

  // 关闭弹框
  onClickClose = () => {
    this.setState({ visible: false, status: '' });
    this.props.form.resetFields();
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
    this.setState({visible:false});
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
      key: 'relation',
      dataIndex: 'relation',
      render: relation => (
        <span>
      {relation.map(item => <Tag color="blue" key={item}>{item}</Tag>)}
    </span>
      ),
    }];



  render() {
    const {  form,relationDataArray} = this.props;
    const {visible,selectedRowKeys,imageUrl,status}=this.state;

    const { getFieldDecorator } = form;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      type: 'radio',
    };


    // 下拉处理
    const relationSelect = ['朋友', '队友'];
    const relationChildren = relationSelect.map((item)=>{
      return <Option key={item} value={item}>{item}</Option>
    });


    const formItemLayout = {
      labelCol: { sm: { span: 4 } },
      wrapperCol: { sm: { span: 19 } },
    };



    const disabled=status==='desc'? true:false;
    const relationData = status !== 'add' ? relationDataArray[0] : {};
    console.log("scoreData",status,relationData)


    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'}/>
        <div className="ant-upload-text">上传头像</div>
      </div>
    );


    return (
      <div className={styles.raltionModal}>

        <div className="table-operations">
          <Button onClick={this.onClickAdd}>添加</Button>
          <Button onClick={this.onClickEdit}>编辑</Button>
          <Button onClick={this.onClickDesc}>详情</Button>
          <Button onClick={this.clearFilters}>删除</Button>
        </div>
        <Modal
          title="查看关系"
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
                      label="中文名"
                    >
                      {getFieldDecorator('name_cn', {
                        initialValue: relationData.name_cn || '',
                      })(
                        <Input placeholder="请输入中文名"  disabled={disabled}/>,
                      )}
                    </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    {...formItemLayout}
                    label="中文名"
                  >
                    {getFieldDecorator('name', {
                      initialValue: relationData.name || '',
                    })(
                      <Input placeholder="请输入英文名"  disabled={disabled}/>,
                    )}
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    {...formItemLayout}
                    label="关系"
                  >
                    {getFieldDecorator('relation',{
                      rules: [{ required: true, message: '请选择关系'  }],
                      initialValue: relationData.relation,
                    })(
                      <Select
                        disabled={disabled}
                        mode="tags"
                        placeholder="请选择或关系"
                        onChange={this.onChangeTags}
                      >
                        {relationChildren}
                      </Select>,
                    )}
                  </Form.Item>
                </Col>

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
                      action="http://127.0.0.1:27000/api/file/add/"
                      beforeUpload={this.beforeUpload}
                      onChange={this.handleChange}
                      disabled={status==='desc'?true:false}
                    >
                      {imageUrl && status!=='add' ? <img src={imageUrl} alt="avatar" style={{ width: 90, height: 90 }}/> : uploadButton}
                    </Upload>

                  </Form.Item>
                </Col>
              </Row>
          </Form>
        </Modal>


        <Table
          columns={this.columns}
          dataSource={relationDataArray}
          rowSelection={rowSelection}
          size="small"
          style={{marginTop:'15px'}} />

      </div>
    );
  }
}

export default Relation;
