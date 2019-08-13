import request from '@/utils/request'

export const login = ({
  mobile,
  code
}) => {
  return request.post('/app/v1_0/authorizations', {
    mobile,
    code
  })
}

/**
 *拉黑用户
 * @param {*} 用户的id
 */
export const blackUserList = (id) => {
  return request.post('/app/v1_0/article/reports', {
    target: id
  })
}
