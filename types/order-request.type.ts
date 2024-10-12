import type { OrderRequestVariantDetailType } from './order-request-variant-detail.type';

export interface OrderRequestType {
	catering_id: string,
	variants: OrderRequestVariantDetailType[],
	notes: string,
}