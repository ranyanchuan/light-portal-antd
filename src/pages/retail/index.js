/* eslint-disable import/first */
/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { connect } from 'dva';
import { Button, Input, Carousel, Form, Icon, Tabs, Badge, Divider, List, Avatar } from 'antd';
import { test } from 'xiaoheizhaodemo';
import styles from './index.less';
import Header from 'components/header/index';
import Footer from 'components/footer/index';


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


class Retail extends React.Component {

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
    ['', 'Ford', 'Volvo', 'Toyota', 'Honda'],
    ['2016', 10, 11, 12, 13],
    ['2017', 20, 11, 14, 13],
    ['2018', 30, 15, 12, 13],
  ];

  render() {


    return (
      <div className={styles.home}>
        {/*<Header/>*/}
        <div className={styles.new}>
          <Carousel autoplay>
            <div><img src="http://s0.mall.tcl.com/group1/M00/05/95/CkgbllzTj--AKJ0sAAHqeD477PM692.jpg" alt=""/>
            </div>
            <div><img src="http://s0.mall.tcl.com/group1/M00/05/A2/Ckgbllz35b2AYCzWAASE_g-Y8qc610.jpg" alt=""/>
            </div>
            <div><img src="http://s0.mall.tcl.com/group1/M00/05/97/CkgbllzaMgWAX6A1AAJ5zf2bKy0656.jpg" alt=""/>
            </div>
          </Carousel>
        </div>
        <div className={styles.iconContent}>

          <div className={styles.iconItem}>
            <img src="https://img3.mukewang.com/5a7048580001670506000338-240-135.jpg" alt=""/>
            <div className={styles.goTitle}>
              <a href="/retail/inbound">采购信息</a>
            </div>
          </div>

          <div className={styles.iconItem}>
            <img src="https://img2.mukewang.com/5b7f737a0001cfb706000336-240-135.jpg" alt=""/>
            <div className={styles.goTitle}>
              <a href="/retail/outbound">销售信息</a>

            </div>
          </div>

          <div className={styles.iconItem}>
            <img src="https://img1.mukewang.com/5aeecb1d0001e5ea06000338-240-135.jpg" alt=""/>
            <div className={styles.goTitle}>
              <a href="/retail/logistics">物流信息</a>
            </div>
          </div>


          <div className={styles.iconItem}>
            <img src="https://img3.mukewang.com/5ca327b309a90af005400300-240-135.jpg" alt=""/>
            <div className={styles.goTitle}>
              <a href="/retail/user">客户信息</a>
            </div>
          </div>

        </div>
        <Footer/>
      </div>
    );
  }
}

export default Retail;
