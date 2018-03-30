import { Request } from './../script/service/request';

declare const KLUser;

document.write(`<header id='PageHeader'></header>`);

let pageHeader = document.getElementById('PageHeader'),
    headerHTML = require('./header.jade')();

if(!((window as any).KLUser)) {
    
    document.write(`<script src="//cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>`);
}        

window.onload = () => {
    
    pageHeader.innerHTML = headerHTML;

    let toLogin = () => {

        let username = prompt('请输入用户名'),
            password = prompt('请输入密码');
        
        $.ajax({ 
            url: '/api/account/login', 
            method: 'POST',
            data: {
                username: username,
                password: password,
                type: 9
            },
            async: false,
            beforeSend: function(request) {
                request.setRequestHeader("X-CLIENT", "1");
            },
            success: (response) => {
            },
            error: (error) => {
                if(confirm('登录失败, 请重新登录')) {
                    toLogin();
                }
            }
        })

    }

    if(!((window as any).KLUser)) {

        $.ajax({ 
            url: '/api/account/current', 
            method: 'GET',
            async: false,
            beforeSend: function(request) {
                request.setRequestHeader("X-CLIENT", "1");
            },
            success: (response) => {
                (window as any).KLUser = response;
            },
            error: (error) => {
                toLogin();
            }
        })

    }

}





