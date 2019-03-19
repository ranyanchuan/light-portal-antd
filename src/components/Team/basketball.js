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
          label="球队"
        >
          {getFieldDecorator('team', {
            rules: [{ required, message: '请选择篮球队' }],
          })(
            <Select
              mode="tags"
              style={{ width: '100%' }}
              placeholder="请选择篮球队"
              onChange={this.onChangeTags}
            >
              <Option value="勇士">勇士</Option>
              <Option value="湖人">湖人</Option>
            </Select>,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default BasketballOrg;
