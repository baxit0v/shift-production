import { Image, Space, Typography } from "antd"
import { type FC } from "react"

const Logo: FC = () => {
	return (
		<Space align={"center"} size={12}>
			<Image
				preview={false}
				style={{
					width: 46,
					height: 46,
					borderRadius: "50%",
					border: "1px solid #fff"
				}}
				src={"/logo.png"}
				fallback={"/public/apple-touch-icon.png"}
				alt={""}
			/>
			<Typography.Title level={3}>SHIFT</Typography.Title>
		</Space>
	)
}

export { Logo }
