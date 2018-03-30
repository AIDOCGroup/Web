import axios from 'axios'
import { Request } from "./request";

export class Service {

    request: Request;

    constructor() {
        this.request = Request.getInstance();
    }

}