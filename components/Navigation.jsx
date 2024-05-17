import { useContext, useEffect, useState } from "react";
import AuthorisationContext from "@/contexts/AuthorisationContext";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const ROUTES = [
	{
		id: "flight-nav",
		path: "/flights",
		name: "FLIGHTS",
	},
	{
		id: "hotel-nav",
		path: "/hotels",
		name: "HOTELS",
	},
	{
		id: "train-nav",
		path: "/trains",
		name: "TRAINS",
	},
	{
		id: "bus-nav",
		path: "/buses",
		name: "BUSES",
	},
];
export default function Navigation() {
	const authorisationContextData = useContext(AuthorisationContext);
	const { isLoggedIn } = authorisationContextData;
	const [scrollLengthY, setScrollLengthY] = useState(false);
	const handleChange = () => {
		if (window.scrollY >= 40) {
			setScrollLengthY(true);
		} else {
			setScrollLengthY(false);
		}
	};
	useEffect(() => {
		window.addEventListener("scroll", handleChange);
	}, []);
	return (
		<nav>
			<div
				className={
					scrollLengthY ? "navigation-div mini-nav" : "navigation-div"
				}
			>
				<div className="emt-icon">
					<Link href="/">
						<Image
							src="https://www.easemytrip.com/images/brandlogo/emtlogo_new8.svg"
							height={scrollLengthY ? 40 : 60}
							width={scrollLengthY ? 170 : 200}
							alt={"go to homepage"}
						/>
					</Link>
				</div>
				<PageNavigations scrollLengthY={scrollLengthY} />
				{/* {!scrollLengthY && (
				<PageNavigations scrollLengthY={scrollLengthY} />
			)} */}
				{/* {scrollLengthY && <MiniPageNavigations />} */}
				<div className="login-portal"> HI I AM USER</div>
			</div>
		</nav>
	);
}
function PageNavigations({ scrollLengthY }) {
	const router = useRouter();
	// console.log(router.pathname);
	return (
		<div className="page-navigations">
			<ul className="page-navigations-ul">
				{ROUTES.map((ele) => (
					<li id={ele.id} key={ele.id}>
						<Link href={ele.path}>
							<div
								className={
									router.pathname.includes(ele.path)
										? "nav-container active"
										: "nav-container"
								}
							>
								<div className="blankSpace"></div>
								{!scrollLengthY && (
									<div
										className={
											router.pathname.includes(ele.path)
												? "nav-text nav-text-active"
												: "nav-text"
										}
									>
										{ele.name}
									</div>
								)}
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

/* 
logic to match the pathname has been changed from router.pathname == ele.path
to current iteration
this ensures that the current section remains highlighted as long as we are on that sub-domain
the 4 main sub-domain are : flights, hotels, buses, trains
maybe I will add about later on

*/
