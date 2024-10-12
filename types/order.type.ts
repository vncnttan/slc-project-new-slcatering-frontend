export interface OrderType {
	id: string,
	catering: {
		id: string,
		price: number,
		title: string,
		date: string,
	},
	quantity: number,
	is_paid: boolean,
	notes: string,
	ordered_by: {
		id: string,
		username: string,
		role: string,
	},
	variant: {
		id: string,
		variant_name: string,
		additional_price: number,
	}
}