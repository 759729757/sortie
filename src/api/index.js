import axios from 'axios';

export let _base = 'https://wechat.studiosortie.com';

export const loginByCode = params =>{return axios.get(`${_base}/loginByCode` ,{params:params}).then(res=>res.data); };

//获取杂志
export const getMagazine = params => { return axios.get(`${_base}/fetchMagazine` ,{params:params}).then(res=>res.data); };



