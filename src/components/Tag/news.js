/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Form, Select } from 'antd';
import { uuid } from 'utils';

import styles from './news.less';
const Option = Select.Option;
@Form.create()

class NewsTag extends React.Component {
  render() {
    const { formItemLayout, form ,defValue,disabled=false} = this.props;
    const { getFieldDecorator } = form;

    const tags = ['划水詹', '帮主', '三旬老汉', ];
    const children = [];
    for (const item of tags) {
      children.push(<Option key={uuid()} value={item}>{item}</Option>);
    }

    return (
      <div className={styles.organization}>
        <Form.Item
          {...formItemLayout}
          label="标签"
        >
          {getFieldDecorator('tags',{
            initialValue:defValue

          })(
            <Select
              disabled={disabled}
              mode="tags"
              style={{ width: '100%' }}
              placeholder="请选择或输入标签"
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

export default NewsTag;
