/* eslint-disable import/first */
/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { connect } from 'dva';
import { Button, Input, Carousel, Form, Icon, Tabs, Badge, Divider, List, Avatar } from 'antd';
import styles from './index.less';
// import Header from '../components/header/index';
import Footer from '../components/footer/index';
import {uuid} from 'chuan-npm-test';

const { TabPane } = Tabs;
// const stars = [
//   { name: '勒布朗-詹姆斯' },
//   { name: '安东尼-戴维斯' },
//   { name: '拉塞尔-威斯布鲁克' },
//   { name: '凯文-杜兰特' },
//   { name: '詹姆斯-哈登' },
//   { name: '约翰-沃尔' },
//   { name: '扬尼斯-阿德托昆博' },
//   { name: '斯蒂芬-库里' },
//   { name: 'C.J.迈克鲁姆' },
//   { name: '安东尼-戴维斯' },
// ];

@Form.create()
@connect((state) => ({
  homePage: state.homePage,
}))


class Home extends React.Component {

  state = {
    stars: [],
  };


  componentDidMount() {
    console.log('--xxx--');
    this.getStarData();
  }

  /**
   * 获取最热球星
   */
  getStarData = () => {
    const gql = `
        query {
               list(category:"basketball"){
                 id:_id,
                 name,
                 name_cn,
               }
             }
        `;
    this.props.dispatch({
      type: 'homePage/getStar',
      payload: { gql, category: 'basketball' },
      callback: (response) => {
        const { data } = response;
        const { list } = data;
        this.setState({ stars: list });
      },
    });
  };


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const operations = <a className={styles.tabMore}>更多</a>;

    const data = [
      {
        title: 'Ant Design Title 1',
      },
      {
        title: 'Ant Design Title 2',
      },
      {
        title: 'Ant Design Title 3',
      },
    ];
    const { stars } = this.state;
    console.log("xxxx",uuid());



    return (
      <div className={styles.home}>
        <Header/>
        <div className={styles.aim}>
          <div>Data</div>
          <div>▪</div>
          <div>Knowledge</div>
          <div>▪</div>
          <div>Intelligence</div>
          <div>▪</div>
          <div>Decision</div>
        </div>
        <div className={styles.searchTitle}>
          <div className={styles.search}>
            <div className={styles.inputStyle}>
              <Input placeholder="詹姆斯" size="large"/>
            </div>
            <div>
              <Button type="primary" size="large">搜索</Button>
            </div>
          </div>
        </div>
        <div className={styles.star}>
          <div className={styles.bar}>
            {stars.map((item, index) => {
              return (
                <a href={'/starDesc/basketball/' + item.id} key={index.toString()}
                   className={styles.starName}>{item.name},</a>
              );
            })}
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.new}>
            <Carousel autoplay>
              <div><img src="http://img1.gtimg.com/chinanba/pics/hv1/244/232/2290/148966654.jpg" alt=""/>
              </div>
              <div><img src="http://img1.gtimg.com/chinanba/pics/hv1/241/232/2290/148966651.jpg" alt=""/>
              </div>
              <div><img src="http://img1.gtimg.com/chinanba/pics/hv1/243/232/2290/148966653.jpg" alt=""/>
              </div>
              <div><img src="http://img1.gtimg.com/chinanba/pics/hv1/236/232/2290/148966646.jpg" alt=""/>
              </div>
            </Carousel>
          </div>
          <div className={styles.infos}>
            <Tabs tabBarExtraContent={operations}>
              <TabPane tab="头条新闻" key="1">
                <List
                  className={styles.listNew}
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar
                          src="http://img1.gtimg.com/chinanba/pics/hv1/103/231/2290/148966258.jpg"
                        />}
                        title={<a href="https://ant.design">{item.title}</a>}
                        description="Ant Design, a design language for background applications, a design language for background applications is refined by Ant UED Team"
                      />
                    </List.Item>
                  )}
                />
                <div style={{ textAlign: 'center' }}>
                  <Button size="small">查看更多</Button>
                </div>
              </TabPane>
              <TabPane tab="数据挖掘" key="2">
                <div className={styles.common}>
                  <div className={styles.commonItem}>
                    <Badge dot>
                      <Icon type="notification"/>
                    </Badge>
                    <a href="olympic/games">百年奥运项目全览</a>
                  </div>

                  <div className={styles.commonItem}>
                    <Badge dot>
                      <Icon type="team"/>
                    </Badge>
                    <a href="distribution/athlete/china">全国运动员分布</a>
                  </div>


                  <div className={styles.commonItem}>
                    <Badge dot>
                      <Icon type="team"/>
                    </Badge>
                    <a href="distribution/athlete/world">全球运动员分布</a>
                  </div>

                  <div className={styles.commonItem}>
                    <Icon type="file-text"/>
                    <a href="dataMining/AIHistory">人工智能历史 </a>
                  </div>
                  <div className={styles.commonItem}>
                    <Icon type="file-text"/>
                    <a href="dataMining/CSRankings">CSRankings全球计算机科学权威榜单</a>
                  </div>
                  <div className={styles.commonItem}>
                    <Icon type="file-text"/>
                    <a href="">AI and Communication </a>
                  </div>
                  <div className={styles.commonItem}>
                    <Icon type="file-text"/>
                    <a href="">AI and Communication </a>
                  </div>
                  <div className={styles.commonItem}>
                    <Icon type="file-text"/>
                    <a href="">AI and Communication </a>
                  </div>
                  <div className={styles.commonItem}>
                    <Icon type="file-text"/>
                    <a href="">AI and Communication </a>
                  </div>
                  <div className={styles.commonItem}>
                    <Icon type="file-text"/>
                    <a href="">AI and Communication </a>
                  </div>
                  <div className={styles.commonItem}>
                    <Icon type="file-text"/>
                    <a href="">AI and Communication </a>
                  </div>
                  <div className={styles.commonItem}>
                    <Icon type="file-text"/>
                    <a href="">AI and Communication </a>
                  </div>
                  <div className={styles.commonItem}>
                    <Icon type="file-text"/>
                    <a href="">AI and Communication </a>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="体育排名" key="3">
                {/*https://china.nba.com/articles/licensee_widget_standings.html*/}
                <iframe src="//china.nba.com/articles/licensee_widget_standings.html" frameBorder="0" scrolling="yes"
                        className={styles.rank}></iframe>
              </TabPane>
            </Tabs>
          </div>
        </div>

        <div className={styles.dataKing}>
          <iframe id="index-sched" src="//china.nba.com/articles/licensee_widget_leaders.html"
                  frameBorder="0" scrolling="no" className={styles.dataKingIframe}></iframe>
        </div>


        <div className={styles.statistics}>
          <div className={styles.container}>
            <div>
              <div>
                <span className={styles.number}>2.6 </span>
                <span className={styles.unit}>亿</span>
                <Divider className={styles.divider} type="vertical"/>
              </div>
              <div className={styles.titleName}>体育达人</div>
            </div>
            <div>
              <div>
                <span className={styles.number}>8.6 </span>
                <span className={styles.unit}>亿</span>
                <Divider className={styles.divider} type="vertical"/>
              </div>
              <div className={styles.titleName}>新闻资讯</div>
            </div>
            <div>
              <div>
                <span className={styles.number}>200 </span>
                <span className={styles.unit}>国家</span>
                <Divider className={styles.divider} type="vertical"/>
              </div>
              <div className={styles.titleName}>全球覆盖</div>
            </div>
            <div>
              <div>
                <span className={styles.number}>11.5 </span>
                <span className={styles.unit}>亿</span>
              </div>
              <div className={styles.titleName}>年度访问</div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Home;
