import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
export default function Loader() {
	const [open, setOpen] = useState(true);

	return (
		<Backdrop
			sx={{
				color: "aqua",
				zIndex: (theme) => theme.zIndex.drawer + 1,
			}}
			open={open}
		>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
}
