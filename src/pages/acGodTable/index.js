/* eslint-disable import/first */
/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import styles from './index.less';

import BasicTable from 'components/AcGodTable/basicTable';
import 'handsontable/languages/zh-CN';

class AcGodTable extends React.Component {

  state = {
    stars: [],
  };

  data = [
    {id:1,year:'2019',category:'奔驰',price:500000},
    {id:2,year:'2018',category:'奔驰',price:500000},
    {id:3,year:'2017',category:'奔驰',price:500000},
    {id:4,year:'2016',category:'奔驰',price:500000},
  ];

  config = {
    data: this.data,
    colHeaders: ['年份','标题','类型',],
    language:'zh-CN',
    columns: [
      {
        data:'year',
        type: 'autocomplete', // 表格类型
        source: ['BMW', 'Chrysler', 'Nissan', 'Suzuki', 'Toyota', 'Volvo'],
        strict: false,
      },
      {
        data:"category",
        type: 'autocomplete',
        source: ['yellow', 'red', 'orange and another color', 'green', 'blue', 'gray', 'black', 'white', 'purple', 'lime', 'olive', 'cyan'],
        strict: false,
      },
      {
        type: 'numeric',
        data:'price',
      },
    ],

    // 使用自定义列头
    rowHeaders: true, // false/数组 //当值为true时显示行头，当值为数组时，行头为数组的值
    filters: true, // 表头过滤
    manualColumnResize: true, // 表格表头是否可以拖动 false时禁止拖动
    manualRowResize: true,   // 当值为true时，允许拖动，当为false时禁止拖动
    manualColumnMove: true,  // false 当值为true时，列可拖拽移动到指定列
    manualRowMove: true, //false 当值为true时，行可拖拽至指定行
    // dropdownMenu: ['filter_by_condition', 'filter_action_bar']
    // dropdownMenu: true,  // https://handsontable.com/docs/7.0.2/demo-dropdown-menu.html
  };


  // 多表头 https://handsontable.com/docs/7.0.2/demo-nested-headers.html
  // 多表头隐藏 https://handsontable.com/docs/7.0.2/demo-collapsing-columns.html
  // 固定row https://handsontable.com/docs/7.0.2/demo-fixing-bottom.html
  // 固定例 https://handsontable.com/docs/7.0.2/demo-freezing.html
  // 多余宽自适应 https://handsontable.com/docs/7.0.2/demo-stretching.html
  // 表格宽自适应内容  https://handsontable.com/docs/7.0.2/demo-header-tooltips.html
  // 自定义宽和高  https://handsontable.com/docs/7.0.2/demo-resizing.html
  // fix 宽和高  https://handsontable.com/docs/7.0.2/demo-fixing.html
  // 自定义表格内容，表头排序, https://handsontable.com/docs/7.0.2/demo-sorting.html
  // 表头过滤 https://handsontable.com/docs/7.0.2/demo-filtering.html
  // 表格验证 https://handsontable.com/docs/7.0.2/demo-data-validation.html
  // 合并单元格 https://handsontable.com/docs/7.0.2/demo-merged-cells.html
  // 自定义表头 https://handsontable.com/docs/7.0.2/demo-custom-renderers.html
  // 行过滤  https://handsontable.com/docs/7.0.2/demo-filtering.html
  // 字体颜色 https://handsontable.com/docs/7.0.2/demo-conditional-formatting.html


  goData = () => {
    const updateData = this.child.getData();
    debugger
    console.log('updateData', updateData);
  };


  render() {

    return (
      <div className={styles.acGodTable}>
        <Button onClick={this.goData}>数据</Button>

        <BasicTable
          {...this.config}
          id="example"
          // 设置ref属性
          onRef={(ref) => {
            this.child = ref;
          }}
          multiSelect={true}
        />
      </div>
    );
  }
}

export default AcGodTable;
