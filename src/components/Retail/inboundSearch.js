import React from 'react';

import { Form, Row, Col, Input, Button } from 'antd';
import ConSelect from 'components/ConSelect';
import ConDate from 'components/ConDate';
import ConInputNumber from 'components/ConInputNumber';
import ConInput from 'components/ConInput';
import ConTextArea from 'components/ConTextArea';
import ConAutoSelect from 'components/ConAutoSelect';


import styles from './index.less';



@Form.create()


class InboundSearch extends React.Component {

  componentDidMount() {
    // 在父组件上绑定子组件方法
    this.props.onRef(this);
  }


  handleSearch = (e) => {
    e.preventDefault();
    const param = this.getSearchValue();
    this.props.onSearch(param);
  };


  // 获取表单内容
  getSearchValue = () => {
    const param = {};
    this.props.form.validateFields((err, values) => {
      for (const key in values) {
        if (values[key] && Array.isArray(values[key]) && values[key].length === 0) {
          break;
        }

        if (values[key]) {
          param[key] = values[key];
        }
      }
    });
    return param;
  };


  handleReset = () => {
    this.props.form.resetFields();
  };


  render() {
    const { form } = this.props;
    const formItemLayout = {
      labelCol: { sm: { span: 4 } },
      wrapperCol: { sm: { span: 19 } },
    };
    const { getFieldDecorator } = form;
    return (
      <div className={styles.retailSearch}>
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSearch}
        >
          <Row gutter={24}>

            <Col span={8}>
              <ConAutoSelect
                form={form}
                formItemLayout={formItemLayout}
                id="domain"
                label="种类"
                placeholder="请选择种类"
                data={["电视机",'洗衣机','冰箱']}
              />
            </Col>


            <Col span={8}>
              <ConInput
                form={form}
                formItemLayout={formItemLayout}
                id="code"
                label="编号"
                placeholder="请输入编号"
              />
            </Col>

            <Col span={8}>
              <ConInput
                form={form}
                formItemLayout={formItemLayout}
                id="name"
                label="名称"
                placeholder="请输入名称"
              />
            </Col>


            <Col span={8}>
              <ConAutoSelect
                form={form}
                formItemLayout={formItemLayout}
                id="brand"
                label="品牌"
                placeholder="请输入品牌"
                data={["TCL",'九阳','火焰山']}
              />
            </Col>



            <Col span={8}>
              <ConDate
                id="date"
                label="入库日期"
                placeholder="请选择入库日期"
                form={form}
                formItemLayout={formItemLayout}
              />
            </Col>

            <Col span={8}>
              <ConAutoSelect
                id="source"
                label="来源"
                placeholder="请输入进货地址"
                form={form}
                formItemLayout={formItemLayout}
                data={["沿河",'遵义','重庆']}
              />
            </Col>

          </Row>


          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>清空</Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default InboundSearch;
