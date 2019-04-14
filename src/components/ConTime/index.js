/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Form, TimePicker } from 'antd';
import moment from 'moment';

const ruleTime = 'HH:mm';

@Form.create()

class ConTime extends React.Component {
  render() {
    const { formItemLayout, defValue, disabled, form, required = false, label="时间", id="time", message = '请选择时间', placeholder="请选择时间" } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
        <Form.Item
          {...formItemLayout}
          label={label}
        >
          {getFieldDecorator(id, {
            initialValue: defValue ? moment(defValue) : null,
            rules: [{ required, message }],
          })(
            <TimePicker placeholder={placeholder} disabled={disabled} format={ruleTime} style={{ width: '100%' }}/>,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ConTime;
