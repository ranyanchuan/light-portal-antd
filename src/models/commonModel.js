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
      const {data} = yield call(commonService.delCommon, payload);
      if (callback){
        callback(data);
      }
    },
    // 通用更新
    * upd({ payload, callback }, { call, put }) {
      const res = yield call(commonService.updCommon, payload);
      if (callback) callback(res);
    },
  },
};
