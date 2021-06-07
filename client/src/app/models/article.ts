import { Source } from "./source";

export class Article{
    articleID: number;
    title: string;
    original_url: string;
    description: string;
    type: string; 
    content: string;
    published_date: string;
    source: Source;
    type_of_content: string;
    image_url: string;
    keywords:string[];
}

