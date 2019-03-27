import React from 'react';

import {
  Form,
  DatePicker,
  TimePicker,
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
  Avatar, InputNumber
} from 'antd';

import { uuid } from 'utils';
import moment from 'moment';

import styles from './scoreModal.less';

const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
const { TextArea } = Input;
const TabPane = Tabs.TabPane;
const format = 'HH:mm';

@Form.create()
// @connect((state) => ({
//   homePage: state.homePage,
// }))

class ScoreModal extends React.Component {
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
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      fixed: 'left',
      width: 95
    },{
      title: '结果',
      dataIndex: 'result',
      key: 'result',
      width: 50
    },{
      title: '首发',
      dataIndex: 'first_time',
      key: 'first_time',
      width: 50
    },{
      title: '出场时间',
      dataIndex: 'time',
      key: 'time',
      width: 80
    },{
      title: '对手',
      dataIndex: 'opponent',
      key: 'opponent',
      width: 80
    },{
      title: '对手分',
      dataIndex: 'opponent_score',
      key: 'opponent_score',
      width: 60
    },{
      title: '球队分',
      dataIndex: 'team_score',
      key: 'team_score',
      width: 60
    },{
      title: '三分出手',
      dataIndex: 'three_num',
      key: 'three_num',
      width: 80
    },{
      title: '三分命中',
      dataIndex: 'three_point',
      key: 'three_point',
      width: 80
    },{
      title: '两分出手',
      dataIndex: 'two_num',
      key: 'two_num',
      width: 80
    },
    {
      title: '两分命中',
      dataIndex: 'two_point',
      key: 'two_point',
      width: 80
    },{
      title: '罚球出手',
      dataIndex: 'free_num',
      key: 'free_num',
      width: 80
    },{
      title: '罚球命中',
      dataIndex: 'free_point',
      key: 'free_point',
      width: 80
    },{
      title: '前场篮板',
      dataIndex: 'before_rebound',
      key: 'before_rebound',
      width: 80
    },{
      title: '后场篮板',
      dataIndex: 'after_rebound',
      key: 'after_rebound',
      width: 80
    },{
      title: '助攻',
      dataIndex: 'assist',
      key: 'assist',
      width: 50
    },{
      title: '抢断',
      dataIndex: 'steal',
      key: 'steal',
      width: 50
    },
    {
      title: '盖帽',
      dataIndex: 'block_shot',
      key: 'block_shot',
      width: 50
    },
    {
      title: '失误',
      dataIndex: 'turnover',
      key: 'turnover',
      width: 50
    },
    {
      title: '犯规',
      dataIndex: 'foul',
      key: 'foul',
      width: 50
    },
    {
      title: '得分',
      dataIndex: 'score',
      key: 'score',
      fixed: 'right',
      width: 50

    }
    ];

  data = [
    {
    key: '1',
      date: '218-01-02',
      result:'输',
      first_time:'是',
      time: '20:22',
      opponent: '勇士队',
      team_score: 120,
      three_num: 120,
      three_point: 120,
      two_num: 120,
      two_point: 120,
      free_num: 120,
      free_point: 120,
      before_rebound: 120,
      after_rebound: 120,
      opponent_score: 120,
      assist: 120,
      steal: 120,
      block_shot: 120,
      turnover: 120,
      foul: 120,
      score: 120,
  },
    {
      key: '4',
      date: '218-01-02',
      result:'输',
      first_time:'是',
      time: '20:22',
      opponent: '勇士队',
      team_score: 120,
      three_num: 120,
      three_point: 120,
      two_num: 120,
      two_point: 120,
      free_num: 120,
      free_point: 120,
      before_rebound: 120,
      after_rebound: 120,
      opponent_score: 120,
      assist: 120,
      steal: 120,
      block_shot: 120,
      turnover: 120,
      foul: 120,
      score: 120,
    },
    {
      key: '2',
      date: '218-01-02',
      result:'输',
      first_time:'是',
      time: '20:22',
      opponent: '勇士队',
      team_score: 120,
      three_num: 120,
      three_point: 120,
      two_num: 120,
      two_point: 120,
      free_num: 120,
      free_point: 120,
      before_rebound: 120,
      after_rebound: 120,
      opponent_score: 120,
      assist: 120,
      steal: 120,
      block_shot: 120,
      turnover: 120,
      foul: 120,
      score: 120,
    },
    {
      key: '3',
      date: '218-01-02',
      result:'输',
      first_time:'是',
      time: '20:22',
      opponent: '勇士队',
      team_score: 120,
      three_num: 120,
      three_point: 120,
      two_num: 120,
      two_point: 120,
      free_num: 120,
      free_point: 120,
      before_rebound: 120,
      after_rebound: 120,
      opponent_score: 120,
      assist: 120,
      steal: 120,
      block_shot: 120,
      turnover: 120,
      foul: 120,
      score: 120,
    },
  ];



  render() {
    const { form } = this.props;
    const {visible,selectedRowKeys}=this.state;
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

    return (
      <div className={styles.scoreModal}>
        <div className="table-operations">
          <Button onClick={this.showModal}>添加</Button>
          <Button onClick={this.clearFilters}>编辑</Button>
          <Button onClick={this.clearFilters}>详情</Button>
          <Button onClick={this.clearFilters}>删除</Button>
        </div>

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


              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="比赛日期"
                >
                  {getFieldDecorator('date')(
                    <DatePicker  style={{width:'100%'}} placeholder="请选择日期" />,
                  )}
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="胜利"
                >
                  {getFieldDecorator('contest_status',
                    { rules: [{ required:true}] ,
                      initialValue:'是'
                    },

                  )(
                    <Select >
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
                    { rules: [{ required:true}] ,
                      initialValue:'是'
                    },

                  )(
                    <Select >
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
                  {getFieldDecorator('time',{
                    initialValue:moment('00:00', format)
                  })(
                    <TimePicker format={format} style={{width:'100%'}} />,
                  )}
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="对手"
                >
                  {getFieldDecorator('opponent',{
                    rules: [{ required:true}]
                  })(
                    <Input placeholder="请输入对手"/>,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="对手分"
                >
                  {getFieldDecorator('opponent_score',{
                    initialValue:0,
                  })(
                    <InputNumber   min={0} max={200} placeholder="请输入或者选择" style={{width:'100%'}} />,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="球队分"
                >
                  {getFieldDecorator('team_score',{
                    initialValue:0,
                  })(
                    <InputNumber   min={0} max={200} placeholder="请输入或者选择球队分" style={{width:'100%'}} />,
                  )}
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="三分出手"
                >
                  {getFieldDecorator('three_num',{
                    initialValue:0,
                  })(
                    <InputNumber  min={0} max={100} placeholder="请输入或者选择三分出手" style={{width:'100%'}} />,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="三分命中"
                >
                  {getFieldDecorator('three_point',{
                    initialValue:0,
                  })(
                    <InputNumber  min={0} max={100} placeholder="请输入或者选择三分命中" style={{width:'100%'}} />,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="两分出手"
                >
                  {getFieldDecorator('two_num',{
                    initialValue:0,
                  })(
                    <InputNumber   min={0} max={100} placeholder="请输入或者选择两分出手" style={{width:'100%'}} />,

                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="两分命中"
                >
                  {getFieldDecorator('two_point',{
                    initialValue:0,
                  })(
                    <InputNumber min={0} max={100} placeholder="请输入或者选择两分命中" style={{width:'100%'}} />,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="罚球出手"
                >
                  {getFieldDecorator('free_num',{
                    initialValue:0,
                  })(
                    <InputNumber   min={0} max={100} placeholder="请输入或者选择罚球出手" style={{width:'100%'}} />,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="罚球命中"
                >
                  {getFieldDecorator('free_point',{
                    initialValue:0,
                  })(
                    <InputNumber   min={0} max={100} placeholder="请输入或者选择罚球命中" style={{width:'100%'}} />,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="前场篮板"
                >
                  {getFieldDecorator('before_rebound',{
                    initialValue:0,
                  })(
                    <InputNumber   min={0} max={100} placeholder="请输入或者选择前场篮板" style={{width:'100%'}} />,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="后场篮板"
                >
                  {getFieldDecorator('after_rebound',{
                    initialValue:0,
                  })(
                    <InputNumber  min={0} max={100} placeholder="请输入或者选择后场篮板" style={{width:'100%'}} />,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="助攻"
                >
                  {getFieldDecorator('assist',{
                    initialValue:0,
                  })(
                    <InputNumber   min={0} max={100} placeholder="请输入或者选择助攻" style={{width:'100%'}} />,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="抢断"
                >
                  {getFieldDecorator('steal',{
                    initialValue:0,
                  })(
                    <InputNumber   min={0} max={100} placeholder="请输入或者选择抢断" style={{width:'100%'}} />,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="盖帽"
                >
                  {getFieldDecorator('block_shot',{
                    initialValue:0,
                  })(
                    <InputNumber   min={0} max={100} placeholder="请输入或者选择盖帽" style={{width:'100%'}} />,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="失误"
                >
                  {getFieldDecorator('turnover',{
                    initialValue:0,
                  })(
                    <InputNumber   min={0} max={100} placeholder="请输入或者选择失误" style={{width:'100%'}} />,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="犯规"
                >
                  {getFieldDecorator('foul',{
                    initialValue:0,
                  })(
                    <InputNumber   min={0} max={100} placeholder="请输入或者选择犯规" style={{width:'100%'}} />,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...formItemLayout}
                  label="得分"
                >
                  {getFieldDecorator('score',{
                    initialValue:0,
                  })(
                    <InputNumber   min={0} max={150} placeholder="请输入或者选择得分" style={{width:'100%'}} />,

                  )}
                </Form.Item>
              </Col>

            </Row>
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit">保存</Button>
                <Button style={{ marginLeft: 8 }} onClick={this.hideModal}>取消</Button>
              </Col>
            </Row>
          </Form>
        </Modal>


        <Table
          size="small"
          rowSelection={rowSelection}
          columns={this.columns}
          dataSource={this.data}
          className={styles.newsTable}
          style={{ marginTop: '15px' }}
          scroll={{ x: 1700, y: 300 }}
        />
      </div>
    );
  }
}

export default ScoreModal;
