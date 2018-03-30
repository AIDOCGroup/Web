import { Constant } from './../constant';
import axios from 'axios';
import { usNameWithObject } from '../util';

declare var Promise: any;

export class Request {


    static _instance: Request;

    static getInstance() {
        this._instance || (this._instance = new Request());
        return this._instance;
    }

    constructor() {

        axios.interceptors.request.use(function (config) {
            config.headers['X-Token'] = localStorage.getItem('access-token');
            config.headers['X-Client'] = 'ADMIN';
            config.validateStatus = () => {
                return true;
            };
            if ((config as any).processData !== false) {
                config.data = usNameWithObject(config.data, true)
            }
            return config;
        });

        axios.interceptors.response.use( (response) => {
  
            if (response.status == 200) {
                return usNameWithObject(response.data, false);
            }
            else if (response.status == 405) {
                if(confirm("登录会话已失效，请重新登录")) {
                    window.location.href = "/aidoc-admin/account/login";
                }
            }
            else {
                alert(response.data.err_msg);
            }

            return Promise.reject(response);
        });

    }

    get(uri: string, config?:object) {
        return axios.get(Constant.HTTP_HOST+uri, config);
    }

    post(uri: string, data: any = {}, config?:object) {
        return axios.post(Constant.HTTP_HOST+uri, data, config);
    }

    put(uri: string, data?: any, config?:object) {
        return axios.put(Constant.HTTP_HOST+uri, data, config);
    }

    delete(uri: string, config?:object) {
        return axios.delete(Constant.HTTP_HOST+uri, config);
    }

}