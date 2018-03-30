import { Service } from "./service";
import { Constant } from "../constant";

export class HealthyService extends Service{

    getHealthyItems(page: number, size: number,sum:number, keyword: string, state: number=0) {
        return this.request.get(`/mjk/getMjkInfo?p=${page}&p_size=${size}&datatype=${sum}&keyword=${keyword}&state=${state}`);
    }

}