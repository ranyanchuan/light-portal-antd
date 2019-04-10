/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Form, Select } from 'antd';
import { uuid } from 'utils';

import styles from './index.less';

const Option = Select.Option;


@Form.create()

class Occupation extends React.Component {
  render() {
    const { formItemLayout, form ,defValue,disabled=false} = this.props;
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
      <div className={styles.occupation}>
        <Form.Item
          {...formItemLayout}
          label="领域"
        >
          {getFieldDecorator('occupation',{
            initialValue:defValue

          })(
            <Select
              disabled={disabled}
              mode="tags"
              style={{ width: '100%' }}
              placeholder="请为明星选择兴趣领域"
            >
              {children}
            </Select>,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default Occupation;
