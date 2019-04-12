/* eslint-disable import/first */
/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Button, Input, Layout, Menu, Icon, List } from 'antd';


import Header from 'components/header/';
import Footer from 'components/footer';

import styles from './LayoutAdmin.less';

const { Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;


class LayoutAdmin extends React.Component {


  state = {
    selectKey: this.props.selectKey,
    openKeys: this.props.openKeys,
  };

  // componentDidMount() {
  //   // const { path } = this.props.match;
  //   // const selectKey=path.split("/").pop();
  //   // this.setState({selectKey})
  //   const { openKeys, selectKey } = this.props;
  //   if (this.props.selectKey !== selectKey) {
  //     this.setState({ selectKey,openKeys });
  //   }
  // }
  //
  componentWillMount() {
    // const { path } = this.props.match;
    // const selectKey = [path.split('/').pop()];
    // this.setState({ selectKey });

    const { openKeys, selectKey } = this.props;
    if (this.props.selectKey !== selectKey) {
      this.setState({ selectKey,openKeys });
    }

  }

  //
  // componentWillReceiveProps(nextProps) {
  //   const { openKeys, selectKey } = nextProps;
  //   if (this.props.selectKey !== selectKey) {
  //     this.setState({ selectKey,openKeys });
  //   }
  // }


  onClickMenu = (param) => {
    const { key,keyPath } = param;
    // this.setState({ selectKey: [key],openKeys:[keyPath[1]] });
    this.props.history.push('/admin/' + key);
  };


  render() {

    // const { selectKey } = this.state;
    const { openKeys, selectKey } = this.state;

    console.log('openKeys,selectKey', openKeys, selectKey);

    return (
      <div className={styles.admin}>
        <Layout>
          <div className={styles.header}>
            <Header/>
          </div>
          <Layout className={styles.layout}>
            <div className={styles.leftMenu}>
              <Sider>
                <Menu
                  onClick={this.onClickMenu}
                  style={{ width: 256 }}
                  defaultSelectedKeys={selectKey}
                  defaultOpenKeys={openKeys}
                  mode="inline"
                >
                  <Menu.Item key="news"><Icon type="fire"/>新闻</Menu.Item>
                  <Menu.Item key="scholar"><span className="iconfont icon-zhuanjiaxuezhe"/>学者</Menu.Item>

                  <SubMenu key="player" title={<span><span className="iconfont icon-yundong"/><span>远动员</span></span>}>
                    <Menu.Item key="basketball"><span className="iconfont icon-lanqiu"/>篮球</Menu.Item>
                    <Menu.Item key="football"><span className="iconfont icon-svggeshi-"/>足球</Menu.Item>
                    <Menu.Item key="pingpong"><span className="iconfont icon-PingPong"/>乒乓球</Menu.Item>
                    <Menu.Item key="badminton"><span className="iconfont icon-yumaoqiu"/>羽毛球</Menu.Item>
                    <Menu.Item key="rugby"><span className="iconfont icon-ganlanqiu"/>橄榄球</Menu.Item>
                    <Menu.Item key="tennis"><span className="iconfont icon-wangqiu"/>网球</Menu.Item>
                    <Menu.Item key="volleyball"><span className="iconfont icon-paiqiu"/>排球</Menu.Item>
                    <Menu.Item key="baseball"><span className="iconfont icon-bangqiu"/>棒球</Menu.Item>
                    <Menu.Item key="billiardball"><span className="iconfont icon-taiqiu"/>台球</Menu.Item>
                    <Menu.Item key="swim"><span className="iconfont icon-youyong"/>游泳</Menu.Item>
                    <Menu.Item key="shoot"><span className="iconfont icon-sheji"/>射击</Menu.Item>
                    <Menu.Item key="weightlifting"><span className="iconfont icon-juzhong"/>举重</Menu.Item>
                  </SubMenu>


                  <SubMenu key="artist" title={<span><span className="iconfont icon-yiren"/><span>艺人</span></span>}>
                    <Menu.Item key="film"><span className="iconfont icon-movie_df"/>电影</Menu.Item>
                    <Menu.Item key="music"><span className="iconfont icon-yinyue"/>音乐</Menu.Item>
                    <Menu.Item key="model"><span className="iconfont icon-moteshezhi-"/>模特</Menu.Item>
                  </SubMenu>
                  <SubMenu key="company" title={<span><span className="iconfont icon-qi"/><span>企业</span></span>}>
                    <Menu.Item key="互联网"><span className="iconfont icon-hulianwang"/>互联网</Menu.Item>
                    {/*<Menu.Item key="金融"><span className="iconfont icon-jinrong"/>金融</Menu.Item>*/}
                    {/*<Menu.Item key="智能制造"><span className="iconfont icon-zhinengzhizao"/>智能制造</Menu.Item>*/}
                    {/*<Menu.Item key="土木工程"><span className="iconfont icon-jianzhu"/>土木工程</Menu.Item>*/}
                  </SubMenu>
                </Menu>
              </Sider>
            </div>
            <Content>
              <div className={styles.content}>
                {
                  this.props.children
                }
              </div>
            </Content>
          </Layout>
          <Footer/>
        </Layout>
      </div>
    );
  }
}

export default LayoutAdmin;
