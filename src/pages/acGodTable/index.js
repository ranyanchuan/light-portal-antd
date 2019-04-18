/* eslint-disable import/first */
/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import styles from './index.less';

// import { HotTable } from '@handsontable/react';

import Handsontable from "handsontable";
import 'handsontable/dist/handsontable.full.css';



class Home extends React.Component {

  state = {
    stars: [],
  };


  componentDidMount() {

    const data = [
      ['', 'Tesla', 'Volvo', 'Toyota', 'Ford'],
      ['2019', 10, 11, 12, 13],
      ['2020', 20, 11, 14, 13],
      ['2021', 30, 15, 12, 13]
    ];

    const container = document.getElementById('example');
    const hot = new Handsontable(container, {
      data: data,
      colHeaders: ['Car', 'Year', 'Chassis color', 'Bumper color'],
      columns: [
        {
          type: 'autocomplete',
          source: ['BMW', 'Chrysler', 'Nissan', 'Suzuki', 'Toyota', 'Volvo'],
          strict: false
        },
        {type: 'numeric'},
        {
          type: 'autocomplete',
          source: ['yellow', 'red', 'orange and another color', 'green', 'blue', 'gray', 'black', 'white', 'purple', 'lime', 'olive', 'cyan'],
          strict: false,
          visibleRows: 4
        },
        {
          type: 'autocomplete',
          source: ['yellow', 'red', 'orange and another color', 'green', 'blue', 'gray', 'black', 'white', 'purple', 'lime', 'olive', 'cyan'],
          strict: false,
          trimDropdown: false
        }
      ], // 使用自定义列头
      rowHeaders: true,
      filters: true,
      manualColumnResize:true, // 表格表头是否可以拖动 false时禁止拖动
      manualRowResize:true,   // 当值为true时，允许拖动，当为false时禁止拖动
      manualColumnMove:true,  // false 当值为true时，列可拖拽移动到指定列
      manualRowMove:true, //false 当值为true时，行可拖拽至指定行
      customBorders: [
        {
          range: {//多个单元格
            from: {//起始位置
              row: 1,
              col: 1
            },
            to: {
              row: 3,
              col: 4
            }
          },
          top: {//结束位置
            width: 2,
            color: '#5292F7'
          },
          left: {
            width: 2,
            color: 'orange'
          },
          bottom: {
            width: 2,
            color: 'red'
          },
          right: {
            width: 2,
            color: 'magenta'
          }
        },
        {//单一单元格
          row: 2,
          col: 2,
          left: {
            width: 2,
            color: 'red'
          },
          right: {
            width: 1,
            color: 'green'
          }
        }],

      dropdownMenu: true
    });



    //  去掉 license
    let hotDisplay = document.getElementById('hot-display-license-info');
    const newDoc = document.createElement('span');
    hotDisplay.parentNode.replaceChild(newDoc, hotDisplay);
  }




  render() {

    return (
      <div className={styles.home}>
        <div id="example"></div>
      </div>
    );
  }
}

export default Home;
