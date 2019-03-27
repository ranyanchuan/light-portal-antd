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
    selectKey: 'news',
  };


  onClickMenu=(param)=>{
    console.log('param',param)
    const { key } = param;
    this.setState({ selectKey: key });
    this.props.history.push('/admin/'+key);
  }



  render() {

    const { selectKey } = this.props;

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
                  defaultOpenKeys={['player']}
                  mode="inline"
                >
                  <Menu.Item key="news"><Icon type="fire"/>新闻</Menu.Item>
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


                  <SubMenu key="scholar"
                           title={<span><span className="iconfont icon-zhuanjiaxuezhe"/><span>学者</span></span>}>
                    <Menu.Item key="计算机"><span className="iconfont icon-jisuanji"/>计算机</Menu.Item>
                    <Menu.Item key="生物"><span className="iconfont icon-shengwu"/>生物</Menu.Item>
                    <Menu.Item key="化学"><span className="iconfont icon-chem"/>化学</Menu.Item>
                    <Menu.Item key="物理"><span className="iconfont icon-icon17"/>物理</Menu.Item>
                    <Menu.Item key="机械"><span className="iconfont icon-jiqiren"/>机械</Menu.Item>
                    <Menu.Item key="电子"><span className="iconfont icon-dianzi"/>电子</Menu.Item>
                    <Menu.Item key="自动化"><span className="iconfont icon-zidonghua"/>自动化</Menu.Item>
                    <Menu.Item key="考古"><span className="iconfont icon-kaogufajue"/>考古</Menu.Item>
                    <Menu.Item key="电力"><span className="iconfont icon-dianli"/>电力</Menu.Item>
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
