/* eslint-disable import/first */
/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Layout, Menu, Row, Col, List, Avatar, Icon } from 'antd';


import Header from 'components/header';
import Footer from 'components/footer';
import styles from './index.less';

const { Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;


class NewDesc extends React.Component {

  state = {
    openKeys: ['recommend'],
  };


  render() {


    const data = [
      {
        title: '领先25分险被翻盘 欧文：没能持续给对手施压',
        cover: 'http://img1.gtimg.com/chinanba/pics/hv1/189/103/2306/149974104.jpg',
      },
      {
        title: '比尔爆砍40分康利28+12 奇才主场险胜灰熊',
        cover: 'http://img1.gtimg.com/chinanba/pics/hv1/250/102/2306/149973910.jpg',
      },
      {
        title: '英格拉姆已成功接受右臂手术 曝不会复发',
        cover: 'http://img1.gtimg.com/nbatop/pics/hv1/83/102/2306/149973743.jpg',
      },
      {
        title: '生涯最强战！兰德尔兽魂觉醒残暴掠取45分',
        cover: 'http://img1.gtimg.com/chinanba/pics/hv1/232/99/2306/149973127.jpg',
      }, {
        title: '本周观察五件事：火箭队暗度陈仓',
        cover: 'http://img1.gtimg.com/chinanba/pics/hv1/77/102/2306/149973737.jpg',
      }, {
        title: '坎特：斯托茨是最好教练 开拓者有赢球文化',
        cover: 'http://img1.gtimg.com/chinanba/pics/hv1/94/98/2306/149972734.jpg',
      }, {
        title: 'MVP榜：字母哥继续领跑 前五位置不变',
        cover: 'http://img1.gtimg.com/chinanba/pics/hv1/76/98/2306/149972716.jpg',
      }, {
        title: '英格拉姆已成功接受右臂手术 曝不会复发',
        cover: 'http://img1.gtimg.com/nbatop/pics/hv1/83/102/2306/149973743.jpg',
      },

    ];

    return (
      <div className={styles.newDesc}>
        <Header/>
        <div className={styles.content}>

          <Row>
            <Col span={18}>
              <div className={styles.leftContent}>

                <h1>生涯最强战！兰德尔兽魂觉醒残暴掠取45分</h1>
                <div className={styles.iconTitle}>

                  <span className={styles.aIcon}>
                    <Icon type="calendar"/>
                  </span>
                  <span>2019-03-15</span>
                  <i className={styles.hLine}>|</i>

                  <span className={styles.aIcon}>
                    <Icon type="eye"/>
                  </span>
                  <span>10000+</span>
                  <i className={styles.hLine}>|</i>

                  <span className={styles.aIcon}>
                   <Icon type="message"/>
                  </span>
                  <span>500</span>
                  <i className={styles.hLine}>|</i>


                  <span className={styles.aIcon}>
                    <Icon type="like"/>
                  </span>

                  <span>500</span>
                  <i className={styles.hLine}>|</i>


                  <span className={styles.aIcon}>
                    <Icon type="dislike"/>
                  </span>

                  <span>20</span>

                </div>
                <div className={styles.editorContent}>
                  <p>北京时间3月16日，新奥尔良鹈鹕坐镇主场迎战波特兰开拓者。</p>
                  <p>鹈鹕先前已遭遇四连败，此役面对波特兰双枪的上门挑战，安排戴维斯轮休的鹈鹕要想止住连败颓势绝非易事。遇此困境，兰德尔阵前迎战单骑杀出，在主场球迷面前抖擞神威打出生涯代表作。</p>
                  <p>兰德尔开局迅速逞露威势，启动突破连凿禁区信手取分，视开拓者的禁区防线如无物。而在迫使开拓者收紧防线压缩空间后，兰德尔又切换进攻模式，落位弧顶搭弓射箭远投中靶，令开拓者徒呼奈何。手感滚烫的兰德尔此后施展出十八般武艺，转身抛射得手，强突上篮打进，急停跳投命中，连秀操作凿穿防线。首节战罢，兰德尔12投9中狂砍21分，创生涯单节得分新高，并由此为鹈鹕博得领先优势。</p>
                  <p>伴随着比赛的进行，开拓者倾尽内线之力对兰德尔的压迫性防守逐渐奏效，兰德尔里突外投均无功而返。眼见开拓者加固防线，兰德尔索性避其锋芒，通过拼抢篮板与巧施妙传为球队制造贡献，帮助球队勉力保持微弱的领先优势。</p>
                  <p>可开拓者的火力毕竟非同小可，他们在易边再战后迅速逆改战局，鹈鹕被动挨打局势不妙。值此之际，兰德尔再度挺身而出，连续强打内线完成得分，避免鹈鹕就此崩盘。</p>
                  <p>在末节鏖战中，如同神兵天降的兰德尔更是勇不可当，这头残暴饿兽疯狂撕咬着开拓者的禁区防线，从内线围剿中突围而出，匪夷所思地把球不断送进篮筐，其威勇之势令开拓者也为之颤栗。</p>
                  <p>但可惜单骑骁勇难挽败局，杀得兴起的兰德尔还是难以帮助鹈鹕止住败势。伴随着终场哨声吹响，鹈鹕主场以110-122不敌开拓者，吞下五连败。</p>
                  <p>兰德尔全场狂砍45分创生涯新高，另有11篮板6助攻2抢断3盖帽进账，填满数据栏。尽管此役饮恨，但是兰德尔的统治级表现仍然堪称惊艳，这场战役也注定将在他的生涯履历上熠熠生辉。</p>
                </div>

              </div>
            </Col>

            <Col span={6}>
              <div className={styles.rightContent}>
                <h2>热点新闻</h2>
                <div className={styles.hot}>
                  <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<img src={item.cover}/>}
                          title={<a href="#" className={styles.title}
                                    style={{ WebkitBoxOrient: 'vertical' }}>{item.title}</a>}
                        />
                      </List.Item>
                    )}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div style={{ backgroundColor: '#fff' }}>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default NewDesc;
