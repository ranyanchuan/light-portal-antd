/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { connect } from 'dva';


import { Button, Form, Input, Select, Row, Col, Pagination, Avatar } from 'antd';

import styles from './index.less';
import { uuid } from 'utils';


const echarts = require('echarts');
const Option = Select.Option;

@Form.create()

class RelationChart extends React.Component {

  state = {
    loading: true,
  };

  componentDidMount() {
    this.initChart();
  }

  componentWillReceiveProps(nextProps) {
    this.initChart();
  }

  initChart = () => {
    let giftImageUrl = 'http://www.stat-nba.com/image/playerImage/1862.jpg';
    let myChart = echarts.init(document.getElementById('relationChart'));

    let echartData = [
      {
        value: 1,
        name: '凯尔-库兹马',
      }, {
        value: 1,
        name: '布兰顿-英格拉姆',
      }, {
        value: 1,
        name: '贾维尔-麦基',
      }, {
        value: 1,
        name: '朗佐-鲍尔',
      },
      {
        value: 1,
        name: '肯塔维奥斯-卡德维尔-波普',
      }, {
        value: 1,
        name: '拉简-朗多',
      }, {
        value: 1,
        name: '雷吉-巴洛克',
      }, {
        value: 1,
        name: '伊维察-祖巴茨',
      },
      {
        value: 1,
        name: '约什-哈特',
      }, {
        value: 1,
        name: '兰斯-史蒂芬森',
      }, {
        value: 1,
        name: '迈克尔-比斯利',
      }, {
        value: 1,
        name: '乔纳森-威廉姆斯',
      },
      {
        value: 1,
        name: '莫里茨-瓦格纳',
      }, {
        value: 1,
        name: '斯维亚托斯拉夫-米凯卢克',
      }, {
        value: 1,
        name: '马克-穆斯卡拉',
      }, {
        value: 1,
        name: '泰森-钱德勒',
      },
      {
        value: 1,
        name: '亚历克斯-卡鲁索',
      }, {
        value: 1,
        name: '伊萨卡-邦加',
      },
      // 教练
      {
        value: 1,
        name: '保罗-塞拉斯',
      },
      {
        value: 1,
        name: '布兰登·马龙',
      }, {
        value: 1,
        name: '迈克-布朗',
      }, {
        value: 1,
        name: '斯波',
      }, {
        value: 1,
        name: '布拉特',
      },
      {
        value: 1,
        name: '泰伦卢',
      },
      // 朋友 8
      {
        value: 1,
        name: '奥巴马',
      }, {
        value: 1,
        name: '贝克汉姆',
      }, {
        value: 1,
        name: '梅西',
      }, {
        value: 1,
        name: '吴亦凡',
      },
      {
        value: 1,
        name: '梅威瑟',
      }, {
        value: 1,
        name: '莎拉波娃',
      }, {
        value: 1,
        name: '巴菲特',
      }, {
        value: 1,
        name: '罗纳尔多',
      },
      // 儿子 2
      {
        value: 1,
        name: '勒布朗-詹姆斯二世',
      },
      {
        value: 1,
        name: '布莱斯-马克西姆-詹姆斯',
      },
      // 妻子 1
      {
        value: 1,
        name: '萨瓦娜·布林森',
      },


    ];

    let option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      graphic: {
        elements: [{
          type: 'image',
          style: {
            image: giftImageUrl,
            width: 120,
            height: 120,
          },
          left: 'center',
          top: 'center',
        }],
      },
      series: [
        {
          name: '关系',
          type: 'pie',
          radius: ['15%', '50%'],
          label: {
            normal: {
              position: 'inner',
            },
          },

          data: [
            {
              value: 18,
              name: '队友',
            },
            {
              value: 6,
              name: '教练',
            },
            {
              value: 8,
              name: '朋友',
            },
            {
              value: 2,
              name: '儿子',
            },
            {
              value: 1,
              name: '妻子',
            },
          ],
        },

        {
          name: '',
          type: 'pie',
          radius: ['55%', '70%'],
          label: {
            normal: {
              formatter: '{b}',
            },
          },
          data: echartData,
        }],
    };
    myChart.setOption(option);
  };


  render() {


    const rankPlayer = [
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/4569.jpg', 'title': '凯尔-库兹马' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/4472.jpg', 'title': '布兰顿-英格拉姆' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/2426.jpg', 'title': '贾维尔-麦基' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/4568.jpg', 'title': '朗佐-鲍尔' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/4166.jpg', 'title': '肯塔维奥斯-卡德维尔-波普' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/2964.jpg', 'title': '拉简-朗多' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/img_middle_common.jpg', 'title': '雷吉-巴洛克' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/img_middle_common.jpg', 'title': '伊维察-祖巴茨' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/img_middle_common.jpg', 'title': '约什-哈特' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/3203.jpg', 'title': '兰斯-史蒂芬森' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/434.jpg', 'title': '迈克尔-比斯利' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/689.jpg', 'title': '泰森-钱德勒' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/4569.jpg', 'title': '凯尔-库兹马' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/4472.jpg', 'title': '布兰顿-英格拉姆' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/2426.jpg', 'title': '贾维尔-麦基' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/4568.jpg', 'title': '朗佐-鲍尔' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/4166.jpg', 'title': '肯塔维奥斯-卡德维尔-波普' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/2964.jpg', 'title': '拉简-朗多' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/img_middle_common.jpg', 'title': '雷吉-巴洛克' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/img_middle_common.jpg', 'title': '伊维察-祖巴茨' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/img_middle_common.jpg', 'title': '约什-哈特' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/3203.jpg', 'title': '兰斯-史蒂芬森' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/434.jpg', 'title': '迈克尔-比斯利' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/689.jpg', 'title': '泰森-钱德勒' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/4568.jpg', 'title': '朗佐-鲍尔' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/4166.jpg', 'title': '肯塔维奥斯-卡德维尔-波普' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/2964.jpg', 'title': '拉简-朗多' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/img_middle_common.jpg', 'title': '雷吉-巴洛克' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/img_middle_common.jpg', 'title': '伊维察-祖巴茨' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/img_middle_common.jpg', 'title': '约什-哈特' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/3203.jpg', 'title': '兰斯-史蒂芬森' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/434.jpg', 'title': '迈克尔-比斯利' },

    ];

    return (
      <div className={styles.relationChart}>
        <Row>
          <Col md={{ span: 24 }} lg={{ span: 15 }}>
            <div id="relationChart" className={styles.relationContent}></div>
          </Col>
          <Col md={{ span: 24 }} lg={{ span: 9 }} className={styles.person}>
            <div className={styles.rightRelation}>
              <div className={styles.searchTitle}>
                <div className={styles.search}>
                  <Select labelInValue defaultValue={{ key: '队友' }} style={{ width: 120 }}
                          onChange={this.onChangeStar}>
                    <Option value="队友">队友</Option>
                    <Option value="教练">教练</Option>
                    <Option value="朋友">朋友</Option>
                    <Option value="妻子">妻子</Option>
                    <Option value="儿子">儿子</Option>
                  </Select>
                  <div className={styles.inputStyle}>
                    <Input placeholder="詹姆斯"/>
                  </div>
                  <div>
                    <Button type="primary">搜索</Button>
                  </div>
                </div>
              </div>

              <div className={styles.topMan}>
                {rankPlayer && rankPlayer.map((item, index) => {
                  const { avatar, title } = item;
                  return (
                    <div key={uuid()}>
                      <Avatar shape="square" size={64}  src={avatar} />
                      <h5 style={{WebkitBoxOrient: 'vertical'}}><a href="">{title}</a></h5>
                    </div>
                  );
                })}
                <div className={styles.page}>
                  <Pagination defaultCurrent={1} total={50} size="small"/>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default RelationChart;
