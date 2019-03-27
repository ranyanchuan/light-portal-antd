import React from 'react';

import {
  Form, Row, Col, Input, Button, Icon, Select,
} from 'antd';
import Organization from 'components/Organization/basketball';
import Team from 'components/Team/basketball';
import Gender from 'components/Gender';
import Nationality from 'components/Nationality';
import City from 'components/City';



import styles from './index.less';


@Form.create()
// @connect((state) => ({
//   homePage: state.homePage,
// }))

class SearchBasketball extends React.Component {
  state = {
    expand: false,
  };

  // To generate mock Form.Item
  getFields() {
    const count = this.state.expand ? 10 : 6;
    const { getFieldDecorator } = this.props.form;
    const children = [];
    for (let i = 0; i < 10; i++) {
      children.push(
        <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
          <Form.Item label={`Field ${i}`}>
            {getFieldDecorator(`field-${i}`, {
              rules: [{
                required: true,
                message: 'Input something!',
              }],
            })(
              <Input placeholder="placeholder"/>,
            )}
          </Form.Item>
        </Col>,
      );
    }
    return children;
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };



  render() {
    const {form}=this.props;
    const formItemLayout = {
      labelCol: { sm: { span: 4 } },
      wrapperCol: { sm: { span: 19 } },
    };
    const { getFieldDecorator } =form;
    return (
      <div className={styles.basketballSearch}>
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSearch}
        >
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                {...formItemLayout}
                label="名字"
              >
                {getFieldDecorator('name_cn')(
                  <Input placeholder="请输入中文姓名"/>,
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Gender formItemLayout={formItemLayout} form={form} />
            </Col>
            <Col span={8}>
              <City formItemLayout={formItemLayout}  form={form}/>
            </Col>

            <Col span={8}>
              <Organization
                formItemLayout={formItemLayout}
                form={form}
              />
            </Col>

            <Col span={8}>
              <Team
                formItemLayout={formItemLayout}
                form={form}
              />
            </Col>
            <Col span={8}>
              <Nationality formItemLayout={formItemLayout}  form={form}/>
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

export default SearchBasketball;
