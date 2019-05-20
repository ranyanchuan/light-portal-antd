/* eslint-disable import/first */
/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { connect } from 'dva';
import { Button, Input, Carousel, Form, Icon, Tabs, Badge, Divider, List, Avatar } from 'antd';
import {test} from 'xiaoheizhaodemo';
import styles from './index.less';
import Header from '../components/header/index';
import Footer from '../components/footer/index';
import { AcEditorSany } from 'ac-editor-sany';
import 'ac-editor-sany/dist/index.css';






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


  data = [
    ["", "Ford", "Volvo", "Toyota", "Honda"],
    ["2016", 10, 11, 12, 13],
    ["2017", 20, 11, 14, 13],
    ["2018", 30, 15, 12, 13]
  ];

  saveFunc = () => {
    // doc 为文本编辑器里的html字符串
    // idList 为组件的id,type,direction
    const { doc, idList } = this.child.getHtml2String();
    console.log('文本编辑器内容为', doc, idList);
  };

  fixedDate = [
    {
      field: 'buyer1',
      type: 'text',
      filedType: '文本',
      fieldName: '买方名称',
      data: 'xxxx',
    },
    {
      field: 'salername2',
      type: 'text',
      filedType: '文本',
      fieldName: '卖方名称',
      data: 'xxxx',
    },
    {
      field: 'contractsign3',
      type: 'date',
      fieldName: '合同签订日期',
      filedType: '日期',
      data: '2019-02-20',
    },
    {
      field: 'contractstr4',
      type: 'date',
      fieldName: '合同开始日期',
      filedType: '日期',
      data: '2019-02-20',
    },
    {
      field: 'contractend5',
      type: 'date',
      fieldName: '合同结束日期',
      filedType: '日期',
      data: '2019-02-20',
    },
    {
      field: 'payterm6',
      type: 'select',
      filedType: '下拉',
      fieldName: '付款条件',
      data: '现金支付|||微信支付|||支付宝支付',
      defaultValue: '微信支付',
    },
    {
      field: 'isrebate7',
      type: 'radio',
      filedType: '单选',
      fieldName: '是否返利',
      data: '是|||否',
      defaultValue: '否',
    },
  ]


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
    console.log("xxxxtest",test());

    const defaultData = [
      {
        direction: 'horizontal',
        type: 'select',
        field: 'payterm1',
        data: '微信支付|||支付宝支付|||银行卡支付|||现金支付|||其他支付',
        defaultValue: '银行卡支付',
      },
    ];
    let htmlString = '<div><h1 style="text-align: center;">xxx公司供应商合同</h1><div><div><span>买方名称</span><textarea rows="1" cols="30" id="buyer1" onkeyup="onKeyUpTextArea(\'buyer1\')" style="resize: horizontal;vertical-align: middle;width: 80px;">xxxx</textarea><span>卖方名称</span><textarea rows="1" cols="30" id="salername" onkeyup="onKeyUpTextArea(\'salername\')" style="resize: horizontal;vertical-align: middle;width: 80px;">xxxx</textarea><span>合同签订日期</span><input type="text" id="contractsign" value="2019-03-13" actype="date" style="width: 90px"><span>合同开始日期</span><input type="text" id="contractstr" value="2019-03-13" actype="date" style="width: 90px"><span>合同结束日期</span><input type="text" id="contractend" value="2019-03-13" actype="date" style="width: 90px"><span>付款条件</span><select id="payterm1" class="select ac-select" onchange="onChangeSelect()"><option name="payterm" value="0" selected="">现金支付</option>,<option name="payterm" value="1">微信支付</option>,<option name="payterm" value="2">支付宝支付</option></select></div><br></div><div><br></div><ul><li><div class="form"><div class="row"></div></div></li></ul></div>';





    return (
      <div className={styles.home}>
        <Header/>

        <AcEditorSany
          // 组件id
          editorId="acEditorSanyId"
          // 设置ref属性
          onRef={(ref) => {
            this.child = ref;
          }}
          // 文本框默认值
          htmlString={htmlString}
          defaultData={defaultData} // 替换组件默认值
          // 文本框默认最小高
          height="300px"
          fixedDate={this.fixedDate}
        />

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
