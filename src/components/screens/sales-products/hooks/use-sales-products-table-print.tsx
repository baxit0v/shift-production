import { PrinterOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useRef } from "react"
import { useTranslation } from "react-i18next"
import { useReactToPrint } from "react-to-print"
import { SalesProduct } from "src/services/sales-products"
import { formatPhone, formatPriceUZS } from "src/utils/formatter.utils"

import logo from "/logo.png"

type Props = {
  record: SalesProduct
}

export const UseSalesProductsTablePrint = ({ record }: Props) => {
  const componentRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  const handlePrint = useReactToPrint({
    contentRef: componentRef
  })

  return (
    <div>
      <div ref={componentRef} className="print-area">
        <div className="receipt">
          <div className="logo-title">
            <img className="logo" src={logo} alt="logo" />
            <p className="company-title">SHIFT</p>
          </div>
          <div className="top">
            <h1 className="title">{t("receipt")} #{record.id}</h1>
            <div className="between">
              <p><b>{t("client")}:</b></p>
              <p><b>{record.client.full_name}</b></p>
            </div>
            <div className="between">
              <p><b>{t("phone_number")}:</b></p>
              <p><b>{formatPhone(record.client.phone)}</b></p>
            </div>
            <div className="between">
              <p><b>{t("payment_method")}:</b></p>
              <p><b>{record.payment_type.name}</b></p>
            </div>
            <div className="between">
              <p><b>{t("date")}:</b></p>
              <p><b>{new Date(record.created_at).toLocaleString()}</b></p>
            </div>
          </div>

          <hr />

          {Array.isArray(record.products) &&
            record.products.map((item) => (
              <div key={item.id} className="product">
                <div className="between">
                  <p>{t("product")}</p>
                  <p>{item.product.name}</p>
                </div>
                {Number(item.length) > 0 && (
                  <div className="between">
                    <p>{t("length")}</p>
                    <p>{item.length}</p>
                  </div>
                )}
                {Number(item.pieces) > 0 && (
                  <div className="between">
                    <p>{t("pieces")}</p>
                    <p>{item.pieces}</p>
                  </div>
                )}
                {Number(item.meter_square) > 0 && (
                  <div className="between">
                    <p>{t("meter_square")}</p>
                    <p>{item.meter_square}</p>
                  </div>
                )}
                {Number(item.print_meter_square) > 0 && (
                  <div className="between">
                    <p>{t("print_meter_square")}</p>
                    <p>{item.print_meter_square}</p>
                  </div>
                )}
                {item.print_type && (
                  <div className="between">
                    <p>{item.print_type.name}</p>
                    <p>({formatPriceUZS(item.print_type.amount)})</p>
                  </div>
                )}
                {Number(item.print_cost) > 0 && (
                  <div className="between">
                    <p>{t("print_cost")}</p>
                    <p>{formatPriceUZS(item.print_cost)}</p>
                  </div>
                )}
                {Number(item.material_cost) > 0 && (
                  <div className="between">
                    <p>{t("material_cost")}</p>
                    <p>{formatPriceUZS(item.material_cost)}</p>
                  </div>
                )}
                {Number(item.amount) > 0 && (
                  <div className="between">
                    <p>{t("total_amount")}</p>
                    <p>{formatPriceUZS(item.amount)}</p>
                  </div>
                )}
                <hr />
              </div>
            ))}

          <div className="total">{t("total_cost")}: <b>{formatPriceUZS(record.total_cost)}</b></div>
        </div>
      </div>

      <Button icon={<PrinterOutlined />} onClick={handlePrint}>{t("print")}</Button>

      <style>
        {`
          .print-area {
            display: none;
          }
          @media print {
            body * {
              visibility: hidden;
            
            }
            body {
              display: flex;
              justify-content: center;
            }
            .print-area, .print-area * {
              visibility: visible;
              
            }
            .print-area {
              display: block;
              width: 80mm; /* ширина рулона */
              font-family: monospace;
              font-size: 12px;
              padding: 5px;
            }
          }
          .logo-title {
            display: flex;
            gap: 5px;
            justify-content: center;
            align-items: center;
          }
          .logo {
            width: 20px;
            heigth: 20px;
            border-radius: 50%;
          }
          .company-title {
            margin-top: 12px;
            font-weight: bold;
          }
          .top .title {
            text-align: center;
            font-weight: bold;
            margin: 5px 0 20px;
          }
          .between {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 5px;
          }
          hr {
            border: none;
            border-top: 1px dashed #000;
            margin: 5px 0;
          }
          .product p {
            margin: 2px 0;
          }
          .total {
            text-align: right;
            font-weight: bold;
            margin-top: 5px;
          }
        `}
      </style>
    </div>
  )
}
