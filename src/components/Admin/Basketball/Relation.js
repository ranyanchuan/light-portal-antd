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
  };

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  // 打开弹框
  showModal=()=>{
    this.setState({visible:true});
  }

  //  关闭添加信息弹框
  hideModal = () => {
    this.setState({visible:false});
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
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
      {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
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
    const {  form } = this.props;
    const {visible,selectedRowKeys}=this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      type: 'radio',
    };

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
      labelCol: { sm: { span: 4 } },
      wrapperCol: { sm: { span: 19 } },
    };


    const config = {

      name: { rules: [{ required: true, message: '请输入姓名' }] },
      relation: { rules: [{ required: true, message: '请选择关系' }] },
    };


    const fileProps = {
      name: 'file',
      multiple: true,
      action: 'http://127.0.0.1:27000/api/file/add/',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        const status = info.file.status;
        // if (status !== 'uploading') {
        //   console.log(info.file, info.fileList);
        // }
        // if (status === 'done') {
        //   message.success(`${info.file.name} file uploaded successfully.`);
        // } else if (status === 'error') {
        //   message.error(`${info.file.name} file upload failed.`);
        // }
      },
    };


    return (
      <div className={styles.raltionModal}>

        <div className="table-operations">
          <Button onClick={this.showModal}>添加</Button>
          <Button onClick={this.clearFilters}>编辑</Button>
          <Button onClick={this.clearFilters}>详情</Button>
          <Button onClick={this.clearFilters}>删除</Button>
        </div>
        <Modal
          title="查看关系"
          visible={visible}
          onOk={this.handleSubmit}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
          width="760px"
        >
          <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col span={24}>
                    <Form.Item
                      {...formItemLayout}
                      label="名字"
                    >
                      {getFieldDecorator('name_cn', config.name)(
                        <Input placeholder="请输入姓名"/>,
                      )}
                    </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    {...formItemLayout}
                    label="关系"
                  >
                    {getFieldDecorator('relation',config.relation)(
                      <Select
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
                    label="头像"
                    {...formItemLayout}
                  >
                    <div className="dropbox">
                      {getFieldDecorator('dragger', {
                        valuePropName: 'fileList',
                        getValueFromEvent: this.normFile,
                      })(
                        <Upload.Dragger {...fileProps}>
                          <p className="ant-upload-drag-icon" style={{ marginBottom: 25 }}>
                            <Icon type="inbox"/>
                          </p>
                          <p className="ant-upload-text">单击或拖动文件到此区域进行上载</p>
                        </Upload.Dragger>,
                      )}
                    </div>
                  </Form.Item>
                </Col>
              </Row>
          </Form>
        </Modal>


        <Table
          columns={this.columns}
          dataSource={this.data}
          rowSelection={rowSelection}
          size="small"
          style={{marginTop:'15px'}} />

      </div>
    );
  }
}

export default Relation;
