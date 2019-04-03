/**
 * Created by ranyanchuan on 2018/3/11.
 */

module.exports = {
  api: {

    addCommon: '/api/common/add/:table',
    delCommon: '/api/common/del/:table',
    updCommon: '/api/common/update/:table',

    getStar: '/api/star/query/:category',
    getScore: '/api/score/query/:category',
    addBasic: '/api/star/basic/add/',
    queryBasic: '/api/star/basic/query/',
    updateBasic: '/api/star/basic/update/',

  },
};
