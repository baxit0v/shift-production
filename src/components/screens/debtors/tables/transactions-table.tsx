import { Table } from "antd"
import { ColumnsType } from "antd/es/table"
import { formatDate, formatPriceUZS } from "src/utils/formatter.utils"

interface Transaction {
    paid_amount: string
    created_at: string
}

export const TransactionsTable = ({ data }: { data: Transaction[] }) => {
    const columns: ColumnsType<Transaction> = [
        {
            title: "Оплата",
            dataIndex: "paid_amount",
            key: "paid_amount",
            render: (val: string) => formatPriceUZS(val)
        },
        {
            title: "Дата",
            dataIndex: "created_at",
            key: "created_at",
            render: formatDate
        }
    ]

    return <Table columns={columns} dataSource={data} rowKey="created_at" pagination={false} />
}
