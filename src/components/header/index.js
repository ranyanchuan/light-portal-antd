/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import {connect} from 'dva';
import {Icon, Input, Button, Avatar} from 'antd';
import styles from './index.less';


class Header extends React.Component {
  render() {
    return (
      <div className={styles.nav}>
        <div className={styles.left}>
          <div><img src=" img/logo.png" alt="耀眼" className={styles.logo}/></div>
          <div className={styles.hTitle}><a href="/">首页</a></div>
          <div className={styles.hTitle}><a href="/star">明星</a></div>
          <div className={styles.hTitle}><a href="/news">新闻</a></div>
        </div>
        <div className={styles.right}>
          <div className={styles.hTitle}><a href="/people">中文</a></div>
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </div>
      </div>
    );
  }
}

export default Header;
