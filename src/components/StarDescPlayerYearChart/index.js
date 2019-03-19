/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { connect } from 'dva';

import { Button, Form } from 'antd';
import styles from './index.less';
import { uuid } from 'utils';

const echarts = require('echarts');


@Form.create()

class StarDescPlayerYearChart extends React.Component {

  state = {
    loading: true,
  };


  componentDidMount() {
    let myChart = echarts.init(document.getElementById('starDescPlayerYearChart'));

    var xData = function() {
      var data = [];
      for (var i = 1; i < 15; i++) {
        data.push(i + "");
      }
      return data;
    }();

    let option = {
      backgroundColor: "#344b58",
      "title": {
        "text": "16年1月-16年11月充值客单分析",
        "subtext": "BY MICVS",
        x: "4%",

        textStyle: {
          color: '#fff',
          fontSize: '22'
        },
        subtextStyle: {
          color: '#90979c',
          fontSize: '16',

        },
      },
      "tooltip": {
        "trigger": "axis",
        "axisPointer": {
          "type": "shadow",
          textStyle: {
            color: "#fff"
          }

        },
      },
      "grid": {
        "borderWidth": 0,
        "top": 110,
        "bottom": 95,
        textStyle: {
          color: "#fff"
        }
      },
      "legend": {
        x: '4%',
        top: '11%',
        textStyle: {
          color: '#90979c',
        },
        "data": ['老用户', '新用户', '总']
      },


      "calculable": true,
      "xAxis": [{
        "type": "category",
        "axisLine": {
          lineStyle: {
            color: '#90979c'
          }
        },
        "splitLine": {
          "show": false
        },
        "axisTick": {
          "show": false
        },
        "splitArea": {
          "show": false
        },
        "axisLabel": {
          "interval": 0,

        },
        "data": xData,
      }],
      "yAxis": [{
        "type": "value",
        "splitLine": {
          "show": false
        },
        "axisLine": {
          lineStyle: {
            color: '#90979c'
          }
        },
        "axisTick": {
          "show": false
        },
        "axisLabel": {
          "interval": 0,

        },
        "splitArea": {
          "show": false
        },

      }],
      "dataZoom": [{
        "show": true,
        "height": 30,
        "xAxisIndex": [
          0
        ],
        bottom: 30,
        "start": 10,
        "end": 80,
        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
        handleSize: '110%',
        handleStyle: {
          color: "#d3dee5",

        },
        textStyle: {
          color: "#fff"
        },
        borderColor: "#90979c"


      }, {
        "type": "inside",
        "show": true,
        "height": 15,
        "start": 1,
        "end": 35
      }],
      "series": [{
        "name": "老用户",
        "type": "bar",
        "stack": "总量",
        "barMaxWidth": 35,
        "barGap": "10%",
        "itemStyle": {
          "normal": {
            "color": "rgba(255,144,128,1)",
            "label": {
              "show": true,
              "textStyle": {
                "color": "#fff"
              },
              "position": "insideTop",
              formatter: function(p) {
                return p.value > 0 ? (p.value) : '';
              }
            }
          }
        },
        "data": [
          198.66,
          330.81,
          151.95,
          160.12,
          222.56,
          229.05,
          128.53,
          250.91,
          224.47,
          473.99,
          126.85,
          260.50
        ],
      },

        {
          "name": "新用户",
          "type": "bar",
          "stack": "总量",
          "itemStyle": {
            "normal": {
              "color": "rgba(0,191,183,1)",
              "barBorderRadius": 0,
              "label": {
                "show": true,
                "position": "top",
                formatter: function(p) {
                  return p.value > 0 ? (p.value) : '';
                }
              }
            }
          },
          "data": [
            82.89,
            67.54,
            62.07,
            59.43,
            67.02,
            67.09,
            35.66,
            71.78,
            81.61,
            78.85,
            79.12,
            72.30
          ]
        }
      ]
    }
    myChart.setOption(option);
  }

  render() {


    return (
      <div className={styles.starDescPlayerYearChart} id="starDescPlayerYearChart">

      </div>
    );
  }
}

export default StarDescPlayerYearChart;
