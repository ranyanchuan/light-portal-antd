var echarts = require('echarts');
;

/**
 /**
 * 生成唯一字符串
 */
export function uuid() {
  const s = [];
  const hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i += 1) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = '-';
  s[13] = '-';
  s[18] = '-';
  s[23] = '-';
  return s.join('');
}


export function randomObjArray(obj, len) {
  let arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(obj);
  }
  return arr;
}


// 添加 status 和  uid
export function  addUidList(fileUrlList)  {

  if(!fileUrlList || !Array.isArray(fileUrlList)){
    return fileUrlList
  }
  const filesUrl = fileUrlList.map((item, index) => {
    return { status: 'done', uid: index, url: item };
  });
  return filesUrl;
};


export function randomNum(m, n) {
  return Math.floor(Math.random() * (m - n) + n);
}


export function clearQuotationMark(data) {
  // json的值将被临时储存在这个变量中
  let keyValue = '';
  // 处理好的json字符串
  for (let key in data) {
    keyValue += key + ':' + JSON.stringify(data[key]) + ',';
  }
  // 去除最后一个逗号
  keyValue = keyValue.substring(0, keyValue.length - 1);
  return '{' + keyValue + '}';

}


//
export function domain2key(data) {
  const artist = {
    'actor': '演员',
    'singer': '歌手',
    'host': '主持人',
    'director': '导演',
    'model': '模特',
  };

  const result=[];
  for (let domain of data) {
    for (const item in artist) {
      if (artist[item] === domain) {
        domain = item;
      }
    }
    result.push(domain);
  }
  return result;
}


/**
 * 生成雷达图
 *
 * data和id
 *
 */

export function initRadar(id) {
  const radarData =
    {
      legend: ['得分', '助攻', '篮板', '抢断', '盖帽'],
      data: [
        {
          'year': '2012',
          'score': 320,
          'assist': 120,
          'rebound': 220,
          'steal': 150,
          'block': 820,
        },
        {
          'year': '2013',
          'score': 302,
          'assist': 132,
          'rebound': 182,
          'steal': 212,
          'block': 832,
        },
        {
          'year': '2014',
          'score': 301,
          'assist': 101,
          'rebound': 191,
          'steal': 201,
          'block': 901,
        },
        {
          'year': '2015',
          'score': 334,
          'assist': 134,
          'rebound': 234,
          'steal': 154,
          'block': 934,
        },
        {
          'year': '2016',
          'score': 390,
          'assist': 90,
          'rebound': 190,
          'steal': 290,
          'block': 1290,
        },
      ],
    };

  // 对数据进行转换


  var myChart = echarts.init(document.getElementById(id));
  let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    legend: {
      data: ['得分', '助攻', '篮板', '抢断', '盖帽'],
      type: 'scroll',
      bottom: -0,
    },
    grid: {
      left: '40',
      right: '4%',
      bottom: '30',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'],

    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '得分',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'insideRight',
          },
        },
        data: [320, 302, 301, 334, 390, 330, 320],
      },
      {
        name: '助攻',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'insideRight',
          },
        },
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: '篮板',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'insideRight',
          },
        },
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: '抢断',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'insideRight',
          },
        },
        data: [150, 212, 201, 154, 190, 330, 410],
      },
      {
        name: '盖帽',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'insideRight',
          },
        },
        data: [820, 832, 901, 934, 1290, 1330, 1320],
      },
    ],
  };
  myChart.setOption(option);
};



