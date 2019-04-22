/* eslint-disable import/first */
/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import styles from './index.less';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';

class BasicTable extends React.Component {

  state = {};

  hot = null;


  onHandsonTable = (container, data) => {
    this.hot = new Handsontable(container, {
      ...data,
    });
  };


  componentDidMount() {

    // 在父组件上绑定子组件方法
    this.props.onRef(this);

    const _this = this;

    let { id, data, colHeaders } = this.props;


    // maps function to lookup string

    const container = document.getElementById(id);

    const tempObj = this.dealData(this.props);


    this.onHandsonTable(container, tempObj);


    //  去掉 license
    let hotDisplay = document.getElementById('hot-display-license-info');
    const newDoc = document.createElement('span');
    hotDisplay.parentNode.replaceChild(newDoc, hotDisplay);


    Handsontable.dom.addEvent(container, 'mousedown', function(event) {
      if (event.target.nodeName === 'INPUT' && event.target.className == 'multiSelectChecker') {
        event.stopPropagation();
      }
    });

    Handsontable.dom.addEvent(container, 'mouseup', function(event) {
      // 多选操作
      if (event.target.nodeName === 'INPUT' && event.target.className == 'multiSelectChecker') {
        let checked = !event.target.checked;
        // hot2.render();
        event.stopPropagation();
        if (checked) {
          colHeaders[0] = `<input type='checkbox' class='multiSelectChecker' checked />`;
          data.map((item) => {
            return item['checkbox_status'] = true;
          });
        } else {
          colHeaders[0] = `<input type='checkbox' class='multiSelectChecker' />`;
          data.map((item) => {
            return item['checkbox_status'] = false;
          });
        }
        _this.hot.render();
      }

    });

  }


  dealData = () => {
    let { multiSelect, colHeaders, columns, data, dropdownMenu, rowStyle } = this.props;
    // 添加行样式
    if (columns && columns.length > 0 && rowStyle) {
      for (const column of columns) {
        const { renderer } = column;
        // 添加样式
        if (!renderer) {
          column.renderer = function(instance, td, row, col, prop, value) {
            const styles = rowStyle(row, col, prop);
            if (styles) {
              // 修改行样式
              for (const style in styles) {
                td.style[style] = styles[style];
              }
            }

            // 数字类型居右
            if(typeof value ==='number'){
              td.style.textAlign = 'right';
            }

            td.innerText = value;
            return td;
          };
        }
      }
    }

    // 添加 多选框
    if (multiSelect) {
      const checkedHeader = `<input type='checkbox' class='multiSelectChecker' />`;
      let className = 'htCenter htMiddle ';
      if (dropdownMenu) {
        className += 'menuCheckbox';
      }
      const checkboxCell = {
        data: 'checkbox_status',
        type: 'checkbox',
        className,
      };
      colHeaders.unshift(checkedHeader);
      columns.unshift(checkboxCell);
    }

    return { ...this.props };
  };


  // 将修改后的数据返回
  getData = () => {
    let { data } = this.props;
    return data;
  };


  render() {
    const { id } = this.props;
    return (
      <div id={id}></div>
    );
  }
}

export default BasicTable;
