import { api } from "src/api"
import type { GetParams, Response } from "src/services/shared"
import { Debtor } from "./debtors.types"

class DebtorsService {
	get = async (params: GetParams): Promise<Response<Debtor>> => {
		const response = await api.get(`/debtors`, { params })
		return response.data
	}

	patchDueDate = async (id: number, due_date: string | null): Promise<Debtor> => {
		const response = await api.patch(`/debtors/${id}`, { due_date })
		return response.data
	}
}

export const debtorsService = new DebtorsService()
