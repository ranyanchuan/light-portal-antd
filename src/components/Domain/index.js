/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Form, Select } from 'antd';
import { uuid } from 'utils';

import styles from './index.less';

const Option = Select.Option;


@Form.create()

class Domain extends React.Component {
  render() {
    const { formItemLayout, form ,defValue,disabled=false,required=false} = this.props;
    const { getFieldDecorator } = form;

    const tags = [
      {value:'basketball',title:'篮球'},
      {value:'football',title:'足球'},
      {value:'computer',title:'计算机'},
      {value:'film',title:'电影'},
      ];
    const children = [];
    for (const item of tags) {
      children.push(<Option key={uuid()} value={item.value}>{item.title}</Option>);
    }

    return (
      <div className={styles.domain}>
        <Form.Item
          {...formItemLayout}
          label="领域"
        >
          {getFieldDecorator('domain',{
            initialValue:defValue,
            rules: [{ required, message: '请选择领域' }],

          })(
            <Select
              disabled={disabled}
              mode="tags"
              style={{ width: '100%' }}
              placeholder="请选择兴趣领域"
            >
              {children}
            </Select>,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default Domain;
