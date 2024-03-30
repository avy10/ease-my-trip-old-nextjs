import { useContext, useEffect } from "react";
import AuthorisationContext from "@/contexts/AuthorisationContext";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
export default function Navigation() {
	const authorisationContextData = useContext(AuthorisationContext);
	const { isLoggedIn } = authorisationContextData;

	const router = useRouter();

	useEffect(() => {
		console.log(router.pathname);
	});

	return (
		<nav>
			<div className="emtIcon">
				<Link href="/">
					<Image
						src="https://www.easemytrip.com/images/brandlogo/emtlogo_new8.svg"
						height={70}
						width={200}
						alt={"go to homepage"}
					/>
				</Link>
			</div>
			<div className="pageNavigations">
				<ul>
					<li id="flightNav">
						<Link href="/">
							<div
								className={
									router.pathname == "/" ? "active" : ""
								}
							></div>
							<span>FLIGHTS</span>
						</Link>
					</li>
					<li id="hotelNav">
						<Link href="/hotels">
							<div
								className={
									router.pathname == "/hotels" ? "active" : ""
								}
							></div>
							<span>HOTELS</span>
						</Link>
					</li>
					<li id="trainNav">
						<Link href="/trains">
							<div
								className={
									router.pathname == "/trains" ? "active" : ""
								}
							></div>
							<span>TRAINS</span>
						</Link>
					</li>
					<li id="busNav">
						<Link href="/buses">
							<div
								className={
									router.pathname == "/buses" ? "active" : ""
								}
							></div>
							<span>BUSES</span>
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}
