/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, BackTop, Select } from 'antd';
import styles from './basketball.less';

const Option = Select.Option;

@Form.create()

class BasketballPos extends React.Component {
  render() {
    const { formItemLayout, form,required=false } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div className={styles.position}>
        <Form.Item
          {...formItemLayout}
          label="位置"
        >
          {getFieldDecorator('position', {
            rules: [{ required, message: '请选择明星球场位置' }],
          })(
            <Select
              mode="tags"
              style={{ width: '100%' }}
              placeholder="请选择明星球场位置"
              onChange={this.onChangeTags}
            >
              <Option value="前锋">前锋</Option>
              <Option value="后卫">后卫</Option>
              <Option value="中锋">中锋</Option>
            </Select>,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default BasketballPos;
