import { api } from "src/api"
import type {
	GetParams,
	ParamId,
	Response,
	ResponseData,
	ResponseSingleData
} from "../shared"
import { PrintDetail, PrintDetailForm } from "./print-details"
import type {
	ProductResponse,
	ProductForm,
	ProductItem
} from "./products.types"

class ProductsService {
	get = async (params: GetParams): Promise<Response<ProductItem>> => {
		const response = await api.get("/products", { params })
		return response.data
	}
	getById = async (params: GetParams): Promise<ProductResponse> => {
		const { id, ...param } = params
		const response = await api.get(`/products/${id}`, { params: param })
		return response.data
	}
	getPrintDetailsById = async (
		id: ParamId
	): Promise<ResponseData<PrintDetail>> => {
		const response = await api.get(`/products/${id}/print-types`)
		return response.data
	}
	create = async (form: ProductForm): Promise<ResponseData<PrintDetail>> => {
		const response = await api.post(`/products`, form)
		return response.data
	}
	updatePrice = async (
		id: ParamId,
		sell_price: string
	): Promise<ResponseSingleData<ProductItem>> => {
		const response = await api.patch(`/products/${id}`, {
			sell_price: sell_price
		})
		return response.data
	}
	createPrintDetailsById = async (
		id: ParamId,
		form: PrintDetailForm
	): Promise<ResponseSingleData<PrintDetail>> => {
		const response = await api.post(`/products/${id}/print-details`, form)
		return response.data
	}
}

export const productsService = new ProductsService()
