/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { connect } from 'dva';
import { Form, Select } from 'antd';

const Option = Select.Option;
import { uuid } from 'utils';


@Form.create()

class BasketballShirt extends React.Component {
  render() {
    const { formItemLayout, form ,defValue,disabled=false} = this.props;
    const { getFieldDecorator } = form;

    const children = [];
    children.push(<Option key={uuid()} value={'00号'}>00号</Option>);
    for (let i=0;i<100;i+=1) {
      children.push(<Option key={uuid()} value={i.toString()+'号'}>{i+"号"}</Option>);
    }

    return (
      <div>
        <Form.Item
          {...formItemLayout}
          label="球衣"
        >
          {getFieldDecorator('polo_shirts',{
            initialValue:defValue
          })(
            <Select
              mode="tags"
              disabled={disabled}
              style={{ width: '100%' }}
              placeholder="请为选择球衣"
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

export default BasketballShirt;
