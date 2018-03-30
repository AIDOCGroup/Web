export interface CategoryUnit{
    id: number;
    name: string;
    open: boolean;
    close: boolean;
    is_edit: boolean;
    parent_id: number;
    state: number;
    children: Array<Object>;
}