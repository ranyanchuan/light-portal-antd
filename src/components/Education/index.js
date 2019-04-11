/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Form, Select } from 'antd';

const Option = Select.Option;

@Form.create()

class Education extends React.Component {
  render() {
    const { formItemLayout, defValue,disabled, form, required = false } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
        <Form.Item
          {...formItemLayout}
          label="学历"
        >
          {getFieldDecorator('education',

            {
              rules: [{ required, message: '请选择学历' }],
              initialValue: defValue,
            },
          )(
            <Select placeholder="请选择学历" disabled={disabled}>
              <Option value="初中">初中</Option>
              <Option value="高中">高中</Option>
              <Option value="高中">专科</Option>
              <Option value="本科">本科</Option>
              <Option value="研究生">研究生</Option>
              <Option value="博士生">博士生</Option>
            </Select>,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default Education;
