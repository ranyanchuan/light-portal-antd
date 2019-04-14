/**
 * Created by ranyanchuan on 2018/3/11.
 */

module.exports = {
  api: {

    addFile:'http://127.0.0.1:27000/api/file/add/',

    addCommon: '/api/common/add/:table',
    delCommon: '/api/common/del/:table',
    updCommon: '/api/common/update/:table',
    queryCommon: '/api/common/query/:table',

    getStar: '/api/star/query/:category',
    getScore: '/api/score/query/:category',
    addBasic: '/api/star/basic/add/',
    queryBasic: '/api/star/basic/query/',
    updateBasic: '/api/star/basic/update/',

  },

  fileClassifyData:["喜剧","奇幻","古装",], // 电影类型
  languageData:["中文","英文"], // 语言类型



};
