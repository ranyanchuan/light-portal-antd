/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { connect } from 'dva';

import { Button, Form, Input, Select, Row, Col, Avatar, List, Icon } from 'antd';
import styles from './index.less';
import { uuid } from 'utils';


@Form.create()

class StarDescNews extends React.Component {

  state = {
    loading: true,
  };


  render() {


    const listData = [];
    for (let i = 0; i < 23; i++) {
      listData.push({
        message: '2',
        star: '156',
        like: '200',
        href: 'http://ant.design',
        title: `ant design part ${i}`,
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
        description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      });
    }

    const IconText = ({ type, text }) => {
      return (
        <span>
        <Icon type={type} style={{ marginRight: 8 }}/>
        <span>{text}</span>
       </span>
      );
    };


    return (
      <div className={styles.starDescNews}>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 10,
          }}
          dataSource={listData}
          renderItem={item => (
            <List.Item
              key={item.title}
              actions={[
                <IconText type="star-o" text={item.star}/>,
                <IconText type="like-o" text={item.like}/>,
                <IconText type="message" text={item.message}/>,
              ]}
              extra={<img width={272} alt="logo" src={item.cover}/>}
            >
              <List.Item.Meta
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default StarDescNews;
