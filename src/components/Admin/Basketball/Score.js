import React from 'react';

import { connect } from 'dva';

import {
  Form,
  DatePicker,
  TimePicker,
  Input,
  Button,
  Modal,
  Select,
  Row,
  Col,
  Table,
  InputNumber,
} from 'antd';

import moment from 'moment';
import styles from './index.less';

const Option = Select.Option;

const ruleTime = 'HH:mm';
const ruleDate = 'YYYY-MM-DD';

@Form.create()
@connect((state) => ({
  adminBasketball: state.adminBasketball,
  common: state.common,
}))

class ScoreModal extends React.Component {
  state = {
    expand: false,
    visible: false,
    status: '',
    selectedRowKeys: [], // 选中行key
    selectedRowObj: {}, // 选中行对象
  };


  componentWillReceiveProps(nextProps) {
    const { scoreDataObj } = nextProps;
    const { list = [] } = scoreDataObj || {};
    if (list.length > 0) {
      const { _id } = list[0];
      this.setState({ selectedRowKeys: [_id], selectedRowObj: list[0] });
    }
  }

  // 更新选中的数据
  onSelectChange = (selectedRowKeys, selectedRowObjs) => {
    this.setState({ selectedRowKeys, selectedRowObj: selectedRowObjs[0] });
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
    const { selectedRowObj } = this.state;
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      console.log('fieldsValue', fieldsValue);
      if (!err) {

        // 日期格式
        if (fieldsValue.date) {
          fieldsValue.date = moment(fieldsValue.birthday).format(ruleDate);
        }
        // 时间格式
        if (fieldsValue.time) {
          fieldsValue.time = moment(fieldsValue.time).format(ruleTime);
        }

        const { status,selectedRowObj } = this.state;
        const { basicRow,onSave } = this.props;

        let payload = {};
        // 主表id
        const { id } = basicRow;
        // 添加类型
        if (status === 'add') {
          payload=fieldsValue;
          payload.type = 'common/add';
          payload.basicId = id;
        }

        if (status === 'edit') {
          payload.type = 'common/upd';
          payload.condition = { _id: selectedRowObj['_id'] };
          payload.content = fieldsValue;

        }
        // 添加操作表名
        payload.table = 'score';
        onSave(payload);

        this.onClickClose();
      }
    });

  };

  onChangeTags = (value) => {
    console.log(`selected ${value}`);
  };

  columns = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      fixed: 'left',
      width: 110,
      render: (text) => {
        return text ? moment(text).format(ruleDate) : '';
      },
    },
    {
      title: '胜利',
      dataIndex: 'contest_status',
      key: 'contest_status',
      width: 50,
    }, {
      title: '首发',
      dataIndex: 'first_time',
      key: 'first_time',
      width: 50,
    }, {
      title: '出场时间',
      dataIndex: 'time',
      key: 'time',
      width: 80,
    },
    {
      title: '球队',
      dataIndex: 'team',
      key: 'team',
      width: 100,
    },
    {
      title: '对手',
      dataIndex: 'opponent',
      key: 'opponent',
      width: 100,
    }, {
      title: '对手分',
      dataIndex: 'opponent_score',
      key: 'opponent_score',
      width: 60,
    }, {
      title: '球队分',
      dataIndex: 'team_score',
      key: 'team_score',
      width: 60,
    }, {
      title: '三分出手',
      dataIndex: 'three_num',
      key: 'three_num',
      width: 80,
    }, {
      title: '三分命中',
      dataIndex: 'three_point',
      key: 'three_point',
      width: 80,
    }, {
      title: '两分出手',
      dataIndex: 'two_num',
      key: 'two_num',
      width: 80,
    },
    {
      title: '两分命中',
      dataIndex: 'two_point',
      key: 'two_point',
      width: 80,
    }, {
      title: '罚球出手',
      dataIndex: 'free_num',
      key: 'free_num',
      width: 80,
    }, {
      title: '罚球命中',
      dataIndex: 'free_point',
      key: 'free_point',
      width: 80,
    }, {
      title: '前场篮板',
      dataIndex: 'before_rebound',
      key: 'before_rebound',
      width: 80,
    }, {
      title: '后场篮板',
      dataIndex: 'after_rebound',
      key: 'after_rebound',
      width: 80,
    }, {
      title: '助攻',
      dataIndex: 'assist',
      key: 'assist',
      width: 50,
    }, {
      title: '抢断',
      dataIndex: 'steal',
      key: 'steal',
      width: 50,
    },
    {
      title: '盖帽',
      dataIndex: 'block_shot',
      key: 'block_shot',
      width: 50,
    },
    {
      title: '失误',
      dataIndex: 'turnover',
      key: 'turnover',
      width: 50,
    },
    {
      title: '犯规',
      dataIndex: 'foul',
      key: 'foul',
      width: 50,
    },
    {
      title: '得分',
      dataIndex: 'score',
      key: 'score',
      fixed: 'right',
      width: 50,
    },
  ];


  // 标题对象
  titleObj = {
    add: '添加比分数据',
    edit: '编辑比分数据',
    desc: '查看比分数据',
  };

  render() {
    const { form, scoreDataObj } = this.props;


    const { visible, selectedRowKeys, selectedRowObj, status } = this.state;
    const { getFieldDecorator } = form;


    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      type: 'radio',
    };


    const formItemLayout = {
      labelCol: { sm: { span: 8 } },
      wrapperCol: { sm: { span: 16 } },
    };


    const disabled = status === 'desc' ? true : false;
    //  选中的数据
    const scoreData = status !== 'add' ? selectedRowObj : {};


    return (
      <div className={styles.scoreModal}>
        <div className="table-operations">
          <Button onClick={this.onClickAdd}>添加</Button>
          <Button onClick={this.onClickEdit}>编辑</Button>
          <Button onClick={this.onClickDesc}>详情</Button>
          <Button onClick={this.clearFilters}>删除</Button>
        </div>

        <Modal
          title={this.titleObj[status]}
          visible={visible}
          onOk={this.handleSubmit}
          onCancel={this.onClickClose}
          width="1180px"
          okText="确认"
          cancelText="取消"
        >
          <Form
            className={styles.scoreForm}
            onSubmit={this.handleSearch}
          >
            <Row gutter={24}>

              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="比赛日期"
                >
                  {getFieldDecorator('date', {
                    initialValue: scoreData.date ? moment(scoreData.date) : moment(),
                  })(
                    <DatePicker disabled={disabled} style={{ width: '100%' }} placeholder="请选择日期"/>,
                  )}
                </Form.Item>
              </Col>


              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="球队"
                >
                  {getFieldDecorator('team',
                    {
                      rules: [{ required: true }],
                      initialValue: scoreData.team || '',
                    },
                  )(
                    <Input disabled={disabled} placeholder="请输入球队名"/>,
                  )}
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="胜利"
                >
                  {getFieldDecorator('contest_status',
                    {
                      rules: [{ required: true }],
                      initialValue: scoreData.contest_status || '是',
                    },
                  )(
                    <Select disabled={disabled}>
                      <Option value="是">是</Option>
                      <Option value="否">否</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="首发"
                >
                  {getFieldDecorator('first_time',
                    {
                      rules: [{ required: true }],
                      initialValue: scoreData.first_time || '是',
                    },
                  )(
                    <Select disabled={disabled}>
                      <Option value="是">是</Option>
                      <Option value="否">否</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="出场时间"
                >
                  {getFieldDecorator('time', {
                    initialValue: moment('00:00', ruleTime),
                  })(
                    <TimePicker disabled={disabled} format={ruleTime} style={{ width: '100%' }}/>,
                  )}
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="对手"
                >
                  {getFieldDecorator('opponent', {
                    rules: [{ required: true }],
                    initialValue: scoreData.opponent || '',
                  })(
                    <Input disabled={disabled} placeholder="请输入对手"/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="对手分"
                >
                  {getFieldDecorator('opponent_score', {
                    initialValue: scoreData.opponent_score || '0',

                  })(
                    <InputNumber disabled={disabled} min={0} max={200} placeholder="请输入或者选择"
                                 style={{ width: '100%' }}/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="球队分"
                >
                  {getFieldDecorator('team_score', {
                    initialValue: scoreData.team_score || '0',
                  })(
                    <InputNumber disabled={disabled} min={0} max={200} placeholder="请输入或者选择球队分"
                                 style={{ width: '100%' }}/>,
                  )}
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="三分出手"
                >
                  {getFieldDecorator('three_num', {
                    initialValue: scoreData.three_num || '0',

                  })(
                    <InputNumber disabled={disabled} min={0} max={100} placeholder="请输入或者选择三分出手"
                                 style={{ width: '100%' }}/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="三分命中"
                >
                  {getFieldDecorator('three_point', {
                    initialValue: scoreData.three_point || '0',

                  })(
                    <InputNumber disabled={disabled} min={0} max={100} placeholder="请输入或者选择三分命中"
                                 style={{ width: '100%' }}/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="两分出手"
                >
                  {getFieldDecorator('two_num', {
                    initialValue: scoreData.two_num || '0',
                  })(
                    <InputNumber disabled={disabled} min={0} max={100} placeholder="请输入或者选择两分出手"
                                 style={{ width: '100%' }}/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="两分命中"
                >
                  {getFieldDecorator('two_point', {
                    initialValue: scoreData.two_point || '0',
                  })(
                    <InputNumber disabled={disabled} min={0} max={100} placeholder="请输入或者选择两分命中"
                                 style={{ width: '100%' }}/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="罚球出手"
                >
                  {getFieldDecorator('free_num', {
                    initialValue: scoreData.free_num || '0',
                  })(
                    <InputNumber disabled={disabled} min={0} max={100} placeholder="请输入或者选择罚球出手"
                                 style={{ width: '100%' }}/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="罚球命中"
                >
                  {getFieldDecorator('free_point', {
                    initialValue: scoreData.free_point || '0',
                  })(
                    <InputNumber disabled={disabled} min={0} max={100} placeholder="请输入或者选择罚球命中"
                                 style={{ width: '100%' }}/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="前场篮板"
                >
                  {getFieldDecorator('before_rebound', {
                    initialValue: scoreData.before_rebound || '0',
                  })(
                    <InputNumber disabled={disabled} min={0} max={100} placeholder="请输入或者选择前场篮板"
                                 style={{ width: '100%' }}/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="后场篮板"
                >
                  {getFieldDecorator('after_rebound', {
                    initialValue: scoreData.after_rebound || '0',
                  })(
                    <InputNumber disabled={disabled} min={0} max={100} placeholder="请输入或者选择后场篮板"
                                 style={{ width: '100%' }}/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="助攻"
                >
                  {getFieldDecorator('assist', {
                    initialValue: scoreData.assist || '0',
                  })(
                    <InputNumber disabled={disabled} min={0} max={100} placeholder="请输入或者选择助攻"
                                 style={{ width: '100%' }}/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="抢断"
                >
                  {getFieldDecorator('steal', {
                    initialValue: scoreData.steal || '0',
                  })(
                    <InputNumber disabled={disabled} min={0} max={100} placeholder="请输入或者选择抢断"
                                 style={{ width: '100%' }}/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="盖帽"
                >
                  {getFieldDecorator('block_shot', {
                    initialValue: scoreData.block_shot || '0',
                  })(
                    <InputNumber disabled={disabled} min={0} max={100} placeholder="请输入或者选择盖帽"
                                 style={{ width: '100%' }}/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="失误"
                >
                  {getFieldDecorator('turnover', {
                    initialValue: scoreData.turnover || '0',

                  })(
                    <InputNumber disabled={disabled} min={0} max={100} placeholder="请输入或者选择失误"
                                 style={{ width: '100%' }}/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="犯规"
                >
                  {getFieldDecorator('foul', {
                    initialValue: scoreData.foul || '0',
                  })(
                    <InputNumber disabled={disabled} min={0} max={100} placeholder="请输入或者选择犯规"
                                 style={{ width: '100%' }}/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="得分"
                >
                  {getFieldDecorator('score', {
                    initialValue: scoreData.score || '0',
                  })(
                    <InputNumber disabled={disabled} min={0} max={150} placeholder="请输入或者选择得分"
                                 style={{ width: '100%' }}/>,
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>


        <Table
          size="small"
          rowKey={record => record._id}
          rowSelection={rowSelection}
          columns={this.columns}
          dataSource={(scoreDataObj && scoreDataObj.list) ? scoreDataObj.list : []}
          scroll={{ x: 1700, y: 300 }}
        />
      </div>
    );
  }
}

export default ScoreModal;
