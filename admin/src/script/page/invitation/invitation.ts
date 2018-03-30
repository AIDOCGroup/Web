import { Route, Page } from "../page";
import { HttpService } from './../../service/http';
import { Moment } from './../../util';
import { ArchiveEditModal } from "./modal/edit";
@Route('/invitation', 'invitation', require('./invitation.jade')())
export class InvitationPage extends Page {

    //总人数
    sum:any = [];
    invi:any = [];
    //邀请渠道
    Channe:any = [];
    able:any = [];
    namess:any = [];

    page:{
        size: number,
        count: number,
        current: number,
    } = {
        size: 10,
        count: 0,
        current: 1
    };
    pageInit(uibModal?:any) {
        this.setTitle("邀请人数");
        this.watch('page.current', () => {
            this.loadSum();
            this.loadData();
            this.loadChanne();
            this.loadName();
        });
    }
    //邀请渠道
    loadChanne() {
        HttpService.Invitation.getInvitItems().then((response:any) => {
            this.Channe = response.list;
            this.scopeApply();
        });
    }
    loadName() {
        HttpService.Invitation.getInItems().then((response:any) => {
            this.namess = response.list;
            this.scopeApply();
        });
    }

    loadSum() {
        HttpService.Invitation.getInvitationItems().then((response:any) => {
            this.sum = response.total;
            this.scopeApply();
        });
    }
    loadData() {
        HttpService.Invitation.getInvitationsItems(this.page.current, this.page.size,'').then((response:any) => {
            this.invi = response.list;
            this.page.count = response.count;
            this.scopeApply();
        });
    }
    loadSubmit(userId,code,channel,status) {
        HttpService.Invitation.getSubmitItems(userId,code,channel,status).then((response:any) => {
            this.scopeApply();
        });
    }
    //loadDisable() {
      //  HttpService.Invitation.getDisableItems().then((response:any) => {
       //     this.able = response.list;
       //    console.log(this.able)
        //    this.scopeApply();
       // });
   // }

    //upable(){
       // this.loadDisable()
   // }
    updates(){
        //this.loadStart(Id);
        document.getElementById("show").style.display="block";
    }
    dismiss(){
        document.getElementById("show").style.display="none";
    }
    submit(){

        var code = $("#sex").val();
        var userId =document.getElementById("run").value;
        var channel =document.getElementById("runs").value;
        var status=$('input:radio[name="Rad"]:checked').val();
        if(code==""||userId=="请选择"||channel=="请选择"||status==null){
            alert("请完善信息！")
        }else{
            this.loadSubmit(userId,code,channel,status)
            document.getElementById("show").style.display="none";
        }

    }


}














