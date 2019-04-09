/**
 * Created by ranyanchuan on 2018/3/11.
 */
import { request } from 'utils/request';
import { api } from 'utils/config';

export async function getStar(payload) {
  const {category,gql}=payload;
  return request(api.getStar.replace(':category', category), {
    method: 'POST',
    body: JSON.stringify({gql}),
  });
}
