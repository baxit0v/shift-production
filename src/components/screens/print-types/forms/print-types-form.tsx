import { Form, FormProps, Input, InputNumber } from "antd"
import { type FC, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { FormDrawer } from "src/components/shared/form-drawer"
import { FORM_DEFAULT, INPUT_PLACEHOLDER } from "src/constants/form.constants"
import {
	PrintType,
	PrintTypeForm,
	useCreatePrintTypesMutation,
	useEditPrintTypesMutation
} from "src/services/shared/print-types"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { formatInputPrice } from "src/utils/formatter.utils"
import { isParamsFormValidate } from "src/utils/validate.utils"

const PrintTypesForm: FC = () => {
	const { t } = useTranslation()
	const [form] = Form.useForm<PrintTypeForm>()

	const { params, resetParams } = useFormDevtoolsStore()

	const { mutate: addPrintType, isPending: addLoading } =
		useCreatePrintTypesMutation()

	const { mutate: editPrintType, isPending: editLoading } =
		useEditPrintTypesMutation()

	const onFinish: FormProps<PrintTypeForm>["onFinish"] = async (values) => {
		if (isParamsFormValidate<PrintType>(params)) {
			editPrintType(
				{
					...values,
					id: params.id
				},
				{
					onSuccess: () => {
						resetParams()
						form.resetFields()
					}
				}
			)
			return
		}
		addPrintType(values, {
			onSuccess: () => {
				resetParams()
				form.resetFields()
			}
		})
	}

	useEffect(() => {
		if (params) {
			form.setFieldsValue({
				...params
			})
		}
	}, [form, params])
	return (
		<FormDrawer form={form} isLoading={addLoading || editLoading}>
			<Form
				{...FORM_DEFAULT}
				name={"print-type-form"}
				form={form}
				onFinish={onFinish}>
				<Form.Item<PrintTypeForm>
					name={"name"}
					label={t("name")}
					rules={[{ required: true }]}>
					<Input placeholder={INPUT_PLACEHOLDER} />
				</Form.Item>
				<Form.Item<PrintTypeForm>
					name={"amount"}
					label={"Сотув нархи"}
					rules={[{ required: true }]}>
					<InputNumber
						formatter={formatInputPrice}
						style={{ width: "100%" }}
						placeholder={INPUT_PLACEHOLDER}
					/>
				</Form.Item>
			</Form>
		</FormDrawer>
	)
}

export { PrintTypesForm }
