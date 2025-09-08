import { createFileRoute } from "@tanstack/react-router"
import { ProductsForm, ProductsTable } from "src/components/screens/products"
import { GetParams } from "src/services/shared"

export const Route = createFileRoute("/_layout/store/products/")({
	component: ProductsComponent,
	validateSearch: (search: GetParams) => {
		const params: GetParams = {}
		if (search?.page) params.page = search.page
		if (search?.limit) params.limit = search.limit
		return params
	}
})

function ProductsComponent() {
	const params = Route.useSearch()
	const navigate = Route.useNavigate()

	const onChangeParams = (params: GetParams) => {
		navigate({
			search: (prev) => ({
				...prev,
				...params
			})
		})
	}
	return (
		<>
			<ProductsForm />
			<ProductsTable params={params} onChangeParams={onChangeParams} />
		</>
	)
}
