/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import Header from 'components/header/index';
import Footer from 'components/footer/index';
import aiUrl from 'assets/img/ai_history.jpg';

import styles from './index.less';

class AIHistory extends React.Component {

  state = {
    loading: true,
  };


  render() {

    return (
      <div className={styles.AIHistory}>
        <Header/>
        <div>
          <img src={aiUrl} alt="人工智能历史" style={{ width: '100%' }}/>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default AIHistory;
