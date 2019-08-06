/**
 * Created by yqr on 2018/4/13.
 */
import * as API from './'

export default {
  //登录
  login: params => {
    // return "success";
    return API.GET('/user/login', params)
  },
  //登出
  logout: params => {
    return "success";
    //return API.GET('/api/users/logout', params)
  },

  getList: params => {
    return API.GET('/user/getList', params)
  },

  searchList: params => {
    return API.GET('/user/searchList', params)
  },

  deleteUser: params => {
    return API.GET('/user/deleteUser', params)
  },

  getUser: params => {
    return API.GET('/user/getUser', params)
  },

  getInstitutions: params => {
    return API.GET('/institutions/getInstitutions', params)
  },

  updateUser: params => {
    return API.POST('/user/updateUser', params)
  },

  getLogList: params => {
    return API.GET('/log/getList', params)
  },

  deleteLog: params => {
    return API.GET('/log/deleteLog', params)
  },

  searchLogList: params => {
    return API.GET('/log/searchLog', params)
  },

  deleteListUser: params => {
    return API.POST('/user/deleteListUser', params)
  },

  deleteListLog: params => {
    return API.POST('/log/deleteListLog', params)
  },

  getNotAcceptedList: params => {
    return API.GET('/user/getNotAcceptedList', params)
  },

  acceptedUser: params => {
    return API.GET('/user/acceptedUser', params)
  },

  getInstitutionsList: params => {
    return API.GET('/institutions/getInstitutionsList', params)
  },

  updateInstitutions: params => {
    return API.POST('/institutions/updateInstitutions', params)
  },

  removeInstitutions: params => {
    return API.GET('/institutions/removeInstitutions', params)
  },

  getAttendanceList: params => {
    return API.GET('/attendance/getAttendanceList', params)
  },

  updateAttendance: params => {
    return API.POST('/attendance/updateAttendance', params)
  },

  searchAttendance: params =>{
    return  API.GET('/attendance/searchAttendance', params)
  },

  addInstitutions: params => {
    return API.GET('/institutions/addInstitutions', params)
  },

  insertAttendance: params => {
    return API.GET('/attendance/insertAttendance', params)
  },

  insertListAttendance: params => {
    return API.POST('/attendance/insertListAttendance', params)
  },

  getAllInstitutions :params => {
    return API.GET('//institutions/getAllInstitutions', params)
  },

  getUsetListByInstitutionsId: params => {
    return API.GET('/user/getUsetListByInstitutionsId', params)
  },

  getCurrentUser: params => {
    return API.GET('/user/getCurrentUser', params)
  }

}
