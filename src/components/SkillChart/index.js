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

class SkillChart extends React.Component {

  state = {
    loading: true,
  };

  componentDidMount() {

    // 模拟数据 title
    const indicator = [
      {
        name: '得分',
        max: 100,
      }, {
        name: '篮板',
        max: 100,
      }, {
        name: '助攻',
        max: 100,
      }, {
        name: '抢断',
        max: 100,
      }, {
        name: '盖帽',
        max: 100,
      }, {
        name: '时间',
        max: 100,
      }];

    // 模拟数据值
    const data = [80, 50, 55, 80, 50, 80];


    let myChart = echarts.init(document.getElementById('skillChart'));
    let option = {
      color: ['rgba(0,183,238, 1)', 'rgba(86,199,60, 1)'],
      tooltip: {
        show: true,
        trigger: 'item',
      },

      radar: {
        center: ['50%', '50%'],
        radius: '70%',
        startAngle: 90,
        splitNumber: 4,
        shape: 'circle',
        splitArea: {
          areaStyle: {
            color: ['transparent'],
          },
        },
        name: {
          color: '#999',
        },
        axisLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#d1d1d1',
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#d1d1d1',
          },
        },

        indicator,
      },
      series: [{
        name: '技能',
        type: 'radar',
        symbol: 'circle',
        symbolSize: 10,
        areaStyle: {
          normal: {
            color: 'rgba(86,199,60, 0.3)',
          },
        },
        itemStyle: {
          color: 'rgba(255,255,255, 1)',
          borderColor: '#2aba3f',
          borderWidth: 3,
        },
        lineStyle: {
          normal: {
            color: '#2aba3f',
            width: 3,
          },
        },
        data: [
          data,
        ],
      }],
    };
    myChart.setOption(option);
  }

  render() {
    return (
      <div className={styles.radarBody}>
        <div className={styles.skillChart} id="skillChart"></div>
      </div>
    );
  }
}

export default SkillChart;
