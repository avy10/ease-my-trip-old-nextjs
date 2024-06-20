import BaggageInformation from "@/components/FlightSearchPageComponents/SearchResultsPage/oneWayFlightsList/oneWayFlightsListComponents/singleFlightDetail/BaggageInformation";
import Container from "@mui/material/Container";

import { useRouter } from "next/router";

// breadcrumbs
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useAuthorisationContext } from "@/contexts/AuthorisationContext";
import { useEffect, useState } from "react";
import FlightReview from "@/components/FlightSearchPageComponents/FlightBookingReview/FlightReview";
// not using bread crumbs cz they use position fixed
/*  */
export default function ReviewHome() {
	const router = useRouter();

	const [fid, setFid] = useState(undefined);
	useEffect(() => {
		const { id } = router.query;
		setFid(id);
		console.log("index is reloading", id);
		// alert(f_id);
	}, [router.isReady]);
	const [tabNumber, setTabNumber] = useState(0);
	function updateTabNumber(newTabNumber) {
		setTabNumber(newTabNumber);
	}
	return (
		<>
			<PageBreadcrumbs
				tabNumber={tabNumber}
				updateTabNumber={updateTabNumber}
			/>
			<Container
				className="flight-review-main-container"
				maxWidth="lg"
				sx={{
					position: "relative",
					top: "75px",
					border: "2px solid black",
				}}
			>
				<Container
					maxWidth="lg"
					sx={{
						border: "2px solid green",
					}}
				>
					{/* <BaggageInformation /> */}
					{fid && <FlightReview fid={fid} />}
					{/* 
				there is 3 sections / tabs
				Note : Flight Review, Pricing tab, Coupons tabs will remain fixed on desktop
				flight review remains fixed on mobile while coupons tab will be moved to the bottom and price will be moved to a modal
				1. flight review
					a. Flight Review :- contains flight info like airline, source-destination, timings
				flight review will always stay on top
					b. Flight review other tabs :- contains all the other tabs of the flight review like pricing, medical refund, insurance, etc
						this tab will render when tabNumber == 0 
				2. Travellers details
				NOTE : once travellers details is filled we will render a travellers details filled card which will show user his name email id etc and it will again have an edit button
				3. payment section
				once we move onto tab 2, we are gonna display an edit button on it
				which will take the user back to the  */}
					{/* <FlightReview fid={fid} /> */}
					{tabNumber == 0 && <TestingTabOne />}
					{tabNumber == 1 && <TestingTabTwo />}
					{tabNumber == 2 && <TestingTabThree />}
				</Container>
				<div
					className="smol-container"
					style={{ border: "2px solid blue" }}
				>
					<TestingSticky topVal={"100px"} />
					<TestingSticky topVal={"250px"} />
				</div>
			</Container>
		</>
	);
}

function GoBackButton() {}

function PageBreadcrumbs({ tabNumber, updateTabNumber }) {
	const authorisationStateData = useAuthorisationContext();
	const { width } = authorisationStateData;
	const router = useRouter();

	return (
		<Container maxWidth="lg">
			<div className="flight-booking-preview-bread-crumbs">
				<Breadcrumbs
					separator={
						<NavigateNextIcon
							sx={{ color: "black" }}
							fontSize="large"
						/>
					}
					aria-label="breadcrumb"
				>
					<button
						className="bread-crumbs-go-back-btn flex-center-center"
						onClick={() => router.back()}
					>
						<KeyboardBackspaceIcon />
					</button>

					<div onClick={() => updateTabNumber(0)}>Abcd</div>
					<div onClick={() => updateTabNumber(1)}>efgh</div>
					<div onClick={() => updateTabNumber(2)}>ijkl</div>
				</Breadcrumbs>
			</div>
		</Container>
	);
}

function TestingTabOne() {
	return (
		<div>
			I am tab one, will render when Abcd is clicked
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
				aliquid amet cumque adipisci esse eius repudiandae dolor
				inventore, dicta a sequi itaque. Animi quaerat deserunt eaque
				ullam ab! Ab nesciunt in voluptates, deserunt voluptate impedit
				facilis architecto vel ipsa eligendi magnam adipisci a! Fugiat
				excepturi cupiditate neque tempore magnam praesentium labore
				sint quos facere officiis iste, minus pariatur ullam ab hic ea
				animi eius obcaecati ipsa distinctio consequuntur corrupti iusto
				expedita! Placeat amet id cum error distinctio quod iste? Quia
				dignissimos suscipit in dolor dolores sit reprehenderit
				laboriosam minus minima nostrum maiores voluptates, ex inventore
				consectetur omnis repudiandae. Voluptates, distinctio voluptatem
				excepturi vel corporis minus, eaque sit porro, tenetur fugit
				blanditiis? Blanditiis nobis vel voluptas corporis beatae
				possimus architecto, tempore aut officiis cumque laudantium
				ipsum provident molestiae, culpa doloribus soluta fugiat
				voluptatem maiores odit! Aliquam rem repellat amet? Quam dicta
				velit quaerat perferendis nostrum pariatur obcaecati, commodi id
				temporibus deleniti harum inventore nisi iusto voluptate soluta
				neque. Adipisci praesentium voluptatum cum magni, beatae
				inventore laboriosam odio accusamus vero aliquam itaque aut
				quibusdam fugit assumenda quod ducimus! Veniam quasi est
				ratione, rem, quod incidunt vero libero ut facere culpa officiis
				soluta cumque explicabo itaque accusamus quibusdam, cupiditate
				fuga nemo maiores voluptatum quaerat! Sed fugiat omnis cumque
				dignissimos ratione, quasi inventore aut quisquam dolores a enim
				totam blanditiis ipsa dolorum mollitia vitae, cum, sequi fugit
				beatae est voluptate. Consectetur temporibus quis sunt nulla
				dignissimos ullam ipsam dolor architecto nesciunt quam, aliquid
				impedit cum natus nemo quas ipsa voluptas corrupti! Dolor omnis
				molestiae error aut esse accusamus fugiat reprehenderit eos
				dolore, facere quaerat commodi debitis recusandae repudiandae
				voluptatibus suscipit sunt expedita et ipsam possimus! Quaerat
				incidunt dolorem, minima eos similique accusantium, nobis
				numquam natus molestiae iusto nemo itaque in aspernatur ad
				doloremque optio amet commodi dicta provident ut illum
				perspiciatis facilis ipsam iste? Eum autem sequi laboriosam
				pariatur velit, vitae atque magni ex fugit nam minus, fugiat
				impedit, incidunt tenetur totam inventore natus corporis! Ullam
				aperiam accusamus earum vel fuga, nulla asperiores sequi. Iusto
				praesentium quo deserunt rerum esse exercitationem quaerat ullam
				deleniti magni, laborum odio eligendi unde error nulla excepturi
				at aut? Ratione voluptate sunt maxime explicabo at voluptatibus
				nobis perferendis repellendus recusandae eligendi rerum
				dignissimos perspiciatis autem pariatur commodi reprehenderit
				laudantium quod sint placeat architecto, fugit enim! Numquam ad,
				dolorum sapiente enim quaerat laborum aliquid amet id eligendi
				explicabo, et ullam voluptate, fugit saepe omnis magnam
				reprehenderit dignissimos est nihil officia. Sint, animi?
				Recusandae perspiciatis, enim eligendi officiis eveniet omnis
				blanditiis aliquam, quia, odio rerum similique labore itaque sed
				rem vel qui saepe velit quidem culpa a. Eius dolore magnam,
				perspiciatis molestiae earum doloribus soluta dignissimos
				adipisci provident mollitia ipsum rem eaque iusto voluptatem nam
				a. Tempora praesentium odit doloribus facilis sequi, ea fugit
				necessitatibus rerum quod quam porro beatae hic rem voluptatum
				suscipit dolores, alias nulla vitae, consequuntur iste
				aspernatur? Sed eligendi perferendis atque laudantium vero
				molestias commodi distinctio quas cumque sit itaque libero
				repellat, dignissimos accusamus autem ipsam, voluptate excepturi
				praesentium iste soluta explicabo esse blanditiis odit? Nisi,
				vitae nesciunt? Harum deserunt inventore quaerat, aspernatur, id
				explicabo et porro sint rerum, repellendus eius libero nisi ex
				molestiae. Dicta odio blanditiis ratione expedita, repellat
				minus eaque totam, ex fugiat nam optio minima, aut ipsa
				doloremque culpa maxime? Accusantium qui deleniti fuga excepturi
				corrupti, repellendus modi earum corporis minima aspernatur
				soluta voluptates sit nulla explicabo impedit nihil distinctio
				eligendi nam? A illo eligendi pariatur molestias minus quis
				illum facere, eius ipsum cum eum id eaque magni. Cupiditate
				quis, sint libero ullam repellat soluta. Maiores nesciunt
				dolorem accusamus, sit velit omnis! Inventore laborum cumque,
				maxime ad assumenda ipsa quaerat quidem at natus sit quod
				corporis quibusdam in ea laboriosam voluptatum facilis rerum id
				illo culpa? Ad natus facilis eum modi, corporis doloribus
				debitis, harum optio illum qui itaque dolorum nesciunt iure quod
				cumque ab vero quas blanditiis animi veniam nemo voluptas ipsum
				exercitationem illo! Odio similique architecto alias dolore
				pariatur, sapiente magni doloribus saepe aliquid accusantium
				vitae, unde ad asperiores nostrum at harum! Consectetur
				praesentium expedita eius blanditiis libero dolor ipsum laborum
				hic illo explicabo obcaecati, unde nemo animi suscipit nam amet
				quaerat facere temporibus atque! Exercitationem provident
				repellendus ea illo molestiae omnis ad, pariatur ipsum ratione
				tempore non, aliquid quaerat est cum saepe eius fugiat ducimus!
				Fuga deserunt, quae rerum accusantium quas aliquid consequatur
				accusamus mollitia temporibus? Blanditiis quidem excepturi qui
				fugiat tempora accusamus beatae, unde iste atque ipsa eaque
				officiis optio animi placeat quos natus deserunt, autem
				doloremque itaque delectus, exercitationem libero culpa
				distinctio! Accusamus vitae quis tempore cum explicabo modi ea
				nisi aperiam consequuntur, nesciunt quo voluptatibus harum,
				tenetur provident soluta fugiat earum autem ab nobis, architecto
				adipisci necessitatibus voluptatum pariatur. Aspernatur id
				obcaecati illo blanditiis officia, iste nulla, totam alias
				tempore quia recusandae porro, expedita molestiae rem atque. Eum
				itaque ab similique, alias pariatur at commodi, id asperiores
				blanditiis fugiat magnam saepe reiciendis adipisci temporibus
				aliquid cum a illum deleniti. Est blanditiis natus officiis
				optio mollitia, ipsam, maxime tempore velit, dolorem animi
				temporibus eius quos cupiditate dolore alias consequatur hic
				quibusdam tempora dolorum eaque ex possimus recusandae error?
				Quas soluta eaque sequi? Quaerat, dolores unde eum commodi cum
				enim voluptatum labore facere obcaecati, quisquam quasi
				accusantium qui a facilis tempore odio. Earum, dignissimos.
				Error explicabo est dolore quis non fugiat. Corrupti voluptate
				libero eaque enim debitis, nesciunt dolorum aut quia nemo
				tenetur fuga, in fugit beatae voluptatum provident magni harum,
				distinctio consequatur aperiam atque nam quisquam! Dolorem
				fugiat quam debitis, recusandae, soluta voluptatem temporibus,
				blanditiis qui asperiores placeat optio nam illum reiciendis
				repudiandae atque fugit saepe illo. Commodi aperiam molestiae
				libero neque ipsum quos enim, sunt rerum saepe ratione
				repudiandae vero impedit est reprehenderit reiciendis animi ut
				minima voluptatum? Iste nostrum incidunt maxime, voluptatum
				doloremque eligendi similique, atque possimus veniam deleniti
				officiis necessitatibus, quam cum saepe. Tempore pariatur, vero
				voluptatum voluptas eum consequuntur quos qui necessitatibus
				facere voluptatibus deserunt nobis, officiis perferendis
				nesciunt quae veniam rem dicta tenetur aliquam, quo officia
				excepturi neque architecto quas. Incidunt ipsam nostrum dolores
				maxime dolor, corporis vel ex fuga, laboriosam iure inventore?
			</p>
		</div>
	);
}
function TestingTabTwo() {
	return <div>I am tab two, will render when efgh is clicked</div>;
}
function TestingTabThree() {
	return <div>I am tab three, will render when ijkl is clicked</div>;
}

function TestingSticky({ topVal }) {
	return (
		<div
			style={{
				position: "sticky",
				top: topVal,
				width: "320px",
				height: "150px",
				border: "2px solid red",
			}}
		>
			I AM ABHISHEK
		</div>
	);
}
// top: "120px",
// 				right: "351px",
