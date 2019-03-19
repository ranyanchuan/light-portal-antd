/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';

import { Button, Form, Input, Select, Row, Col, Pagination, Icon } from 'antd';
import moneyUrl from 'assets/img/money.png';


import styles from './index.less';
import { uuid } from 'utils';


const echarts = require('echarts');
const Option = Select.Option;

@Form.create()

class SalaryChart extends React.Component {

  state = {
    loading: true,
  };

  componentDidMount() {
    let myChart = echarts.init(document.getElementById('salaryChart'));

    const unit = '万元';
    const formatter = `{b| {b}：}{b|{c}${unit}} {per|{d}%}`;

    let option = {
      color: ['#1E90FF', '#87CEFA', '#00FFFF', '#FFA500', '#EEC900', '#E9967A', '#FF00FF', '#7D26CD'],
      // backgroundColor: 'rgb(5,13,2)',
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      graphic: {
        elements: [{
          type: 'image',
          style: {
            image: moneyUrl,
            width: 100,
            height: 80,
          },
          left: 'center',
          top: '40%',
        }],
      },
      title: {
        text: '8.2亿',
        subtext: '所获薪资',
        left: 'center',
        top: '50%',
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
        x: 'center',
        top: 20,
        textStyle: {
          color: '#fff',
        },
        data: ['2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011'],
      },
      series: [
        {
          name: '访问量',
          type: 'pie',
          roseType: 'area',
          radius: ['30%', '65%'],
          label: {
            normal: {
              formatter: formatter,
              backgroundColor: 'rgb(5,13,2)',
              borderColor: '#00FFFF',
              borderWidth: 1,
              borderRadius: 4,
              shadowBlur: 3,
              shadowOffsetX: 2,
              shadowOffsetY: 2,
              shadowColor: '#00FFFF',
              padding: [0, 2],
              rich: {
                hr: {
                  borderColor: '#00FFFF',
                  width: '100%',
                  borderWidth: 0.5,
                  height: 0,
                },
                b: {
                  fontSize: 15,
                  lineHeight: 26,
                },
                per: {
                  color: '#eee',
                  backgroundColor: '#334455',
                  padding: [2, 4],
                  borderRadius: 2,
                },
              },
            },
          },
          itemStyle: {
            normal: {
              shadowBlur: 10,
            },
          },
          data: [
            { value: 335, name: '2004' },
            { value: 310, name: '2005' },
            { value: 234, name: '2006' },
            { value: 135, name: '2007' },
            { value: 1048, name: '2008' },
            { value: 251, name: '2009' },
            { value: 147, name: '2010' },
            { value: 102, name: '2011' },
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
      //
      // { 'title': '08-09赛季全明星首发' },
      // { 'title': '08-09赛季最佳阵容第1阵' },

    ];

    return (
      <div className={styles.relationChart}>
        <Row>
          <Col md={{ span: 24 }} lg={{ span: 16 }}>
            <div id="salaryChart" className={styles.relationContent}></div>
          </Col>
          <Col md={{ span: 24 }} lg={{ span: 8 }} style={{ paddingLeft: '30px' }}>
            <div className={styles.rightSalary}>
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
                          <Icon type="money-collect" className={styles.cupIcon}/>
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

export default SalaryChart;
