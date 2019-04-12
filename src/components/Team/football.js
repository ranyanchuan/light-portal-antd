/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Form, Select } from 'antd';

const Option = Select.Option;

@Form.create()

class BasketballOrg extends React.Component {
  render() {
    const { formItemLayout, form, required = false, defValue, disabled = false } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form.Item
        {...formItemLayout}
        label="球队"
      >
        {getFieldDecorator('team', {
          rules: [{ required, message: '请选择足球队' }],
          initialValue: defValue,
        })(
          <Select
            disabled={disabled}
            mode="tags"
            style={{ width: '100%' }}
            placeholder="请选择足球队"
          >
            <Option value="广州恒大">广州恒大</Option>
            <Option value="北京国安">北京国安</Option>
            <Option value="杭州绿城">杭州绿城</Option>
            <Option value="辽宁宏运"> 辽宁宏运</Option>
            <Option value="陕西人和">陕西人和</Option>
          </Select>,
        )}
      </Form.Item>
    );
  }
}

export default BasketballOrg;
