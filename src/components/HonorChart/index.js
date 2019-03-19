/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { connect } from 'dva';
import cupUrl from 'assets/img/cup.png';


import { Button, Form, Input, Select, Row, Col, Pagination, Icon } from 'antd';

import styles from './index.less';
import { uuid } from 'utils';


const echarts = require('echarts');
const Option = Select.Option;

@Form.create()

class HonorChart extends React.Component {

  state = {
    loading: true,
  };

  componentDidMount() {
    let myChart = echarts.init(document.getElementById('relationChart'));
    let giftImageUrl = cupUrl;
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
            width: 100,
            height: 100,
          },
          left: 'center',
          top: 'center',
        }],
      },
      title: {
        text: '55 项',
        subtext: '所获荣誉',
        left: 'center',
        top: '55%',
        padding: [24, 0],
        textStyle: {
          color: '#f2db19',
          fontSize: 40,
          align: 'center',
        },
        subtextStyle: {
          color: 'rgba(255,255,255,.45)',
          fontSize: 16,
          fontWeight: 'normal',
        },
      },
      legend: {
        orient: 'horizontal',
        icon: 'circle',
        top: 20,
        x: 'center',
        data: ['2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012'],
        textStyle: {
          color: '#fff',
        },
      },
      series: [
        {
          name: '人员类型',
          type: 'pie',
          hoverAnimation: false,
          legendHoverLink: false,
          radius: ['38%', '45%'],
          color: ['#006495', '#1D5F84', '#255C6D', '#3C5C67', '#40486C', '#3F3C73', '#403D84', '#1F3A8D', '#0B3B77'],
          label: {
            normal: {
              position: 'inner',
            },
          },
          labelLine: {
            normal: {
              show: false,
            },

          },
          tooltip: {
            show: false,


          },

          data: [
            {
              value: 100,
              name: '',
            },
          ],
        },
        {
          name: '人员类型',
          type: 'pie',
          radius: ['43%', '55%'],
          color: ['#00FFFF', '#44EAB1', '#7BDD43', '#FEBE12', '#EBEC2F', '#FF7C44', '#FA3E5F', '#6635EF', '#FFAFDA'],
          labelLine: {
            normal: {
              show: true,
              length: 20,
              length2: 20,
              lineStyle: {
                width: 2,
              },
            },
          },
          label: {
            normal: {
              formatter: '{c|{b}年}\n{hr|}\n{d|{c}项} {d|{d}%}',
              rich: {
                b: {
                  fontSize: 20,
                  color: '#12EABE',
                  align: 'left',
                  padding: 4,
                },
                hr: {
                  borderColor: '#12EABE',
                  width: '100%',
                  borderWidth: 2,
                  height: 0,
                },
                d: {
                  fontSize: 16,
                  // color: '#fff',
                  align: 'left',
                  padding: 4,
                },
                c: {
                  fontSize: 22,
                  color: '#fff',
                  align: 'center',
                  padding: 4,
                },
              },
            },
          },
          data: [
            {
              value: 3,
              name: '2004',
            },
            {
              value: 5,
              name: '2005',
            },
            {
              value: 3,
              name: '2006',
            },
            {
              value: 5,
              name: '2007',
            },
            {
              value: 7,
              name: '2008',
            },
            {
              value: 9,
              name: '2009',
            },
            {
              value: 6,
              name: '2010',
            },
            {
              value: 8,
              name: '2011',
            },
            {
              value: 11,
              name: '2012',
            },
          ],
        },
      ],
    };
    myChart.setOption(option);
  }

  render() {

    const rankPlayer = [
      { 'title': '04-05赛季全明星首发' },
      { 'title': '04-05赛季最佳阵容第2阵' },
      { 'title': '2004年11月月最佳球员(POM)' },
      { 'title': '05-06赛季全明星最有价值球员(AMVP)' },
      { 'title': '05-06赛季最佳阵容第1阵' },
      { 'title': '2005年01月月最佳球员(POM)' },
      { 'title': '2005年11月月最佳球员(POM)' },

      { 'title': '06-07赛季全明星首发' },
      { 'title': '06-07赛季最佳阵容第2阵' },
      { 'title': '2006年03月月最佳球员(POM)' },


      { 'title': '07-08赛季全明星最有价值球员(AMVP)' },
      { 'title': '07-08赛季全明星首发' },
      { 'title': '07-08赛季最佳阵容第1阵' },
      { 'title': '2007年03月月最佳球员(POM)' },

      // { 'title': '08-09赛季全明星首发' },
      // { 'title': '08-09赛季最佳阵容第1阵' },

    ];

    return (
      <div className={styles.honorChart}>
        <Row>
          <Col md={{ span: 24 }} lg={{ span: 16 }}>
            <div id="relationChart" className={styles.honorContent}></div>
          </Col>
          <Col md={{ span: 24 }} lg={{ span: 8 }} style={{ paddingLeft: '30px' }}>
            <div className={styles.rightHonor}>
              <div style={{ width: '300px' }}>
                <div className={styles.searchTitle}>
                  <div className={styles.search}>
                    <Select labelInValue defaultValue={{ key: 'all' }} style={{ width: '100%' }}
                            onChange={this.onChangeStar}>
                      <Option value="all">请选择</Option>
                      <Option value="2004">2004年</Option>
                      <Option value="2005">2005年</Option>
                      <Option value="2006">2006年</Option>
                      <Option value="2007">2007年</Option>
                      <Option value="2008">2008年</Option>
                      <Option value="2009">2009年</Option>
                      <Option value="2010">2010年</Option>
                      <Option value="2011">2011年</Option>
                      <Option value="2012">2012年</Option>
                      <Option value="2013">2013年</Option>
                      <Option value="2014">2014年</Option>
                      <Option value="2015">2015年</Option>
                      <Option value="2016">2016年</Option>
                      <Option value="2017">2017年</Option>
                      <Option value="2018">2018年</Option>
                    </Select>
                  </div>
                </div>

                <div className={styles.topHonor}>
                  {rankPlayer && rankPlayer.map((item, index) => {
                    const { title } = item;
                    return (
                      <div className={styles.cupItem} key={uuid()}>
                        <div>
                          <Icon type="trophy" className={styles.cupIcon}/>
                        </div>
                        <div className={styles.cupFont} style={{ WebkitBoxOrient: 'vertical' }}>
                          {title}
                        </div>
                      </div>
                    );
                  })}
                  <div className={styles.page}>
                    <Pagination defaultCurrent={1} total={50} size="small"/>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default HonorChart;
