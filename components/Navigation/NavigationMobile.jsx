import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import emt_logo_smol from "@/public/assests/images/navigation-images/easemytrip-logo-small.svg";
import SignUpModal from "./SignUpModal";

import { ROUTES } from "@/public/utils/navigationRoutes";
import styles from "./NavigationMobile.module.css";
export default function NavigationMobile({ scrollLengthY, width }) {
	return (
		<>
			<div className={styles.mobileNavigations}>
				{!scrollLengthY && (
					<div className={styles.iconLoginMobileDiv}>
						<div>
							<Link href="/">
								<Image
									src={emt_logo_smol.src}
									height={30}
									width={120}
									alt={"go to homepage"}
								/>
							</Link>
						</div>
						<SignUpModal width={width} />
					</div>
				)}
				<MobilePageNavigation scrollLengthY={scrollLengthY} />
			</div>
		</>
	);
}
/* 
logic to match the pathname has been changed from router.pathname == ele.path
to current iteration
this ensures that the current section remains highlighted as long as we are on that sub-domain
the 4 main sub-domain are : flights, hotels, buses, trains
maybe I will add about later on

*/

function MobilePageNavigation({ scrollLengthY }) {
	const router = useRouter();
	// mobile-
	return (
		<div className={styles.pagesMobile}>
			<ul className={styles.pagesMobileUl}>
				{ROUTES.map((ele) => (
					<li id={ele.id} key={ele.id}>
						<Link href={ele.path}>
							<div
								className={
									router.pathname.includes(ele.path)
										? `nav-container ${styles.mobileNavContainer} active`
										: `nav-container ${styles.mobileNavContainer}`
								}
							>
								<div className={styles.mobileBlankSpace}></div>
								{!scrollLengthY && (
									<>
										<div
											className={
												router.pathname.includes(
													ele.path
												)
													? `${styles.mobileNavText} ${styles.mobileNavTextActive}`
													: `${styles.mobileNavText}`
											}
										>
											{ele.name}
										</div>
									</>
								)}
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
