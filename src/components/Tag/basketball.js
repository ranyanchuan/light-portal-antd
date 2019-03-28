/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { connect } from 'dva';
import { Form, Select } from 'antd';
import styles from './basketball.less';

const Option = Select.Option;
import { uuid } from 'utils';


@Form.create()

class BasketballTag extends React.Component {
  render() {
    const { formItemLayout, form ,defValue} = this.props;
    const { getFieldDecorator } = form;

    const tags = ['勒布朗-詹姆斯', 'King James', 'LBJ', '天选之子', 'Lecarry', '勒布朗多', '划水詹', '帮主', '三旬老汉', '天之骄子', '小皇帝', '詹皇', '全能詹', '旧主杀手', '六步朗', '一星四射', '一猩四射'];
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
              mode="tags"
              style={{ width: '100%' }}
              placeholder="请为明星打标签"
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

export default BasketballTag;
