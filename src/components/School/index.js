/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { connect } from 'dva';
import { Form, Select } from 'antd';
import { uuid } from 'utils';

import styles from './index.less';

const Option = Select.Option;


@Form.create()

class School extends React.Component {
  render() {
    const { formItemLayout, form } = this.props;
    const { getFieldDecorator } = form;

    const tags = ['清华大学', '北京大学', '北京体育大学', '剑桥大学', '哈佛大学', ];
    const children = [];
    for (const item of tags) {
      children.push(<Option key={uuid()} value={item}>{item}</Option>);
    }

    return (
      <div className={styles.organization}>
        <Form.Item
          {...formItemLayout}
          label="学校"
        >
          {getFieldDecorator('school')(
            <Select
              mode="tags"
              style={{ width: '100%' }}
              placeholder="请选择或输入学校"
              onChange={this.onChangeTags}
            >
              {children}
            </Select>,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default School;
