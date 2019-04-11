import React from 'react';

import { Form, Row, Col, Input, Button } from 'antd';
import Domain from 'components/Domain/scholar';
import Gender from 'components/Gender';
import Nationality from 'components/Nationality';
import City from 'components/City';
import Education from 'components/Education';

import styles from './index.less';


@Form.create()


class SearchScholar extends React.Component {

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
      <div className={styles.searchPannel}>
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
              <Gender formItemLayout={formItemLayout} form={form}/>
            </Col>



            <Col span={8}>
              <City formItemLayout={formItemLayout} form={form}/>
            </Col>

            <Col span={8}>
              <Education formItemLayout={formItemLayout} form={form} />
            </Col>

            <Col span={8}>
              <Domain  formItemLayout={formItemLayout} form={form} />
            </Col>
            <Col span={8}>
              <Nationality formItemLayout={formItemLayout} form={form}/>
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

export default SearchScholar;
