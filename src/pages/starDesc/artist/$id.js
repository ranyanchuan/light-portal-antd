/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { connect } from 'dva';

import { Form, List, Avatar, Tabs, Icon, Tooltip, Table, Tag } from 'antd';

import styles from './index.less';
import Header from 'components/header/index';
import Footer from 'components/footer/index';
import StarDescHeader from 'components/StarDescHeader/index';
import RelationChart from 'components/RelationChart/index';
import HonorChart from 'components/HonorChart/index';
import SalaryChart from 'components/SalaryChart/index';
import WordCloudChart from 'components/WordCloudChart/index';
import StarDescNews from 'components/StarDescNews/index';

import { uuid } from 'utils';


const TabPane = Tabs.TabPane;

@Form.create()
@connect((state) => ({ basketballScore: state.basketballScore }))


class ArtistDesc extends React.Component {

  state = {
    loading: true,
    tabKey: 1,
  };

  componentDidMount() {

  }

  onChangeTab = (key) => {
    console.log('key', key);
    this.setState({ tabKey: key });
  };


  description = ({ infoData }) => {
    const { staring } = infoData;
    console.log(staring);

    return (
      <div className={styles.basicDesc}>
        <div className={styles.basicInfoLine}>
          <div className={styles.basicInfoRight}>
            <Icon type="hourglass" className={styles.fontIcon}/>
            <span>2019年</span>
          </div>
          <div className={styles.basicInfoRight}>
            <Icon type="clock-circle" className={styles.fontIcon}/>
            <span>130.00分钟</span>
          </div>
          <div className={styles.basicInfoRight}>
            <Icon type="schedule" className={styles.fontIcon}/>
            <span>2019-01-25 </span>
          </div>
          <div className={styles.basicInfoRight}>
            <Icon type="environment" className={styles.fontIcon}/>
            <span>中国香港/中国</span>
          </div>
          <div className={styles.basicInfoRight}>
            <Icon type="appstore" className={styles.fontIcon}/>
            <span>喜剧/奇幻/古装</span>
          </div>
          <div className={styles.basicInfoRight}>
            <Icon type="message" className={styles.fontIcon}/>
            <span>中文  </span>
          </div>

        </div>

        <div className={styles.basicInfoLine}>
          <div className={styles.basicInfoRight}>
            <Icon type="video-camera" className={styles.fontIcon}/>
            <span>
               <a href="">张敏 (Aman Chang)</a>
            </span>
          </div>
          <div className={styles.basicInfoRight}>
            <Icon type="edit" className={styles.fontIcon}/>
            <span>
              <a href="">王晶 (Jing Wong) </a>
            </span>
          </div>
        </div>
        <div className={styles.basicInfoLine}>
          <div className={styles.basicInfoRight}>
            <Icon type="usergroup-add" className={styles.fontIcon}/>
          </div>
          {staring.map((item) => {
            const { name, avatar } = item;
            return (
              <div className={styles.sAvatar} key={uuid()}>
                <Tooltip placement="bottom" title={<span>{name}</span>}>
                  <Avatar src={avatar}/>
                </Tooltip>
              </div>
            );
          })}
        </div>

        <div className={styles.abstract}>
          <div className={styles.basicInfoRight}>
            <Icon type="laptop" className={styles.fontIcon}/>
          </div>
          <div className={styles.abstractText}>
            <div>无力维权的修车工遭遇非法强拆后，选择跳楼自杀；随着小刑警孙大圣（王千源饰）调查的深入，无力维权的修车工遭遇非法强拆后，选择跳楼自杀；随着小刑警孙大圣（王千源饰）调查的深入，无力维权的修车工遭遇非法强拆后，选择跳楼自杀；随着小刑警孙大圣（王千源饰）调查的深入，发现这场看似简单的民事纠纷背后其实另有隐情；随着嫌疑目标的锁定，赵泰（包贝尔饰）和崔京民（王迅饰）为代表的反派集团被盯上后，公然藐视法律挑衅警察。面对反派集团金钱诱惑、顶头上司的警告劝阻、家人性命遭受威胁，这场力量悬殊的正邪较量将会如何收场……</div>
          </div>
        </div>
      </div>
    );

  };


  render() {
    const { tabKey } = this.state;

    const Description = this.description;

    const columns = [
      {
        title: '歌曲',
        dataIndex: 'title',
        key: 'title',
        render: text => <a href="javascript:;">{text}</a>,
      }, {
        title: '歌手',
        dataIndex: 'singer',
        key: 'singer',
        render: (text) => {
          return (<span>{text.join(' - ')}</span>);
        },
      }, {
        title: '作词',
        dataIndex: 'author',
        key: 'author',
        render: (text) => {
          return (<span>{text.join(' - ')}</span>);
        },
      },
      {
        title: '作曲',
        dataIndex: 'composer',
        key: 'composer',
        render: (text) => {
          return (<span>{text.join(' - ')}</span>);
        },
      },
      {
        title: '编曲',
        dataIndex: 'arranger',
        key: 'arranger',
        render: (text) => {

          return (<span>{text.join(' - ')}</span>);
        },
      }, {
        title: '制片人',
        dataIndex: 'producer',
        key: 'producer',
        render: (text) => {
          return (<span>{text.join(' - ')}</span>);
        },
      },
      {
        title: '播放量',
        dataIndex: 'play',
        key: 'play',
      },
      {
        title: '时长',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '标签',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
          <span>
      {tags.map(tag => {
        let color = tag.length > 5 ? 'geekblue' : 'green';
        if (tag === 'loser') {
          color = 'volcano';
        }
        return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
      })}
    </span>
        ),
      }];

    const data = [
      {
        key: '1',
        title: '屋顶',
        singer: ['周杰伦'],
        author: ['方文山'],
        composer: ['周杰伦'],
        arranger: ['周杰伦'],
        producer: ['萧十一郎'],
        play: 20000,
        time: '3:25',
        tags: ['nice', 'developer'],
      }, {
        key: '2',
        title: '往后余生',
        singer: ['孙茜茹', '马良'],
        author: ['方文山'],
        composer: ['马良'],
        arranger: ['马良'],
        producer: ['刘凤瑶'],
        time: '3:25',
        play: 20000,
        tags: ['loser'],
      }, {
        key: '3',
        title: '一曲相思',
        singer: ['半阳'],
        author: ['半阳'],
        composer: ['可泽'],
        arranger: ['可泽'],
        producer: ['可泽'],
        time: '3:25',
        play: 20000,
        tags: ['cool', 'teacher'],
      }];

    const infoData = [
      {
        key: 'inf1',
        title: '唐伯虎点秋香2019 (Flirting Scholar from the Future )',
        poster: 'https://extraimage.net/images/2019/02/27/08d7a330e6b843e41bbc6a59e64d3743.jpg',
        staring: [
          {
            name: '刘德华',
            avatar: 'http://www.stat-nba.com/image/playerImage/1862.jpg',
            id: 'xxx',
          },
          {
            name: '刘德华',
            avatar: 'http://am-cdn-s0.b0.upaiyun.com/upload/avatar/1960/837/731/54593ab0dabfaeb0fe35163a.jpeg!160',
            id: 'xxx',
          },
          {
            name: '刘德华',
            avatar: 'http://am-cdn-s0.b0.upaiyun.com/upload/avatar/771/1913/435/54270bc4dabfaebcea26190b.jpeg!160',
            id: 'xxx',
          },
          {
            name: '刘德华',
            avatar: 'http://www.stat-nba.com/image/playerImage/1862.jpg',
            id: 'xxx',
          },
          {
            name: '刘德华',
            avatar: 'http://www.stat-nba.com/image/playerImage/1862.jpg',
            id: 'xxx',
          },
          {
            name: '刘德华',
            avatar: 'http://am-cdn-s0.b0.upaiyun.com/upload/avatar/1960/837/731/54593ab0dabfaeb0fe35163a.jpeg!160',
            id: 'xxx',
          },
          {
            name: '刘德华',
            avatar: 'http://am-cdn-s0.b0.upaiyun.com/upload/avatar/771/1913/435/54270bc4dabfaebcea26190b.jpeg!160',
            id: 'xxx',
          },
          {
            name: '刘德华',
            avatar: 'http://www.stat-nba.com/image/playerImage/1862.jpg',
            id: 'xxx',
          },
          {
            name: '刘德华',
            avatar: 'http://www.stat-nba.com/image/playerImage/1862.jpg',
            id: 'xxx',
          },
          {
            name: '刘德华',
            avatar: 'http://am-cdn-s0.b0.upaiyun.com/upload/avatar/1960/837/731/54593ab0dabfaeb0fe35163a.jpeg!160',
            id: 'xxx',
          },
          {
            name: '刘德华',
            avatar: 'http://am-cdn-s0.b0.upaiyun.com/upload/avatar/771/1913/435/54270bc4dabfaebcea26190b.jpeg!160',
            id: 'xxx',
          },
          {
            name: '刘德华',
            avatar: 'http://www.stat-nba.com/image/playerImage/1862.jpg',
            id: 'xxx',
          },
          {
            name: '刘德华',
            avatar: 'http://www.stat-nba.com/image/playerImage/1862.jpg',
            id: 'xxx',
          },
          {
            name: '刘德华',
            avatar: 'http://am-cdn-s0.b0.upaiyun.com/upload/avatar/1960/837/731/54593ab0dabfaeb0fe35163a.jpeg!160',
            id: 'xxx',
          },
          {
            name: '刘德华',
            avatar: 'http://am-cdn-s0.b0.upaiyun.com/upload/avatar/771/1913/435/54270bc4dabfaebcea26190b.jpeg!160',
            id: 'xxx',
          },
          {
            name: '刘德华',
            avatar: 'http://www.stat-nba.com/image/playerImage/1862.jpg',
            id: 'xxx',
          },
        ],
      },
      {
        key: 'inf2',
        title: '唐伯虎点秋香2019 (Flirting Scholar from the Future )',
        poster: 'https://extraimage.net/images/2019/02/27/08d7a330e6b843e41bbc6a59e64d3743.jpg',
        staring: [
          {
            name: '刘德华',
            avatar: 'http://www.stat-nba.com/image/playerImage/1862.jpg',
            id: 'xxx',
          },
          {
            name: '刘德华',
            avatar: 'http://www.stat-nba.com/image/playerImage/1862.jpg',
            id: 'xxx',
          },
        ],
      },
      {
        key: 'inf3',
        title: '唐伯虎点秋香2019 (Flirting Scholar from the Future )',
        poster: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        staring: [
          {
            name: '刘德华',
            avatar: 'http://www.stat-nba.com/image/playerImage/1862.jpg',
            id: 'xxx',
          },
          {
            name: '刘德华',
            avatar: 'http://am-cdn-s0.b0.upaiyun.com/upload/avatar/1960/837/731/54593ab0dabfaeb0fe35163a.jpeg!160',
            id: 'xxx',
          },
          {
            name: '刘德华',
            avatar: 'http://am-cdn-s0.b0.upaiyun.com/upload/avatar/771/1913/435/54270bc4dabfaebcea26190b.jpeg!160',
            id: 'xxx',
          },
          {
            name: '刘德华',
            avatar: 'http://www.stat-nba.com/image/playerImage/1862.jpg',
            id: 'xxx',
          },
          {
            name: '刘德华',
            avatar: 'http://www.stat-nba.com/image/playerImage/1862.jpg',
            id: 'xxx',
          },
          {
            name: '刘德华',
            avatar: 'http://am-cdn-s0.b0.upaiyun.com/upload/avatar/1960/837/731/54593ab0dabfaeb0fe35163a.jpeg!160',
            id: 'xxx',
          },
          {
            name: '刘德华',
            avatar: 'http://am-cdn-s0.b0.upaiyun.com/upload/avatar/771/1913/435/54270bc4dabfaebcea26190b.jpeg!160',
            id: 'xxx',
          },
          {
            name: '刘德华',
            avatar: 'http://www.stat-nba.com/image/playerImage/1862.jpg',
            id: 'xxx',
          },
          {
            name: '刘德华',
            avatar: 'http://www.stat-nba.com/image/playerImage/1862.jpg',
            id: 'xxx',
          },
          {
            name: '刘德华',
            avatar: 'http://am-cdn-s0.b0.upaiyun.com/upload/avatar/1960/837/731/54593ab0dabfaeb0fe35163a.jpeg!160',
            id: 'xxx',
          },
          {
            name: '刘德华',
            avatar: 'http://am-cdn-s0.b0.upaiyun.com/upload/avatar/771/1913/435/54270bc4dabfaebcea26190b.jpeg!160',
            id: 'xxx',
          },
          {
            name: '刘德华',
            avatar: 'http://www.stat-nba.com/image/playerImage/1862.jpg',
            id: 'xxx',
          },
          {
            name: '刘德华',
            avatar: 'http://www.stat-nba.com/image/playerImage/1862.jpg',
            id: 'xxx',
          },
          {
            name: '刘德华',
            avatar: 'http://am-cdn-s0.b0.upaiyun.com/upload/avatar/1960/837/731/54593ab0dabfaeb0fe35163a.jpeg!160',
            id: 'xxx',
          },
          {
            name: '刘德华',
            avatar: 'http://am-cdn-s0.b0.upaiyun.com/upload/avatar/771/1913/435/54270bc4dabfaebcea26190b.jpeg!160',
            id: 'xxx',
          },
          {
            name: '刘德华',
            avatar: 'http://www.stat-nba.com/image/playerImage/1862.jpg',
            id: 'xxx',
          },
        ],
      },
      {
        key: 'inf4',
        title: '唐伯虎点秋香2019 (Flirting Scholar from the Future )',
        poster: 'https://extraimage.net/images/2019/02/27/08d7a330e6b843e41bbc6a59e64d3743.jpg',
        staring: [
          {
            name: '刘德华',
            avatar: 'http://www.stat-nba.com/image/playerImage/1862.jpg',
            id: 'xxx',
          },
          {
            name: '刘德华',
            avatar: 'http://www.stat-nba.com/image/playerImage/1862.jpg',
            id: 'xxx',
          },
        ],
      },
    ];


    return (
      <div className={styles.artistDesc}>
        <Header/>
        <div>
          <StarDescHeader/>
        </div>
        <div className={styles.artistDescContent}>

          <Tabs onChange={this.onChangeTab}>
            <TabPane tab="最新新闻" key={1}>
              {tabKey.toString() === '1' &&
              <StarDescNews/>
              }
            </TabPane>

            <TabPane tab="个性标签" key={2}>
              {tabKey.toString() === '2' &&
              <WordCloudChart/>
              }
            </TabPane>

            <TabPane tab="影视作品" key={3}>
              <div >
                <List
                  key={uuid()}
                  itemLayout="horizontal"
                  dataSource={infoData}
                  renderItem={(item) => {
                    return (
                      <List.Item key={item.id}>
                        <List.Item.Meta
                          key={uuid()}
                          avatar={<img style={{ width: '120px', height: '150px' }} src={item.poster}/>}
                          title={<a href="#">{item.title}</a>}
                          description={<Description infoData={item}/>}
                        />
                      </List.Item>
                    );
                  }}
                />
              </div>
            </TabPane>


            <TabPane tab="音乐作品" key={4}>
              <Table columns={columns} dataSource={data} key={(item) => item.key}/>
            </TabPane>


            <TabPane tab="人物关系" key={5}>
              {tabKey.toString() === '5' &&
              <RelationChart/>
              }
            </TabPane>
            <TabPane tab="个人荣誉" key={6}>
              {tabKey.toString() === '6' &&
              <HonorChart/>
              }
            </TabPane>
            <TabPane tab="生涯资薪" key={7}>
              {tabKey.toString() === '7' &&
              <SalaryChart/>
              }
            </TabPane>

          </Tabs>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default ArtistDesc;
