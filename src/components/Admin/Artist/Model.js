import React from 'react';
import moment from 'moment';

import { Form, Button, Modal, Row, Col, Table, Tag } from 'antd';
import ConSelect from 'components/ConSelect';
import ConInput from 'components/ConInput';
import ConDate from 'components/ConDate';
import ConUploadMore from 'components/ConUploadMore';

import { api } from 'utils/config';
import { uuid ,addUidList} from 'utils';

import styles from './index.less';

const ruleDate = 'YYYY-MM-DD';

@Form.create()

class Model extends React.Component {
  state = {
    visible: false,
    status: '',
    fileList: [],
    selectedRowKeys: [], // 选中行key
    selectedRowObj: {}, // 选中行对象
  };


  componentWillReceiveProps(nextProps) {
    const { modelDataObj } = nextProps;
    const { list = [] } = modelDataObj || {};
    if (list.length > 0 && this.props.modelDataObj !== modelDataObj) {
      const { _id, fileList } = list[0];
      this.setState({ selectedRowKeys: [_id], selectedRowObj: list[0], fileList });
    }
  }


  onSelectChange = (selectedRowKeys, selectedRowObjs) => {
    this.setState({ selectedRowKeys, selectedRowObj: selectedRowObjs[0] });
  };

  // 展示弹框
  onShowModal = (status) => {
    const tempState={visible: true, status};
    // 添加状态清空图片
    this.setState(tempState);
  };

  onClickDel = () => {
    const { showDelCon } = this.props;
    const { selectedRowObj } = this.state;
    let payload = { type: 'common/del', _id: selectedRowObj['_id'], table: 'actor' };
    showDelCon(payload);
  };


  // 关闭弹框
  onClickClose = () => {
    this.setState({ visible: false, status: '', fileList: [] });
    this.props.form.resetFields();
  };


  //  提交form信息弹框
  handleSubmit = (e) => {
    // this.props.hideModal();
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      const { status, selectedRowObj, fileList } = this.state;

      if (!err) {

        const { basicRow, onActionTable } = this.props;
        // 添加 封面图片
        fieldsValue.fileList = this.child.getFileList();
        let payload = {};
        // 主表_id
        const { _id } = basicRow;
        // 添加类型
        if (status === 'add') {
          payload = fieldsValue;
          payload.type = 'common/add';
          payload.basicId = _id;
        }
        // 编辑得分
        if (status === 'edit') {
          payload.type = 'common/upd';
          payload.condition = { _id: selectedRowObj['_id'] };
          payload.content = fieldsValue;

        }
        // 添加操作表名
        payload.table = 'model';
        onActionTable(payload);
        this.onClickClose();
      }
    });
  };

  // 修改分页
  onChangePage = (data) => {
    const { getTableData, basicRow } = this.props;
    const { current, pageSize } = data;
    const { _id: basicId } = basicRow;
    const param = { pageIndex: current - 1, size: pageSize, table: 'model', basicId };
    getTableData(param);
  };


  columns = [
    {
      title: '标题',
      key: 'title',
      dataIndex: 'title',
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      render: (text) => {
        return text ? moment(text).format(ruleDate) : '';
      },
    },
    {

      title: '标签',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
        {tags && tags.length > 0 && tags.slice(0, 3).map(tag => <Tag key={uuid()}>{tag}</Tag>)}
        </span>
      ),
    },
    {
      title: '备注',
      key: 'remark',
      dataIndex: 'remark',
    },
    {
      title: '美图',
      dataIndex: 'fileList',
      key: 'fileList',
      render: (fileList) => {
        let result = '';
        if (fileList && Array.isArray(fileList) && fileList.length > 0) {
          result = fileList.map((item) => {
            return <img src={item} alt="美图" key={uuid()} style={{ height: 40, marginRight: 5 }}/>;
          });
        }
        return result;
      },

    },

  ];


  // 标题对象
  titleObj = {
    add: '添加模特作品数据',
    edit: '编辑模特作品数据',
    desc: '查看模特作品数据',
  };


  render() {
    const { form, modelDataObj, basicRow, loading } = this.props;
    const { visible, selectedRowKeys, selectedRowObj, status, } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      type: 'radio',
    };

    const formItemLayout = {
      labelCol: { sm: { span: 6 } },
      wrapperCol: { sm: { span: 16 } },
    };


    const formItemLayoutLine = {
      labelCol: { sm: { span: 3 } },
      wrapperCol: { sm: { span: 20 } },
    };


    const disabled = status === 'desc' ? true : false;
    const modelData = status !== 'add' ? selectedRowObj : {};

    const btnDisable = (modelDataObj.list && modelDataObj.list.length > 0) ? false : true;

    // 添加按钮disabled
    const addBtnDisable = basicRow._id ? false : true;

    return (
      <div>

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
          width="960px"
          okText="确认"
          cancelText="取消"
        >
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col span={12}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="title"
                  label="标题"
                  placeholder="请输入影视作品标题"
                  message='请输入影视作品标题'
                  disabled={disabled}
                  required={true}
                  defValue={modelData.title}
                />
              </Col>
              <Col span={12}>
                <ConDate
                  form={form}
                  formItemLayout={formItemLayout}
                  disabled={disabled}
                  defValue={modelData.date}
                />
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <ConSelect
                  form={form}
                  formItemLayout={formItemLayout}
                  id="tags"
                  label="标签"
                  mode="tags"
                  placeholder="请输入标签"
                  disabled={disabled}
                  data={[]}
                  defValue={modelData.tags}
                />
              </Col>
              <Col span={12}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="remark"
                  label="备注"
                  placeholder="请输入备注"
                  message='请输入备注'
                  disabled={disabled}
                  defValue={modelData.remark}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <ConUploadMore
                  // 设置ref属性
                  onRef={(ref) => {
                    this.child = ref;
                  }}
                  title="上传图片"
                  formItemLayout={formItemLayoutLine}
                  fileList={addUidList(modelData.fileList)}
                  disabled={disabled}
                  label="图片"
                />
              </Col>
            </Row>

          </Form>

        </Modal>
        <Table
          loading={loading}
          rowKey={record => record._id}
          columns={this.columns}
          dataSource={(modelDataObj && modelDataObj.list) ? modelDataObj.list : []}
          size="small"
          rowSelection={rowSelection}
          pagination={{
            current: modelDataObj.pageIndex + 1,
            total: modelDataObj.count,
            pageSize: modelDataObj.size,
          }}
          onChange={this.onChangePage}

        />
      </div>
    );
  }
}

export default Model;
