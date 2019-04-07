import { request } from '../utils/request';
import { api } from '../utils/config';

// 添加
export async function addCommon(payload) {
  const {table}=payload;
  delete payload.table;
  return request(api.addCommon.replace(':table', table), {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}


// 更新
export async function updCommon(payload) {
  const {table}=payload;
  delete payload.table;
  return request(api.updCommon.replace(':table', table), {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// 删除
export async function delCommon(payload) {
  const {table}=payload;
  delete payload.table;
  return request(api.delCommon.replace(':table', table), {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// 查询
export async function queryCommon(payload) {
  const {table}=payload;
  delete payload.table;
  return request(api.queryCommon.replace(':table', table), {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

