import type { VariantType } from './variant.type';

export interface CateringType {
	id: string,
	title: string,
	imageLink: string | null,
	price: number,
	is_closed: boolean,
	description: string,
	weightPortion: string,
	merchant: string,
	date: string,
	order_count: number,
	created_by: {
		username: string
		role: string
		store_name: string
	},
	catering_variants: VariantType[]
}