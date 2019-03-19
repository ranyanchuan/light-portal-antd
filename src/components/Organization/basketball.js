/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, BackTop, Select } from 'antd';
import styles from './basketball.less';

const Option = Select.Option;

@Form.create()

class BasketballOrg extends React.Component {
  render() {
    const { formItemLayout, form,required=false } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div className={styles.organization}>
        <Form.Item
          {...formItemLayout}
          label="组织"
        >
          {getFieldDecorator('organization', {
            rules: [{ required, message: '请选择组织' }],
          })(
            <Select
              mode="tags"
              style={{ width: '100%' }}
              placeholder="请选择组织"
              onChange={this.onChangeTags}
            >
              <Option value="NBA">NBA</Option>
              <Option value="CBA">CBA</Option>
            </Select>,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default BasketballOrg;
