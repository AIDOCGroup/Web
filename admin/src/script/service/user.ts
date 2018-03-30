import { Service } from "./service";
import { Constant } from "../constant";

export class UserService extends Service{

    getUserItems(page: number, size: number,  start: string, end: string) {
        return this.request.get(`/admin/userswitharea?p=${page}&p_size=${size}&start_time=${start}&end_time=${end}`);
    }

}