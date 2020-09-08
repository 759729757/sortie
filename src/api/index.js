import axios from 'axios';

export let _base = 'https://wechat.studiosortie.com';

export const loginByCode = params =>{return axios.get(`${_base}/loginByCode` ,{params:params}).then(res=>res.data); };
export const getUserInfoByWechat = params =>{return axios.get(`${_base}/getUserInfoByWechat` ,{params:params}).then(res=>res.data); };

//获取杂志
export const getMagazine = params => { return axios.get(`${_base}/fetchMagazine` ,{params:params}).then(res=>res.data); };
//获取关于我们
export const getAbout = params => { return axios.get(`${_base}/fetchAbout` ,{params:params}).then(res=>res.data); };

export const getNews = params => { return axios.get(`${_base}/fetchNews` ,{params:params}).then(res=>res.data); };
export const findNewsByName = params => { return axios.get(`${_base}/findNewsByName` ,{params:params}).then(res=>res.data); };

export const userBuy = params => { return axios.get(`${_base}/userBuy` ,{params:params}).then(res=>res.data); };
export const userRecord = params => { return axios.get(`${_base}/userRecord` ,{params:params}).then(res=>res.data); };



