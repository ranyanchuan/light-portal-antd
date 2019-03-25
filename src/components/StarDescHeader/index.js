/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { connect } from 'dva';

import { Button, Form, Input, Icon, Row, Badge, Avatar } from 'antd';
import SkillChart from 'components/SkillChart/index';
import StarDescBasicBasketball from 'components/StarDescBasic/basketball';
import styles from './index.less';
import { uuid } from 'utils';


@Form.create()

class StarDescHeader extends React.Component {

  state = {
    loading: true,
  };

  componentDidMount() {

  }


  render() {


    const rankPlayer = [
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/4569.jpg', 'title': '凯尔-库兹马' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/4472.jpg', 'title': '布兰顿-英格拉姆' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/2426.jpg', 'title': '贾维尔-麦基' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/4568.jpg', 'title': '朗佐-鲍尔' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/4166.jpg', 'title': '肯塔维奥斯-卡德维尔-波普' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/2964.jpg', 'title': '拉简-朗多' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/img_middle_common.jpg', 'title': '雷吉-巴洛克' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/img_middle_common.jpg', 'title': '伊维察-祖巴茨' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/img_middle_common.jpg', 'title': '约什-哈特' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/3203.jpg', 'title': '兰斯-史蒂芬森' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/434.jpg', 'title': '迈克尔-比斯利' },
      { 'avatar': 'http://www.stat-nba.com/image/playerImage/689.jpg', 'title': '泰森-钱德勒' },
    ];


    const basicInfo = {
      name: 'LeBron James',
      name_cn: '勒布朗-詹姆斯',
      avatar: 'https://china.nba.com/media/img/players/head/260x190/2544.png',
      baiduUrl: 'wwww.baidu.com',
      wikiUrl: 'wwww.wiki.com',
    };

    const { name, name_cn, avatar, baiduUrl, wikiUrl } = basicInfo;
    const basicName = (name && name_cn) ? `${name_cn}(${name})` : (name ? name : name_cn);

    return (
      <div className={styles.starDescBasic}>

        {/*头像信息*/}
        <div className={styles.leftBasic}>
          <img src={avatar} alt=""/>

          {/*<Avatar icon="user" size={190} src={avatar} shape="square"/>*/}

          {/*<div style={{ marginTop: '15px' }}>*/}
          {/*<h3 className={styles.name}>{basicName}</h3>*/}
          {/*</div>*/}
          {/*<div style={{ textAlign: 'center' }}>*/}
          {/*<a href={baiduUrl}>百度百科</a>*/}
          {/*{wikiUrl &&*/}
          {/*<span>*/}
          {/*<span className={styles.line}>|</span>*/}
          {/*<a href={wikiUrl}>维基百科</a>*/}
          {/*</span>*/}
          {/*}*/}
          {/*</div>*/}
          {/*<Button type="primary" shape="round" ghost>关注</Button>*/}

          {/*<Button type="primary" shape="round" icon="download" size="md">Download</Button>*/}

          {/*<div style={{ fontSize: '20px', textAlign: 'right' }}>*/}
            {/*<div>*/}
            {/*<span>*/}
              {/*<Icon type="heart" theme="twoTone" twoToneColor="#eb2f96"/>*/}
              {/*<span style={{ fontSize: '12px' }}>50000</span>*/}
            {/*</span>*/}
            {/*</div>*/}

            {/*/!*<span style={{float:'right',color:'blue',fontSize:'12px'}}>*!/*/}
            {/*/!*更多*!/*/}
            {/*/!*</span>*!/*/}

          {/*</div>*/}

          <div>
            <Button type="primary" shape="round" style={{width:'100%'}}>点击关注</Button>
          </div>
          <div style={{ margin: '5px', paddingLeft: '5px',}}>
            <Avatar icon="user" size={24} style={{ margin: '1px 2px' }}/>
            <Avatar icon="user" size={24} style={{ margin: '1px 2px' }}/>
            <Avatar icon="user" size={24} style={{ margin: '1px 2px' }}/>
            <Avatar icon="user" size={24} style={{ margin: '1px 2px' }}/>
            <Avatar icon="user" size={24} style={{ margin: '1px 2px' }}/>
            <Avatar icon="user" size={24} style={{ margin: '1px 2px' }}/>
            <Avatar icon="user" size={24} style={{ margin: '1px 2px' }}/>
            <Avatar icon="user" size={24} style={{ margin: '1px 2px' }}/>
            <Avatar icon="user" size={24} style={{ margin: '1px 2px' }}/>
            <Avatar icon="user" size={24} style={{ margin: '1px 2px' }}/>
            <Avatar icon="user" size={24} style={{ margin: '1px 2px' }}/>
            <Avatar icon="user" size={24} style={{ margin: '1px 2px' }}/>
            <Avatar icon="user" size={24} style={{ margin: '1px 2px' }}/>
            <Avatar icon="user" size={24} style={{ margin: '1px 2px' }}/>
            <Avatar icon="user" size={24} style={{ margin: '1px 2px' }}/>
            <Avatar icon="user" size={24} style={{ margin: '1px 2px' }}/>
            <Avatar icon="user" size={24} style={{ margin: '1px 2px' }}/>
            <Avatar icon="user" size={24} style={{ margin: '1px 2px' }}/>
            <Avatar icon="user" size={24} style={{ margin: '1px 2px' }}/>
            <Avatar icon="user" size={24} style={{ margin: '1px 2px' }}/>
            <Avatar icon="user" size={24} style={{ margin: '1px 2px' }}/>
            <Avatar icon="user" size={24} style={{ margin: '1px 2px' }}/>
            <Avatar icon="user" size={24} style={{ margin: '1px 2px' }}/>
            <Avatar icon="user" size={24} style={{ margin: '1px 2px' }}/>
            <Avatar icon="user" size={24} style={{ margin: '1px 2px' }}/>
            <Avatar icon="user" size={24} style={{ margin: '1px 2px' }}/>
            <Avatar icon="user" size={24} style={{ margin: '1px 2px' }}/>
            <Avatar icon="user" size={24} style={{ margin: '1px 2px' }}/>
            <Avatar icon="user" size={24} style={{ margin: '1px 2px' }}/>
            <Avatar icon="user" size={24} style={{ margin: '1px 2px' }}/>
            <Avatar icon="user" size={24} style={{ margin: '1px 2px' }}/>

          </div>

          <div style={{textAlign:'center'}}>
          <Button onClick={this.onLoadMore} size="small">加载更多</Button>
          </div>


        </div>

        {/*个人基本档案*/}
        <StarDescBasicBasketball/>

        {/*技能*/}
        <SkillChart/>

        {/*相似人员*/}
        <div className={styles.rightSimilar}>
          <div className={styles.titleSimilar}>相似人员</div>
          <div className={styles.similar}>
            {rankPlayer && rankPlayer.map((item, index) => {
              const { avatar, title } = item;
              return (
                <div key={uuid()}>
                  <Avatar shape="square" size={60} src={avatar}/>
                  <h5 style={{ WebkitBoxOrient: 'vertical' }}><a href="">{title}</a></h5>
                </div>
              );
            })}
          </div>
        </div>


      </div>
    );
  }
}

export default StarDescHeader;
