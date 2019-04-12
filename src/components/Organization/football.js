/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, BackTop, Select } from 'antd';
import styles from './basketball.less';

const Option = Select.Option;

@Form.create()

class Organization extends React.Component {
  render() {
    const { formItemLayout, form,required=false,defValue,disabled=false } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div className={styles.organization}>
        <Form.Item
          {...formItemLayout}
          label="组织"
        >
          {getFieldDecorator('organization', {
            rules: [{ required, message: '请选择组织' }],
            initialValue:defValue
          })(
            <Select
              disabled={disabled}
              mode="tags"
              style={{ width: '100%' }}
              placeholder="请选择组织"
            >
              <Option value="中超">中超</Option>
              <Option value="英超">英超</Option>
              <Option value="西甲">西甲</Option>
              <Option value="德甲">德甲</Option>
              <Option value="意甲">意甲</Option>
              <Option value="法甲">法甲</Option>
              <Option value="日职联">日职联</Option>
              <Option value="亚冠杯">亚冠杯</Option>
              <Option value="欧冠杯">欧冠杯</Option>
              <Option value="世界杯">世界杯</Option>
            </Select>,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default Organization;
