import { Service } from "./service";
import { Constant } from "../constant";

export class SlideService extends Service{

    dashboard() {
        return this.request.get('/admin/analysis/slide/dashboard?type=1');
    }

    list(date: string) {
        return this.request.get(`/admin/slides?date=${date}`);
    }

    withUser(sortWith: string, sort: number, page: number, pageSize: number = 20) {
        return this.request.get(`/admin/users/slides?sort=${sort}&sort_with=${sortWith}&page=${page}&page_size=${pageSize}`);
    }

    withUserId(userId: number, page: number, pageSize: number = 20) {
        return this.request.get(`/admin/users/${userId}/slides?page=${page}&page_size=${pageSize}`);
    }

    courseDetail( id: number ) {
        return this.request.get(`/admin/slides/${id}`);
    }
    
}