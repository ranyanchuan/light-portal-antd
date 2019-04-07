/**
 * Created by ranyanchuan on 2018/3/11.
 */
import * as commonService from '../services/commonService';

export default {
  namespace: 'common',
  effects: {
    // 通用添加
    * add({ payload, callback }, { call, put }) {
      const res = yield call(commonService.addCommon, payload);
      if (callback) callback(res);
    },

    // 通用删除
    * del({ payload, callback }, { call, put }) {
      const res = yield call(commonService.delCommon, payload);
      if (callback){
        callback(res);
      }
    },
    // 通用更新
    * upd({ payload, callback }, { call, put }) {
      const res = yield call(commonService.updCommon, payload);
      if (callback) callback(res);
    },

    // 通用查询
    * query({ payload, callback }, { call, put }) {
      const res = yield call(commonService.queryCommon, payload);
      if (callback) callback(res);
    },

  },
};

