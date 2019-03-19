/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { connect } from 'dva';

import { Button, Form, Input, Select, Row, Col, Avatar } from 'antd';
import styles from './index.less';
import { uuid } from 'utils';


@Form.create()

class StarDescBasicBasketball extends React.Component {

  state = {
    loading: true,
  };

  componentDidMount() {

  }


  render() {

    const data={
      height:2.03,
      weight:113.4,
      birthday:"1984-12-30",
      nation:"美国",
      hometown:"俄亥俄州阿克伦",
      team:["骑士",'湖人'],
      draft:2003,
      duty:'篮球运动员',
      workYear:15,

    }


    const {
      height,
      weight,
      birthday,
      nation,
      hometown,
      team,
      draft,
      duty,
      workYear,

    }=data;

    return (
      <div className={styles.basicBasketball}>
        <Row>
          <Col sm={12} md={6} lg={6} className={styles.basicLabel}>身高：</Col>
          <Col sm={12} md={12} lg={12}>{height} m</Col>
        </Row>

        <Row>
          <Col sm={12} md={6} lg={6} className={styles.basicLabel}>体重：</Col>
          <Col sm={12} md={12} lg={12}>{weight} kg</Col>
        </Row>

        <Row>
          <Col sm={12} md={6} lg={6} className={styles.basicLabel}>生日：</Col>
          <Col sm={12} md={12} lg={12}>{birthday}</Col>
        </Row>

        <Row>
          <Col sm={12} md={6} lg={6} className={styles.basicLabel}>国籍：</Col>
          <Col sm={12} md={12} lg={12}>{nation}</Col>
        </Row>

        <Row>
          <Col sm={12} md={6} lg={6} className={styles.basicLabel}>家乡：</Col>
          <Col sm={12} md={12} lg={12}>{hometown}</Col>
        </Row>


        <Row>
          <Col sm={12} md={6} lg={6} className={styles.basicLabel}>球队：</Col>
          <Col sm={12} md={12} lg={12}>{team.join('、')}</Col>
        </Row>


        <Row>
          <Col sm={12} md={6} lg={6} className={styles.basicLabel}>选秀：</Col>
          <Col sm={12} md={12} lg={12}>{draft}年</Col>
        </Row>


        <Row>
          <Col sm={12} md={6} lg={6} className={styles.basicLabel}>职业：</Col>
          <Col sm={12} md={12} lg={12}>{duty}</Col>
        </Row>


        <Row>
          <Col sm={12} md={6} lg={6} className={styles.basicLabel}>职年：</Col>
          <Col sm={12} md={12} lg={12}>{workYear} 年</Col>
        </Row>

      </div>
    );
  }
}

export default StarDescBasicBasketball;
