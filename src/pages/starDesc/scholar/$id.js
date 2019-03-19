/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { connect } from 'dva';

import { Form, Tabs } from 'antd';

import styles from './index.less';
import Header from 'components/header/index';
import Footer from 'components/footer/index';
import StarDescHeader from 'components/StarDescHeader/index';
import RelationChart from 'components/RelationChart/index';
import HonorChart from 'components/HonorChart/index';
import SalaryChart from 'components/SalaryChart/index';
import PaperList from 'components/PaperList/index';
import WordCloudChart from 'components/WordCloudChart/index';
import StarDescNews from 'components/StarDescNews/index';
import { uuid } from 'utils';


const TabPane = Tabs.TabPane;

@Form.create()
@connect((state) => ({ basketballScore: state.basketballScore }))


class ScholarDesc extends React.Component {

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


  render() {
    const { tabKey } = this.state;
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

            <TabPane tab="发表论文" key={3}>
              {tabKey.toString() === '3' &&
              <PaperList/>
              }
            </TabPane>
            <TabPane tab="人物关系" key={4}>
              {tabKey.toString() === '4' &&
              <RelationChart/>
              }
            </TabPane>
            <TabPane tab="个人荣誉" key={5}>
              {tabKey.toString() === '5' &&
              <HonorChart/>
              }
            </TabPane>
            <TabPane tab="生涯资薪" key={6}>
              {tabKey.toString() === '6' &&
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

export default ScholarDesc;
