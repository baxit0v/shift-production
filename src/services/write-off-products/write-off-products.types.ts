import { Dayjs } from "dayjs"
import type { ProductItem } from "../products"

type WriteOffProduct = {
	id: number
	product: ProductItem
	date: string
	name: string
	meter: number
	amount: string | number
	meter_square: number
	created_at: string
	updated_at: string
}

type WriteOffProductForm = {
	id?: number
	product_id: number
	date: string | Dayjs
	name: string
	meter: number
	amount: string | number
}

export type { WriteOffProduct, WriteOffProductForm }
