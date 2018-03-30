import { Service } from "./service";
import { Constant } from "../constant";

export class InvitationService extends Service{

   getInvitationItems() {
        return this.request.get(`/invitation/getAllInvitationNum?`);
    }
    //列表
   getInvitationsItems(page: number, size: number, keyword: string, state: number=0) {
        return this.request.get(`/invitation/getInvitationList?p=${page}&p_size=${size}&keyword=${keyword}&state=${state}`);
    }
    //邀请渠道
   getInvitItems() {
        return this.request.get(`/invitation/getChannelList?`);
    }
    //邀请人名字
    getInItems() {
        return this.request.get(`/invitation/getOperateList?`);
    }
    //可用禁用
    //getDisableItems() {
       // return this.request.get(`/invitation/setInvitationStatus?invitation_code=1&status=1`);
    //}status
    //提交
    getSubmitItems(userId:number,code:string,channel:string,status:number) {
       return this.request.get(`/invitation/addCustomInvitation?user_id=${userId}&invitation_code=${code}&channel=${channel}&status=${status}`);
    }

}

