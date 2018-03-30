import { Service } from "./service";
import { Constant } from "../constant";

export class KfzService extends Service{

    getKfzItems(page: number, size: number, keyword: string, state: number=0) {
        return this.request.get(`/kfz/getKfzHistoryList?p=${page}&p_size=${size}&keyword=${keyword}&state=${state}`);
    }
    getKfzDetail(Id){
        return this.request.get(`/kfz/getKfzHistory?session_id=${Id}`);
    }
}

