/**
 * Created by ranyanchuan on 2018/3/11.
 */

import * as StarService from '../../../services/starService';
import { randomObjArray } from '../../../utils';

export default {
  namespace: 'basketball',
  state: {
    descPlayer: [],
    rankPlayer: [],
  },
  effects: {
    * getDescList({ payload, callback }, { call, put }) {
      const initSkeleton = randomObjArray({ name: '99' }, 10);
      let res = { descPlayer: initSkeleton };
      yield put({ type: 'loadUpdateSuccess', res });
      res = yield call(StarService.getStar, payload);
      if (callback) callback(res);
      yield put({ type: 'getDescListSuccess', res });

    },
    * getRankList({ payload, callback }, { call, put }) {
      const res = yield call(StarService.getStar, payload);
      if (callback) callback(res);
      yield put({ type: 'getRankListSuccess', res });

    },
  },

  reducers: {

    loadUpdateSuccess(state, { res }) {
      return {
        ...state,
        ...res,
      };
    },


    getDescListSuccess(state, { res }) {
      const { data: { list } } = res;
      return {
        ...state,
        descPlayer: list,
      };
    },
    getRankListSuccess(state, { res }) {
      const { data: { list } } = res;
      return {
        ...state,
        rankPlayer: list,
      };
    },
  },
};


