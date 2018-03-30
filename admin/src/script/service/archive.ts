import { Service } from "./service";
import { Constant } from "../constant";

export class ArchiveService extends Service{

    getArchiveItems(categoryId: number) {
        return this.request.get(`/archives/categories/${categoryId}`);
    }

    getArchive(archiveId: number) {
        return this.request.get(`/archives/${archiveId}`);
    }

    createArchive(archive: any) {
        return this.request.post(`/archives/categories/${archive.categoryId}`, archive);
    }

    updateArchive(archive: any) {
        return this.request.put(`/archives/${archive.id}`, archive);
    }

    deleteArchive(archiveId: number) {
        return this.request.delete(`/archives/${archiveId}`);
    }

}