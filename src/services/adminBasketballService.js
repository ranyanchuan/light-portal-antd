import { request } from '../utils/request';
import { api } from '../utils/config';

export async function getStar(payload) {
  const {category,gql}=payload;
  return request(api.getStar.replace(':category', category), {
    method: 'POST',
    body: JSON.stringify({gql}),
  });
}

// 添加明星基本信息
export async function addBasic(payload) {
  return request(api.addBasic, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// 获取basic 基本信息
export async function queryBasic(payload) {
  const {gql}=payload;
  return request(api.queryBasic, {
    method: 'POST',
    body: JSON.stringify({gql}),
  });
}

// 更新basic 基本信息
export async function updateBasic(payload) {
  return request(api.updateBasic, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

