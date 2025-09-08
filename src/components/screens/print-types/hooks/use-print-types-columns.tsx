import { DeleteFilled, EditFilled } from "@ant-design/icons"
import { Space } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useTranslation } from "react-i18next"
import { Button } from "src/components/ui/button"
import {
	PrintType,
	useDeletePrintTypesMutation
} from "src/services/shared/print-types"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { formatEmpty, formatPriceUZS } from "src/utils/formatter.utils"

const usePrintTypesColumns = () => {
	const { t } = useTranslation()
	const { mutate: deletePrintType } = useDeletePrintTypesMutation()

	const editPrintType = useFormDevtoolsStore((state) => state.setParams)

	const columns: ColumnsType<PrintType> = [
		{
			width: 50,
			title: "№",
			dataIndex: "index",
			key: "index",
			render: (_v, _r, index) => index + 1
		},
		{
			title: t("name"),
			dataIndex: "name",
			key: "name",
			render: formatEmpty
		},
		{
			title: "Сотув нархи",
			dataIndex: "amount",
			key: "amount",
			render: formatPriceUZS
		},
		{
			fixed: "right",
			width: 100,
			title: "",
			key: "actions",
			render: (_v, record) => (
				<Space>
					<Button
						onClick={() => editPrintType(record)}
						tooltip={"Изменить"}
						icon={<EditFilled />}
					/>
					<Button
						confirm={{
							title: record.name,
							onConfirm: () => deletePrintType(record.id)
						}}
						tooltip={"Удалить"}
						danger={true}
						icon={<DeleteFilled />}
					/>
				</Space>
			)
		}
	]

	return columns
}

export { usePrintTypesColumns }
