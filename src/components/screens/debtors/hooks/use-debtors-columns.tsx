import { QuestionCircleOutlined } from "@ant-design/icons"
import { Popover, Space } from "antd"
import { ColumnsType } from "antd/es/table"
import { useTranslation } from "react-i18next"
import { ClientTable } from "src/components/shared/client"
import type { SalesProduct } from "src/services/sales-products"
import {
	formatDate,
	formatEmpty,
	formatPriceUZS
} from "src/utils/formatter.utils"
import { SalesProductsTableList } from "../../sales-products/tables/sales-products-table-list"

export const useDebtorsColumns = () => {
	const { t } = useTranslation()
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
			title: t("total_cost"),
			dataIndex: ["sell", "total_cost"],
			key: "total_cost",
			render: formatPriceUZS
		},
		{
			title: t("due-date"),
			dataIndex: "due_date",
			key: "due_date",
			render: formatDate
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
