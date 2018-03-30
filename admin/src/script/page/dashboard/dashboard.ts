import { Route, Page } from "../page";

@Route('/dashboard', 'dashboard', require('./dashboard.jade')())
export class DashbaordPage extends Page {

  
    pageInit() {

        this.setTitle("Dashboard");
        
    }

}
