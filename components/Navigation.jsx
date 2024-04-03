import { useContext, useEffect, useState } from "react";
import AuthorisationContext from "@/contexts/AuthorisationContext";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const ROUTES = [
	{
		id: "flightNav",
		path: "/flights",
		name: "FLIGHTS",
	},
	{
		id: "hotelNav",
		path: "/hotels",
		name: "HOTELS",
	},
	{
		id: "trainNav",
		path: "/trains",
		name: "TRAINS",
	},
	{
		id: "busNav",
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
		<nav className={scrollLengthY ? "miniNav" : ""}>
			<div className="emtIcon">
				<Link href="/">
					<Image
						src="https://www.easemytrip.com/images/brandlogo/emtlogo_new8.svg"
						height={scrollLengthY ? 40 : 70}
						width={scrollLengthY ? 170 : 200}
						alt={"go to homepage"}
					/>
				</Link>
			</div>
			{!scrollLengthY && <PageNavigations />}
			{scrollLengthY && <MiniPageNavigations />}
			<div className="loginPortal"> HI I AM USER</div>
		</nav>
	);
}

function PageNavigations() {
	const router = useRouter();
	return (
		<div className="pageNavigations">
			<ul className="pageNavigationsUL">
				{ROUTES.map((ele) => (
					<li id={ele.id} key={ele.id}>
						<Link href={ele.path}>
							<div
								className={
									router.pathname == ele.path
										? "navContainer active"
										: "navContainer"
								}
							>
								<div className="blankSpace"></div>
								<div
									className={
										router.pathname == ele.path
											? "navText"
											: ""
									}
								>
									{ele.name}
								</div>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

function MiniPageNavigations() {
	const router = useRouter();
	return (
		<div className="pageNavigations">
			<ul className="pageNavigationsUL">
				{ROUTES.map((ele) => (
					<li id={ele.id} key={ele.id}>
						<Link href={ele.path}>
							<div
								className={
									router.pathname == ele.path
										? "navContainer active"
										: "navContainer"
								}
							>
								<div className="blankSpace"></div>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
