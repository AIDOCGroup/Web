import { ArchiveService } from './archive';
import { AccountService } from './account';
import { FileService } from "./file";
import { UserService } from "./user";
import { StatisticsService } from "./statistics";
import { KfzService } from "./kfz";
import { HealthyService } from "./healthy";
import { InvitationService } from"./invitation"
import { SlideService } from "./slide";
import { CategoryService } from './category';
import { VersionService } from './version';
import { PromotionService } from './promotion';

export class HttpService {

    private static _file: FileService;
    private static _user: UserService;
    private static _slide: SlideService;
    private static _archive: ArchiveService;
    private static _category: CategoryService;
    private static _account: AccountService;
    private static _version: VersionService;
    private static _promotion:PromotionService;
    private static _statistics:StatisticsService;
    private static _kfz:KfzService;
    private static _healthy:HealthyService;
    private static _invitation:InvitationService;

    static get Invitation() {
        this._invitation || (this._invitation = new InvitationService());
        return this._invitation;
    }

    static get Healthy() {
        this._healthy || (this._healthy = new HealthyService());
        return this._healthy;
    }

    static get Kfz() {
        this._kfz || (this._kfz = new KfzService());
        return this._kfz;
    }

    static get Statistics() {
        this._statistics || (this._statistics = new StatisticsService());
        return this._statistics;
    }

    static  get Promotion(){
        this._promotion || (this._promotion = new PromotionService());
        return this._promotion;
    }


    static get File() {
        this._file || (this._file = new FileService());
        return this._file;
    }

    static get User() {
        this._user || (this._user = new UserService());
        return this._user;
    }

    static get Slide() {
        this._slide || (this._slide = new SlideService());
        return this._slide;
    }

    static get Archive() {
        this._archive || (this._archive = new ArchiveService());
        return this._archive;
    }

    static get Account() {
        this._account || (this._account = new AccountService());
        return this._account;
    }

    static get Version() {
        this._version || (this._version = new VersionService());
        return this._version;
    }
 
}