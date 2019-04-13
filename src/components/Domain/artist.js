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
      {value:'actor',title:'演员'},
      {value:'singer',title:'歌手'},
      {value:'host',title:'主持人'},
      {value:'director',title:'导演'},
      {value:'model',title:'模特'},
    ];
    const children = [];
    for (const item of tags) {
      children.push(<Option key={uuid()} value={item.value}>{item.title}</Option>);
    }

    return (
      <div className={styles.domain}>
        <Form.Item
          {...formItemLayout}
          label="职业"
        >
          {getFieldDecorator('domain',{
            initialValue:defValue,
            rules: [{ required, message: '请选择职业' }],

          })(
            <Select
              disabled={disabled}
              mode="tags"
              style={{ width: '100%' }}
              placeholder="请选择职业"
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
