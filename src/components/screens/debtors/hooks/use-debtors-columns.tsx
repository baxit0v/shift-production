import { QuestionCircleOutlined } from "@ant-design/icons"
import { DatePicker, Popover, Space } from "antd"
import { ColumnsType } from "antd/es/table"
import dayjs from "dayjs"
import { useTranslation } from "react-i18next"
import { ClientTable } from "src/components/shared/client"
import { useMessage } from "src/hooks/use-message"
import { debtorsService } from "src/services/debtors"
import type { SalesProduct } from "src/services/sales-products"
import {
	formatDate,
	formatEmpty,
	formatPriceUZS
} from "src/utils/formatter.utils"
import { SalesProductsTableList } from "../../sales-products/tables/sales-products-table-list"
import { TransactionsTable } from "../tables/transactions-table"

export const useDebtorsColumns = () => {
	const { t } = useTranslation()
	const { message } = useMessage()
	const columns: ColumnsType<any> = [
		{
			title: t("client"),
			dataIndex: ["client"],
			key: "client_info",
			render: (value?: SalesProduct["client"]) => {
				return (
					<Space>
						{formatEmpty(value?.full_name)}
						<Popover content={<ClientTable data={value} />}>
							<QuestionCircleOutlined style={{ cursor: "pointer" }} />
						</Popover>
					</Space>
				)
			}
		},
		{
			title: t("payment_method"),
			dataIndex: ["sell", "payment_type", "name"],
			key: "payment_type",
			render: formatEmpty
		},
		{
			title: t("products"),
			key: "products",
			render: (_, record) => {
				const products = record?.sell?.products || []
				return (
					<Space>
						<Popover
							content={<SalesProductsTableList data={products} />}
						>
							<QuestionCircleOutlined style={{ cursor: "pointer" }} />
						</Popover>
					</Space>
				)
			}
		},
		{
			title: t("transactions"),
			key: "transactions",
			render: (_, record) => {
				const transaction = record?.transaction || []
				return (
					<Space>
						<Popover
							content={<TransactionsTable data={transaction} />}
						>
							<QuestionCircleOutlined style={{ cursor: "pointer" }} />
						</Popover>
					</Space>
				)
			}
		},
		{
			title: t("total_amount"),
			dataIndex: ["total_amount"],
			key: "total_amount",
			render: formatPriceUZS
		},
		{
			title: t("total_paid_amount"),
			dataIndex: ["total_paid_amount"],
			key: "total_paid_amount",
			render: formatPriceUZS
		},
		{
			title: t("owed_amount"),
			dataIndex: ["owed_amount"],
			key: "owed_amount",
			render: formatPriceUZS
		},
		{
			title: t("due_date"),
			dataIndex: "due_date",
			key: "due_date",
			render: (value, record) => {
				
				const dateValue = value ? dayjs(value) : null

				const handleChange = async (newDate: dayjs.Dayjs | null) => {
					try {
						const formattedDate = newDate ? newDate.format("YYYY-MM-DD") : null
						await debtorsService.patchDueDate(record.id, formattedDate)

						message.success({
							message: t("success"),
							description: t("due_date_updated"),
						})
					} catch (error) {
						message.error({
							message: t("error"),
							description: t("update_failed"),
						})
					}
				}

				return (
					<DatePicker
						value={dateValue}
						onChange={handleChange}
						format="YYYY-MM-DD"
					/>
				)
			}
		},
		{
			title: t("created"),
			dataIndex: "created_at",
			key: "created_at",
			render: formatDate
		}
	]
	return columns
}
