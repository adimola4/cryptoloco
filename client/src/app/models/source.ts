import { Article } from './article';
import { Category } from './category';

export class Source {
	sourceID: number;
	domain: string;
	title: string;
	website_url: string;
	description: string;
	type: string;
	keyword: string[];
	img_url: string;
	articles: Article[];
	category: Category;
}
