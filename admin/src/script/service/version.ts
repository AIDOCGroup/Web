import { Service } from "./service";

export class VersionService extends Service {

    getVersionItems() {
        return this.request.get('/admin/version/getVersionList');
    }

    getVersion(versionId: number) {
        return this.request.get(`/admin/version/${versionId}`);
    }

    createVersion(version: any) {
        return this.request.post('/admin/version', version);
    }

    updateVersion(version: any) {
        return this.request.put(`/admin/version/${version.id}`, version);
    }

    deleteVersion(versionId: number) {
        return this.request.delete(`/admin/version/${versionId}`);
    }

}