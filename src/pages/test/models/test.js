/**
 * Created by ranyanchuan on 2018/3/11.
 */
// import * as StarService from '../services/starService';

export default {
  namespace: 'test',
  state: {
    "ddd":'dddd'
  },
  effects: {
    * getStar({ payload, callback }, { call }) {
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

