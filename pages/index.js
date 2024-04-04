import { useRouter } from "next/router";
import { useEffect } from "react";

const IndexPage = () => {
	const router = useRouter();

	useEffect(() => {
		window.alert(window.navigator.userAgent);
		router.push("/flights");
	}, []);

	return null;
};

export default IndexPage;
