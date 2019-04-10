/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { DatePicker, Form } from 'antd';
import moment from 'moment';

import styles from './index.less';

@Form.create()

class DateCon extends React.Component {
  render() {
    const { formItemLayout, form ,defValue,disabled=false,required=false} = this.props;
    const { getFieldDecorator } = form;

    return (
      <div className={styles.dateCon}>
        <Form.Item
          {...formItemLayout}
          label="日期"
        >
          {getFieldDecorator('date', {
            initialValue: defValue ? moment(defValue) : null,
            rules: [{ required, message: '请选择日期' }],

          })(
            <DatePicker placeholder="请选择日期" style={{ width: '100%' }} disabled={disabled}/>,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default DateCon;
