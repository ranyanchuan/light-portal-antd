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

class City extends React.Component {
  render() {
    const { formItemLayout, form } = this.props;
    const { getFieldDecorator } = form;

    const tags = ['北京', '上海', '广州', '重庆', '贵阳'];
    const children = [];
    for (const item of tags) {
      children.push(<Option key={uuid()} value={item}>{item}</Option>);
    }

    return (
      <div>
        <Form.Item
          {...formItemLayout}
          label="城市"
        >
          {getFieldDecorator('city')(
            <Select
              // mode="tags"
              style={{ width: '100%' }}
              placeholder="请选择或输入城市/省份"
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

export default City;
