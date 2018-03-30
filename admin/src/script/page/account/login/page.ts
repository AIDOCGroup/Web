import { Page, Route } from "../../page";
import { HttpService } from "../../../service/http";

@Route('/account/login', 'account-login', require('./view.html'), false)
export class AccountLoginPage extends Page {

    username: string;
    password: string;

    login() {

        HttpService.Account.login(this.username, this.password).then((response: any)=> {
            window.localStorage.setItem("access-token", response.token);
            window.location.href = './dashboard'
        });

    }

}
