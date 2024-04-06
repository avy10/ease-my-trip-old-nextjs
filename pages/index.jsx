import { useRouter } from "next/router";
import { useEffect } from "react";

const IndexPage = () => {
	const router = useRouter();

	useEffect(() => {
		// console.log("Am I Rendering twice");
		router.replace("/flights");
	}, []);

	return null;
};

export default IndexPage;
