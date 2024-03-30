import { useContext, useEffect } from "react";
import AuthorisationContext from "@/contexts/AuthorisationContext";

import Divider from "@mui/material/Divider";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
export default function Navigation() {
	const authorisationContextData = useContext(AuthorisationContext);
	const { isLoggedIn } = authorisationContextData;

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
			<PageNavigations />
			<div className="loginPortal"> HI I AM USER</div>
		</nav>
	);
}

function PageNavigations() {
	const router = useRouter();
	return (
		<div className="pageNavigations">
			<ul>
				<li id="flightNav">
					<Link href="/">
						<div
							className={
								router.pathname == "/"
									? "navContainer active"
									: "navContainer"
							}
						>
							<div className="blankSpace"></div>
							<div
								className={
									router.pathname == "/" ? "navText" : ""
								}
							>
								FLIGHTS
							</div>
						</div>
					</Link>
				</li>

				<Divider orientation="vertical" variant="middle" />
				<li id="hotelNav">
					<Link href="/hotels">
						<div
							className={
								router.pathname == "/hotels"
									? "navContainer active"
									: "navContainer"
							}
						>
							<div className="blankSpace"></div>
							<div
								className={
									router.pathname == "/hotels"
										? "navText"
										: ""
								}
							>
								HOTELS
							</div>
						</div>
					</Link>
				</li>
				<Divider orientation="vertical" variant="middle" />
				<li id="trainNav">
					<Link href="/trains">
						<div
							className={
								router.pathname == "/trains"
									? "navContainer active"
									: "navContainer"
							}
						>
							<div className="blankSpace"></div>
							<div
								className={
									router.pathname == "/trains"
										? "navText"
										: ""
								}
							>
								TRAINS
							</div>
						</div>
					</Link>
				</li>
				<Divider orientation="vertical" variant="middle" size="small" />
				<li id="busNav">
					<Link href="/buses">
						<div
							className={
								router.pathname == "/buses"
									? "navContainer active"
									: "navContainer"
							}
						>
							<div className="blankSpace"></div>
							<div
								className={
									router.pathname == "/buses" ? "navText" : ""
								}
							>
								BUSES
							</div>
						</div>
					</Link>
				</li>
			</ul>
		</div>
	);
}
