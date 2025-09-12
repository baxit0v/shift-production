import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useMessage } from "src/hooks/use-message"
import type { GetParams, ResponseError } from "src/services/shared"
import { debtorsService } from "./debtors.service"
import { useTranslation } from "react-i18next"

const useGetDebtorsQuery = (params: GetParams) => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => debtorsService.get(params),
		queryKey: ["debtors", ...Object.values(params)],
		placeholderData: keepPreviousData,
		throwOnError: (error: ResponseError) => {
			message.error({
				message: error.message,
				description: error?.response?.data?.message
			})
			throw error
		}
	})
}


const useUpdateDueDateMutation = () => {
	const queryClient = useQueryClient()
	const { message } = useMessage()
	const { t } = useTranslation()

	return useMutation({
		mutationFn: ({ id, due_date }: { id: number; due_date: string | null }) =>
			debtorsService.patchDueDate(id, due_date),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["debtors"] })
			message.success({
				message: t("success"),
				description: t("due_date_updated"),
			})
		},
		onError: (error: ResponseError) => {
			message.error({
				message: t("error"),
				description: error?.response?.data?.message || t("update_failed"),
			})
		},
	})
}

export { useGetDebtorsQuery, useUpdateDueDateMutation }
