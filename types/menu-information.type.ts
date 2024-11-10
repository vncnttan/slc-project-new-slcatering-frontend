import type { VariantType } from '../../types/variant.type';

export interface MenuInformationType {
	imageLink: string,
	title: string,
	date: string,
	stock: string,
	description: string,
	weightPortion: string,
	price: string,
	catering_variants: VariantType[],
}