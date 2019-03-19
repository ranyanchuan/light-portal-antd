/* eslint-disable import/first */
/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Form, Icon, Input, Button, Avatar } from 'antd';

import styles from './index.less';


@Form.create()

class Login extends React.Component {

  state = {
    openKeys: ['recommend'],
  };


  render() {


    const { getFieldDecorator } = this.props.form;


    return (
      <div className={styles.loginPage}>

        <div className={styles.container}>

          <Form onSubmit={this.handleSubmit} className="login-form">

            <div className={styles.avatar}>
              <Avatar size={120} icon="user" />
            </div>
            <Form.Item>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '手机号或者邮箱' }],
              })(
                <Input
                  size="large"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '密码' }],
              })(
                <Input size="large"
                       prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                       type="password"
                       placeholder="Password"/>,
              )}
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large">登录</Button>
            </Form.Item>


            <div className={styles.aHref}>
              <a className="login-form-forgot" href="">返回首页</a>
              <a className="login-form-forgot" href="">忘记密码</a>
              <a href="">免费注册</a>
            </div>


          </Form>


        </div>

      </div>

    );
  }
}

export default Login;
