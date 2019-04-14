/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Form, Input } from 'antd';
const { TextArea } = Input;

@Form.create()

class ConTextArea extends React.Component {
  render() {
    const { formItemLayout, defValue, disabled, form, required = false,height=210, label='摘要', id="abstract", message, placeholder } = this.props;
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
            <TextArea style={{ height }} disabled={disabled} placeholder={placeholder}/>,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ConTextArea;
