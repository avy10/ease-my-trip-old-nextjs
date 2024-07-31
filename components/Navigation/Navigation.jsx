import { useEffect, useState } from "react";
import { useAuthorisationContext } from "@/contexts/AuthorisationContext";
import styles from "./Navigation.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { ROUTES } from "@/public/utils/navigationRoutes";

import NavigationMobile from "./NavigationMobile";

import emt_logo_full from "@/public/assests/images/navigation-images/emtlogo-full.svg";
import SignUpModal from "./SignUpModal";

export default function Navigation() {
	const [scrollLengthY, setScrollLengthY] = useState(false);
	const widthStore = useAuthorisationContext();
	const { width } = widthStore;
	// for rendering the smaller navigation
	const handleChange = () => {
		if (window.scrollY >= 20) {
			setScrollLengthY(true);
		} else {
			setScrollLengthY(false);
		}
	};
	useEffect(() => {
		window.addEventListener("scroll", handleChange);
		return () => window.removeEventListener("scroll", handleChange);
	}, []);

	return (
		<nav>
			{width > 650 ? (
				<NavigationDesktop scrollLengthY={scrollLengthY} />
			) : (
				<NavigationMobile scrollLengthY={scrollLengthY} width={width} />
			)}
		</nav>
	);
}
function NavigationDesktop({ scrollLengthY }) {
	return (
		<>
			<div
				className={
					scrollLengthY
						? `${styles.navigationDiv} mini-nav`
						: styles.navigationDiv
				}
			>
				<div className="emt-icon">
					<Link href="/">
						<Image
							src={emt_logo_full.src}
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
				<SignUpModal />
			</div>
		</>
	);
}

// {showModal &&
// !isLoggedIn &&
function PageNavigations({ scrollLengthY }) {
	const router = useRouter();
	// console.log(router.pathname);
	return (
		<div className={styles.pageNavigations}>
			<ul className={styles.navTabs}>
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
