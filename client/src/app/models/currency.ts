import { Link } from "./link";

export class Currency {
	api_id: number;
	code: string;
	title: string;
	rank: number;
	market_cap_usd: string;
	description: string;
	price_usd: number;
	v24: number;
	p24: number;
	p1h: number;
	p7d: number;
	img_url: string;
	keywords: string[];
	links: Link[];
}
