export interface ITag {
    id: string;
    name: string;
    isPresented: boolean
}

export interface IPostItem {
    id: string;
    title: string;
    content: string;
    tags: ITag[];
    creationDate: string;
}