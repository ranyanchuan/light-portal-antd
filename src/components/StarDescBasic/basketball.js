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
      baiduUrl: 'wwww.baidu.com',
      wikiUrl: 'wwww.wiki.com',
      name: 'LeBron James',
      name_cn: '勒布朗-詹姆斯'

    }




    const {
      name,
      name_cn,
      height,
      weight,
      birthday,
      nation,
      hometown,
      team,
      draft,
      duty,
      workYear,
      baiduUrl,
      wikiUrl

    }=data;

    return (
      <div className={styles.basicBasketball}>
        <Row>
          <Col sm={12} md={6} lg={6} className={styles.basicLabel}>中文名：</Col>
          <Col sm={12} md={12} lg={12}>{name_cn}</Col>
        </Row>
        <Row>
          <Col sm={12} md={6} lg={6} className={styles.basicLabel}>英文名：</Col>
          <Col sm={12} md={12} lg={12}>{name}</Col>
        </Row>
        <Row>
          <Col sm={12} md={6} lg={6} className={styles.basicLabel}>身&nbsp;&nbsp;&nbsp;&nbsp;高：</Col>
          <Col sm={12} md={12} lg={12}>{height} m</Col>
        </Row>

        <Row>
          <Col sm={12} md={6} lg={6} className={styles.basicLabel}>体&nbsp;&nbsp;&nbsp;&nbsp;重：</Col>
          <Col sm={12} md={12} lg={12}>{weight} kg</Col>
        </Row>

        <Row>
          <Col sm={12} md={6} lg={6} className={styles.basicLabel}>生&nbsp;&nbsp;&nbsp;&nbsp;日：</Col>
          <Col sm={12} md={12} lg={12}>{birthday}</Col>
        </Row>

        <Row>
          <Col sm={12} md={6} lg={6} className={styles.basicLabel}>国&nbsp;&nbsp;&nbsp;&nbsp;籍：</Col>
          <Col sm={12} md={12} lg={12}>{nation}</Col>
        </Row>

        <Row>
          <Col sm={12} md={6} lg={6} className={styles.basicLabel}>家&nbsp;&nbsp;&nbsp;&nbsp;乡：</Col>
          <Col sm={12} md={12} lg={12}>{hometown}</Col>
        </Row>


        <Row>
          <Col sm={12} md={6} lg={6} className={styles.basicLabel}>球&nbsp;&nbsp;&nbsp;&nbsp;队：</Col>
          <Col sm={12} md={12} lg={12}>{team.join('、')}</Col>
        </Row>


        <Row>
          <Col sm={12} md={6} lg={6} className={styles.basicLabel}>选&nbsp;&nbsp;&nbsp;&nbsp;秀：</Col>
          <Col sm={12} md={12} lg={12}>{draft}年</Col>
        </Row>


        <Row>
          <Col sm={12} md={6} lg={6} className={styles.basicLabel}>职&nbsp;&nbsp;&nbsp;&nbsp;业：</Col>
          <Col sm={12} md={12} lg={12}>{duty}</Col>
        </Row>


        <Row>
          <Col sm={12} md={6} lg={6} className={styles.basicLabel}>职&nbsp;&nbsp;&nbsp;&nbsp;年：</Col>
          <Col sm={12} md={12} lg={12}>{workYear} 年</Col>
        </Row>
           <Row>
          <Col sm={12} md={6} lg={6} className={styles.basicLabel}>资&nbsp;&nbsp;&nbsp;&nbsp;料：</Col>
          <Col sm={12} md={12} lg={12}>
            <div>
            <a href={baiduUrl}>百度百科</a>
            {wikiUrl &&
            <span>
            <span className={styles.line}>|</span>
            <a href={wikiUrl}>维基百科</a>
            </span>
            }
            </div>
          </Col>
        </Row>



      </div>
    );
  }
}

export default StarDescBasicBasketball;
