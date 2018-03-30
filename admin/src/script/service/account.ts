import { Service } from "./service";

export class AccountService extends Service{

    login(username: string, password: string) {
        return this.request.post('/account/login', {
            username: username,
            password: password
        });
    }

    getAdminItems() {
        return this.request.get('/admin/administrators');
    }

    getAdmin(adminId: number) {
        return this.request.get(`/admin/administrators/${adminId}`);
    }

    createAdmin(admin: any) {
        return this.request.post('/admin/administrators', admin);
    }

    updateAdmin(admin: any) {
        return this.request.put(`/admin/administrators/${admin.id}`, admin);
    }

    deleteAdmin(adminId: number) {
        return this.request.delete(`/admin/administrators/${adminId}`);
    }

    /**
     * 用户管理相关接口
     */

    getUserItems(page: number, state: number=0) {
        return this.request.get(`/admin/users?p=${page}&p_size=20`);
    }

}