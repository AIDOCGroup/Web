interface Filmstrip{
    hash: string;
    title: string;
    file: string;
}
export interface CourseDetail {
    category_id: string;
    created_at: string;
    filmstrip_count: number;
    filmstrips: Array<Filmstrip>;
    id: number;
    system_created: boolean;
    thumb: string;
    title: string;
    updated_at: string;
    user_id: number;
}