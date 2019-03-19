/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { connect } from 'dva';
import {
  Form,
  List,
  Avatar,
  Skeleton,
  Row,
  Col,
  Icon,
  Tag,
  Tabs,
  Tooltip,
  Pagination,
  Input,
  Button,
  Select,
  Card,
} from 'antd';


import Header from 'components/header/index';
import Footer from 'components/footer/index';

import { uuid } from 'utils';
import { playerFilter, artistFilter, scholarFilter, sortObj, topPeople, dataTooltip } from 'utils/mockData';
import styles from './index.less';


const TabPane = Tabs.TabPane;
const Option = Select.Option;
const { Meta } = Card;


@Form.create()
@connect((state) => ({ basketball: state.basketball }))

class Basketball extends React.Component {

  state = {
    loading: true,
    defaultActiveKey: 'synthetical',
    checkedFilter: [{ key: 'nation', value: '中国' }, { key: 'gender', value: '男' }],
    starCategory: 'player',

  };


  componentDidMount() {
    this.getDescList();
    this.getRankList();
  }

  /**
   * 获取查询详情球星
   */
  getDescList = () => {
    const gql = `
        query {
               list(category:"basketball"){
                 id:_id,
                 name,
                 name_cn,
                 avatar,
                 wiki_baidu,
                 wiki
               }
             }
        `;
    this.props.dispatch({
      type: 'basketball/getDescList',
      payload: { gql, category: 'basketball' },
      callback: (res) => {
        this.setState({ loading: false });
      },
    });
  };


  onChangePage = (pageNumber) => {
    console.log('Page: ', pageNumber);
  };


  /**
   * 获取查询rank球星
   */
  getRankList = () => {
    const gql = `
        query {
               list(category:"basketball",size:40){
                 _id,
                 name,
                 name_cn,
                 avatar,
               }
             }
        `;
    this.props.dispatch({
      type: 'basketball/getRankList',
      payload: { gql, category: 'basketball' },
    });
  };


  onChangeTab = (value) => {
    console.log('value', value);
    this.setState({ defaultActiveKey: value });
  };

  // 选择不同明星
  onChangeStar = (param) => {
    this.setState({ starCategory: param.key, checkedFilter: [], defaultActiveKey: 'synthetical' });
  };


  IconText = ({ type, text }) => {
    
    const data = {
      tagList: [
        '勒布朗-詹姆斯', 'King James', 'LBJ', '天选之子', 'Lecarry', '勒布朗多',
        '划水詹', '帮主', '三旬老汉', '天之骄子', '小皇帝', '詹皇', '全能詹', '旧主杀手', '六步朗', '一星四射', '一猩四射',
      ],
      occupation: ['篮球'],
      hometown: '俄亥俄州阿克伦',
      numObj: {
        popularity: 10,
        competition: 10,
        honor: 11,
        age: 11,
        paper: 11,
        hIndex: 11,
        cited: 11,
        composition: 12,
        accept: 13,
      },
    };

    const { tagList, occupation, hometown, numObj } = data;

    const result = [];
    for (const numItem in numObj) {
      const tempTooltip = dataTooltip[numItem];
      tempTooltip.value = numObj[numItem];
      result.push(tempTooltip);
    }


    return (<div>
      <div>

        {result && result.length > 0 && result.map((item) => {
          const { title, letter, color, value } = item;
          return (
            <Tooltip placement="top" title={title}>
              <span
                className={styles.barFont}
                style={{ backgroundColor: color, border: '1px solid ' + color }}
              >
                {letter}
              </span>
              <span
                className={styles.barNum}
                style={{ border: '1px solid ' + color }}
              >
                {value}
              </span>
            </Tooltip>
          );
        })}
      </div>

      <div>
        <Icon type="bank" className={styles.iconPic}/>
        <span>{hometown}</span>
      </div>
      <div>
        <Icon type="appstore" className={styles.iconPic}/>
        <span>{occupation.join('--')}</span>
      </div>
      <div className={styles.tags}>
        {tagList && tagList.length > 0 && tagList.map((item) => {
          return <Tag><a href="#"></a>{item}</Tag>;
        })}
      </div>

    </div>);
  };


  MetaAvatar = (obj) => {
    const { src } = obj;
    return (<Avatar src={src}/>);
  };

  // 清空过滤条件
  onCloseTag = (index) => {
    const { checkedFilter } = this.state;
    checkedFilter.splice(index, 1);
    this.setState({ checkedFilter });
  };

  //添加过滤条件
  addFilter = (key, value) => {
    const { checkedFilter } = this.state;
    checkedFilter.push({ key, value });
    this.setState({ checkedFilter });

  };

  // 处理过滤条件，
  onDealFilterTitle = (filterData) => {
    const result = [];
    const { checkedFilter } = this.state;
    for (const filterItem of filterData) {
      const { key } = filterItem;
      let status = true;
      for (const checkedItem of checkedFilter) {
        if (key === checkedItem.key) {
          status = false;
          break;
        }
      }
      if (status) {
        result.push(filterItem);
      }
    }
    return result;
  };


  // 获取不同类型明星的过滤条件  临时处理

  getStarFilterData = (key) => {

    if (key === 'player') {
      return playerFilter;
    }
    if (key === 'artist') {
      return artistFilter;
    }
    if (key === 'scholar') {
      return scholarFilter;
    }
    return null;
  };


  render() {
    const { basketball, form } = this.props;
    const { getFieldDecorator } = form;
    let { descPlayer, rankPlayer } = basketball;
    const { loading, defaultActiveKey, checkedFilter, starCategory } = this.state;

    console.log('defaultActiveKey', defaultActiveKey);

    const IconText = this.IconText;
    const MetaAvatar = this.MetaAvatar; // 头像

    // 临时处理
    const tempData = this.getStarFilterData(starCategory);
    const filterData = tempData ? this.onDealFilterTitle(tempData) : null;

    const tabList = sortObj[starCategory];


    return (
      <div className={styles.basketball}>
        <Header/>
        <div className={styles.basketballList}>

          <div className={styles.searchTitle}>
            <div className={styles.search}>
              <Select size="large" labelInValue defaultValue={{ key: 'player' }} style={{ width: 120 }}
                      onChange={this.onChangeStar}>
                <Option value="player">运动员</Option>
                <Option value="artist">艺人</Option>
                <Option value="scholar">学者</Option>
              </Select>
              <div className={styles.inputStyle}>
                <Input placeholder="詹姆斯" size="large"/>
              </div>
              <div>
                <Button type="primary" size="large">搜索</Button>
              </div>
            </div>
          </div>

          <div className={styles.filter}>

            {/*过滤条件*/}
            {checkedFilter && checkedFilter.length > 0 &&
            <div key={uuid()} className={styles.filterRow}>
              <div className={styles.title}>条件：</div>
              <div className={styles.filterItemContent} style={{ marginLeft: '10px' }}>
                {checkedFilter.map((item, index) => {
                  return (
                    <Tag key={uuid()} color="blue" closable
                         onClose={this.onCloseTag.bind(this, index)}>{item.value}</Tag>
                  );
                })}
              </div>
            </div>
            }


            {filterData && filterData.length > 0 && filterData.map((filterRow) => {
              const { title, condition, key } = filterRow;
              return (
                <div key={uuid()} className={styles.filterRow}>
                  <div className={styles.title}>{title}：</div>
                  <div className={styles.filterItemContent}>
                    {condition.map((item) => {
                      const { value, num } = item;
                      return (
                        <span
                          key={uuid()}
                          className={styles.filterItem}
                          onClick={() => {
                            this.addFilter(key, value);
                          }}
                        >
                          <span>{value}</span>
                          <span>(</span>
                          <span className={styles.count}>{num}</span>
                          <span>)</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}


          </div>
          <div className={styles.tab}>

            <Tabs activeKey={defaultActiveKey} onChange={this.onChangeTab}>
              {tabList.map((item) => {
                const { title, key } = item;
                return (
                  <TabPane tab={title} key={key}></TabPane>
                );
              })}
            </Tabs>

          </div>


          <Row gutter={16}>
            <Col md={17}>
              <div className={styles.listPlayer}>
                <List
                  itemLayout="horizontal"
                  dataSource={descPlayer}
                  renderItem={(PlayerItem) => {
                    const { name, avatar, name_cn, id } = PlayerItem;
                    return (
                      <List.Item>
                        <Skeleton loading={loading} active avatar paragraph={{ rows: 4 }}>
                          <List.Item.Meta
                            avatar={<MetaAvatar src={avatar}/>}
                            title={<a href={'/starDesc/basketball/' + id}>{name + ' (' + name_cn + ')'}</a>}
                            description={<IconText type="test"/>}
                          />
                        </Skeleton>
                      </List.Item>
                    );
                  }}
                />
              </div>
              <div className={styles.page}>
                <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={this.onChangePage}/>
              </div>
            </Col>
            <Col md={7} style={{ textAlign: 'center' }}>
              <div className={styles.listAvatar}>
                <h2>风云人物</h2>
                <hr/>
                <div className={styles.topMan}>
                  {topPeople[starCategory] && topPeople[starCategory].map((item, index) => {
                    const { avatar, name } = item;
                    return (
                      <div className={styles.manInfo}>
                        <Avatar size={100} shape="square" shape="square" src={avatar} icon="user"/>
                        <h4><a href="">{name}</a></h4>
                      </div>
                    );
                  })}
                </div>

              </div>
            </Col>

          </Row>

        </div>
        <Footer/>
      </div>
    );
  }
}

export default Basketball;
