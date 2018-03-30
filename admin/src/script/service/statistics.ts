import { Service } from "./service";
import { Constant } from "../constant";

export class StatisticsService extends Service{

    getStatisticsItems(page: number, size: number,order:number, keyword: string, state: number=0) {
        return this.request.get(`/getStepAidocInfo?p=${page}&timeorder=${order}&aidocorder=${order}&steporder=${order}&p_size=${size}&keyword=${keyword}&state=${state}`);
    }

}

