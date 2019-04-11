/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { AutoComplete, Form } from 'antd';

import styles from './index.less';


@Form.create()

class Nationality extends React.Component {
  render() {
    const { formItemLayout, form,defValue,disabled=false } = this.props;
    const { getFieldDecorator } = form;

    const dataSource = ['中国', '美国', '日本', '法国', '英国', ];

    return (
      <div className={styles.organization}>
        <Form.Item
          {...formItemLayout}
          label="国籍"
        >
          {getFieldDecorator('nationality',{
            initialValue:defValue || ''
          })(
            <AutoComplete
              placeholder="请选择国籍"
              style={{ width: '100%' }}
              disabled={disabled}
              dataSource={dataSource}
              filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
            />
          )}
        </Form.Item>
      </div>
    );
  }
}

export default Nationality;
