import axios from 'axios';

let base = '';
//用户管理
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

//推荐文章管理
export const getRecommendList = params => { return axios.get(`${base}/recommend/list`, { params: params }); };

export const getRecommendListPage = params => { return axios.get(`${base}/recommend/listpage`, { params: params }); };

//文章管理
export const getArticleList = params => { return axios.get(`${base}/article/list`, { params: params }); };

export const getArticleListPage = params => { return axios.get(`${base}/article/listpage`, { params: params }); };