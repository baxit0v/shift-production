import { Form, Select } from "antd"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { ProductForm } from "src/services/products"
import { SELECT_PLACEHOLDER } from "src/constants/form.constants"
import { useGetMeasurementUnitsQuery } from "src/services/shared/measurement-units"

const FormItemMeasurementUnits: FC = () => { 
    const { t } = useTranslation()

    const {
        data: measurement_units,
        isLoading,
        isFetching
    } = useGetMeasurementUnitsQuery()


    return (
        <Form.Item<ProductForm>
            name={"measurement_unit_id"}
            label={t("measurement_unit")}
            rules={[{ required: true }]}>
            <Select
                placeholder={SELECT_PLACEHOLDER}
                loading={isLoading || isFetching}
                showSearch={true}
                optionFilterProp={"label"}
                options={measurement_units?.data?.map((measurement_unit) => ({
                    value: measurement_unit.id,
                    label: measurement_unit.name
                }))}
            />

        </Form.Item>
    )
} 

export { FormItemMeasurementUnits }