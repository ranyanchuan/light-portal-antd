/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Form, Select } from 'antd';
import { uuid } from 'utils';

import styles from './index.less';

const Option = Select.Option;


@Form.create()

class Category extends React.Component {
  render() {
    const { formItemLayout, form, defValue, disabled = false,required=false } = this.props;
    const { getFieldDecorator } = form;

    const tags = [
      { value: 'player', title: '运动员' },
      { value: 'artist', title: '艺人' },
      { value: 'scholar', title: '学者' },
    ];
    const children = [];
    for (const item of tags) {
      children.push(<Option key={uuid()} value={item.value}>{item.title}</Option>);
    }

    return (
      <div className={styles.category}>
        <Form.Item
          {...formItemLayout}
          label="类型"
        >
          {getFieldDecorator('category', {
            initialValue: defValue,
            rules: [{ required, message: '请选择性别' }],

          })(
            <Select
              disabled={disabled}
              mode="tags"
              style={{ width: '100%' }}
              placeholder="请选择类型"
            >
              {children}
            </Select>,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default Category;
