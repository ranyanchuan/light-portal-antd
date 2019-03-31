/**
 * Created by ranyanchuan on 2018/3/11.
 */
import * as adminBasketballService from '../services/adminBasketballService';
import * as StarService from '../services/starService';

export default {
  namespace: 'adminBasketball',
  state: {
    basicObj:null,
  },
  effects: {
    // 添加篮球明星基本信息
    * addBasic({ payload, callback }, { call ,put}) {
      const res = yield call(adminBasketballService.addBasic, payload);
      if (callback) callback(res);
      yield put({ type: 'addBasicSuccess', res });
    },

    * queryBasic({ payload, callback }, { call,put }) {
      const res = yield call(adminBasketballService.queryBasic, payload);
      if (callback) callback(res);
      yield put({ type: 'getBasicSuccess', res });

    },



  },
  reducers: {
    getStarSuccess(state, { res}) {
      console.log(res)
      return { ...state };
    },


    getBasicSuccess(state, { res}) {
      const {data}=res;
      return { ...state,basicObj:data };
    },

  },
};

