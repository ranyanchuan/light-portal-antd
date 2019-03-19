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

class Nationality extends React.Component {
  render() {
    const { formItemLayout, form } = this.props;
    const { getFieldDecorator } = form;

    const tags = ['中国', '美国', '日本', '法国', '英国', ];
    const children = [];
    children.push(<Option key={uuid()} value="">请选择</Option>);
    for (const item of tags) {
      children.push(<Option key={uuid()} value={item}>{item}</Option>);
    }

    return (
      <div className={styles.organization}>
        <Form.Item
          {...formItemLayout}
          label="国籍"
        >
          {getFieldDecorator('nationality')(
            <Select
              // mode="tags"
              style={{ width: '100%' }}
              placeholder="请选择或输入国籍"
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

export default Nationality;
