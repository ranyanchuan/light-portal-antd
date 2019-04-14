/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Form, Select } from 'antd';
import { uuid } from 'utils';


const Option = Select.Option;

@Form.create()

class ConSelect extends React.Component {
  render() {
    const { formItemLayout, defValue, disabled, form, required = false, label, id, message, placeholder, data = [], mode } = this.props;
    const { getFieldDecorator } = form;

    const children = [];
    for (const item of data) {
      children.push(<Option key={uuid()} value={item}>{item}</Option>);
    }

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
            <Select placeholder={placeholder}
                    disabled={disabled}
                    mode={mode}
                    style={{ width: '100%' }}
            >
              {children}
            </Select>,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ConSelect;
