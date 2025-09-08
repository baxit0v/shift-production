import type { FC } from "react"
import { Table } from "src/components/ui/table"
import { Route } from "src/routes/_layout/reports/debtors"
import { Debtor, useGetDebtorsQuery } from "src/services/debtors"
import { useDebtorsColumns } from "../hooks/use-debtors-columns"
import { useTranslation } from "react-i18next"

const DebtorsTable: FC = () => {
	const {t} = useTranslation()
	const { page, limit } = Route.useSearch()
	const routeNavigate = Route.useNavigate()

	const {
		data: debtors,
		isLoading,
		isFetching
	} = useGetDebtorsQuery({
		page: page || 1,
		limit: limit || 10
	})

	const columns = useDebtorsColumns()
	return (
		<>
			<Table<Debtor>
				rowKey={(record) => record.id}
				title={t("menu.report_suppliers"	)}
				columns={columns}
				loading={isLoading || isFetching}
				dataSource={debtors?.data}
				pagination={{
					total: debtors?.pagination?.count,
					onChange: (page, limit) => {
						routeNavigate({
							search: (prev) => ({
								...prev,
								page,
								limit
							})
						})
					}
				}}
			/>
		</>
	)
}

export { DebtorsTable }
