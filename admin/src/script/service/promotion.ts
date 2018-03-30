import { Service } from "./service";
import { Constant } from "../constant";

export class PromotionService extends Service{

    getPromotionItems(page: number,size: number, keyword: string, state: number=0) {
        return this.request.get(`/manager/aidoc/1?page=${page}&page_size=${size}&keyword=${keyword}&state=${state}`);
    }

}
