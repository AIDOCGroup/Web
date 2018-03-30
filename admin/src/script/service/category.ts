import { Service } from "./service";
import { Constant } from "../constant";

export class CategoryService extends Service{

    getCategory() {
        return this.request.get('/categories');
    }

    createCategory(name: string, parent_id: number, state: number, open:boolean) {
        return this.request.post(`/categories`, {
            name: name,
            parent_id: parent_id
        })
    }
    editCategory(id: number, name: string){
        return this.request.put(`/categories/${id}/update`,{
            name: name
        })
    }


}