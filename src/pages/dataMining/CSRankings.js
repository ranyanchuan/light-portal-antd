/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import Header from 'components/header/index';
import Footer from 'components/footer/index';
import aiUrl from 'assets/img/ai_history.jpg';

import styles from './index.less';

class CSRankings extends React.Component {

  state = {
    loading: true,
  };

  render() {

    return (
      <div className={styles.CSRankings}>
        <Header/>
        <div>
          <h2>2008年至2018年CSrankings全球计算机科学专业排名综合榜单</h2>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default CSRankings;
