/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Form,AutoComplete } from 'antd';

import styles from './index.less';

@Form.create()

class City extends React.Component {
  render() {
    const { formItemLayout, form,defValue,disabled=false } = this.props;
    const { getFieldDecorator } = form;

    const dataSource = ['北京', '上海', '广州', '重庆', '贵阳'];

    return (
      <div>
        <Form.Item
          {...formItemLayout}
          label="城市"
        >
          {getFieldDecorator('city',{
            initialValue:defValue || ''
          })(
            <AutoComplete
              disabled={disabled}
              style={{ width: '100%' }}
              dataSource={dataSource}
              filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
            />
          )}
        </Form.Item>
      </div>
    );
  }
}

export default City;
