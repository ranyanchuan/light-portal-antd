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
    selectKey: 'scholar',
  };

  componentDidMount() {
    // const { path } = this.props.match;
    // const selectKey=path.split("/").pop();
    // this.setState({selectKey})
  }

  componentWillMount(){
    const { path } = this.props.match;
    const selectKey=path.split("/").pop();
    this.setState({selectKey})
  }


  onClickMenu = (param) => {
    const { key } = param;
    // this.setState({ selectKey: key });
    this.props.history.push('/admin/' + key);
  };


  render() {

    const { selectKey } = this.state;



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
                  defaultSelectedKeys={[selectKey]}
                  defaultOpenKeys={['player']}
                  mode="inline"
                >
                  <Menu.Item key="news"><Icon type="fire"/>新闻</Menu.Item>
                  <Menu.Item key="scholar"><span className="iconfont icon-zhuanjiaxuezhe"/>学者</Menu.Item>

                  <SubMenu key="player" title={<span><span className="iconfont icon-yundong"/><span>远动员</span></span>}>
                    <Menu.Item key="basketball"><span className="iconfont icon-lanqiu"/>篮球</Menu.Item>
                    <Menu.Item key="足球"><span className="iconfont icon-svggeshi-"/>足球</Menu.Item>
                    <Menu.Item key="乒乓球"><span className="iconfont icon-PingPong"/>乒乓球</Menu.Item>
                    <Menu.Item key="羽毛球"><span className="iconfont icon-yumaoqiu"/>羽毛球</Menu.Item>
                    <Menu.Item key="橄榄球"><span className="iconfont icon-ganlanqiu"/>橄榄球</Menu.Item>
                    <Menu.Item key="网球"><span className="iconfont icon-wangqiu"/>网球</Menu.Item>
                    <Menu.Item key="田径"><span className="iconfont icon-tianjing"/>田径</Menu.Item>
                    <Menu.Item key="排球"><span className="iconfont icon-paiqiu"/>排球</Menu.Item>
                    <Menu.Item key="棒球"><span className="iconfont icon-bangqiu"/>棒球</Menu.Item>
                    <Menu.Item key="台球"><span className="iconfont icon-taiqiu"/>台球</Menu.Item>
                    <Menu.Item key="游泳"><span className="iconfont icon-youyong"/>游泳</Menu.Item>
                    <Menu.Item key="骑行"><span className="iconfont icon-qixing"/>骑行</Menu.Item>
                    <Menu.Item key="射击"><span className="iconfont icon-sheji"/>射击</Menu.Item>
                    <Menu.Item key="体操"><span className="iconfont icon-ticao"/>体操</Menu.Item>
                    <Menu.Item key="柔道"><span className="iconfont icon-roudao"/>柔道</Menu.Item>
                    <Menu.Item key="举重"><span className="iconfont icon-juzhong"/>举重</Menu.Item>
                    <Menu.Item key="拳道"><span className="iconfont icon-quanji"/>拳道</Menu.Item>
                  </SubMenu>


                  <SubMenu key="artist" title={<span><span className="iconfont icon-yiren"/><span>艺人</span></span>}>
                    <Menu.Item key="电影"><span className="iconfont icon-movie_df"/>电影</Menu.Item>
                    <Menu.Item key="音乐"><span className="iconfont icon-yinyue"/>音乐</Menu.Item>
                    <Menu.Item key="模特"><span className="iconfont icon-moteshezhi-"/>模特</Menu.Item>
                  </SubMenu>
                  <SubMenu key="company" title={<span><span className="iconfont icon-qi"/><span>企业</span></span>}>
                    <Menu.Item key="互联网"><span className="iconfont icon-hulianwang"/>互联网</Menu.Item>
                    <Menu.Item key="金融"><span className="iconfont icon-jinrong"/>金融</Menu.Item>
                    <Menu.Item key="智能制造"><span className="iconfont icon-zhinengzhizao"/>智能制造</Menu.Item>
                    <Menu.Item key="土木工程"><span className="iconfont icon-jianzhu"/>土木工程</Menu.Item>
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
