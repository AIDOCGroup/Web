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
    code: any = [];

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
    loadSubmit(userId,channel,status) {
        HttpService.Invitation.getSubmitItems(userId,channel,status).then((response:any) => {
            this.code = response.content;
            this.scopeApply();
        });
    }
    loadDisable(codes) {
        HttpService.Invitation.getDisableItems(codes).then((response:any) => {
            this.able = response.list[0];
            this.scopeApply();
        });
    }
    loadUpsubmit(code1,status1){

        HttpService.Invitation.getUpsubmitItems(code1,status1).then((response:any) => {
            this.scopeApply();
        });
    }

    //预览
    preview(codes){
        this.loadDisable(codes);
        $("#preview").qrcode({
            render : "canvas",    //设置渲染方式，有table和canvas，使用canvas方式渲染性能相对来说比较好
            //makeCode(codes),
            text : "http://192.168.8.101/?"+codes,    //扫描二维码后显示的内容,可以直接填一个网址，扫描二维码后自动跳向该链接
            width : "100",               //二维码的宽度
            height : "100",              //二维码的高度
            background : "#ffffff",       //二维码的后景色
            foreground : "#000000",        //二维码的前景色
        });

    }
    previews(codes){
        this.loadDisable(codes);
        $('#preview').html("预览")
    }


    updates(){
        //this.loadStart(Id);
        document.getElementById("show").style.display="block";
    }
    dismiss(){
        document.getElementById("show").style.display="none";
    }
    dismisss(){
        document.getElementById("show_able").style.display="none";
    }
    upable(codes){
        document.getElementById("show_able").style.display="block";
        this.loadDisable(codes)
    }
    upsubmit(){
        var code1 = $("#code").text();
        var status1=$('input:radio[name="Sad"]:checked').val();
        this.loadUpsubmit(code1,status1);
        document.getElementById("show_able").style.display="none";
    }
    //添加提交
    submit(){
        /*var code = $("#sex").val();*/
        var userId =document.getElementById("run").value;
        var channel =document.getElementById("runs").value;
        var status=$('input:radio[name="Rad"]:checked').val();
        if(userId=="请选择"||channel=="请选择"||status==null){
            alert("请完善信息！")
        }else{


            this.loadSubmit(userId,channel,status)
            document.getElementById("show").style.display="none";
            window.location.reload();
        }

    }


}

















