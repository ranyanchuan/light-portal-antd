/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Form, Input } from 'antd';

@Form.create()

class ConInput extends React.Component {
  render() {
    const { formItemLayout, defValue, disabled, form, required = false, label, id, message, placeholder } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
        <Form.Item
          {...formItemLayout}
          label={label}
        >
          {getFieldDecorator(id, {
            rules: [{ required, message }],
            initialValue: defValue,
          })(
            <Input placeholder={placeholder} disabled={disabled}/>,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ConInput;
