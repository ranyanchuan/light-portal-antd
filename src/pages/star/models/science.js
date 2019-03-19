/**
 * Created by ranyanchuan on 2018/3/11.
 */
import * as scienceService from '../services/index';

export default {
  namespace: 'science',
  state: {
    "ddd":'dddd'
  },
  effects: {
    * getScience({ payload, callback }, { call }) {
      console.log("---chuan---")
      // const data = yield call(StarService.getStar, payload);
      // if (callback) callback(data);
    },
  },

  reducers: {
    // getStarSuccess(state, { payload: { data } }) {
    //   console.log('data', data);
    //   return { ...state };
    // },
  },
};

