/* eslint-disable import/first */
/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Button, Input } from 'antd';
import styles from './index.less';
import Header from 'components/header/';
import Footer from 'components/footer';


class Games extends React.Component {

  componentDidMount() {

    // document.body.style.cssText="position: absolute; left: 0; top: 0; right: -17px; bottom: 0; overflow-x: hidden; overflow-y: scroll;";
    // document.body.style.cssText="position: absolute; left: 0; top: 0; right: -17px; bottom: 0; overflow-x: hidden; overflow-y: scroll;";


    // //根据ID获取iframe对象
    // let ifr = document.getElementById('main');
    // const _this=this;
    // ifr.onload = function() {
    //   //解决打开高度太高的页面后再打开高度较小页面滚动条不收缩
    //   ifr.style.height='0px';
    //   let height = _this.calcPageHeight();
    //   if(height < 850){
    //     height = 850;
    //   }
    //   ifr.style.height = height + 'px'
    // }
    // ifr.onclick = function () {
    //   console.log("==XXX==");
    // }
    //
    // let y=(ifr.contentWindow || ifr.contentDocument);
    // const xx=y.getElementById('mCSB_3_container');


  }


  render() {
    return (
      <div className={styles.games}>
        <Header/>
        <div>
          <iframe src="http://fms.news.cn/swf/2016_sjxw/olympic_0802/index.html" scrolling="no" id="main" name="main"
                  frameborder="0"></iframe>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Games;
