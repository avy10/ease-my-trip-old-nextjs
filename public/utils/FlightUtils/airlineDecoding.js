import indigo from "@/public/assests/images/icons/indigo.png";
import spicyJett from "@/public/assests/images/icons/SG.png";
import vistara from "@/public/assests/images/icons/UK.png";
import airIndia from "@/public/assests/images/icons/AI.png";
import goAir from "@/public/assests/images/icons/G8.png";

export const airlineCodes = {
	"6E001": "Indigo",
	AI001: "Air India",
	UK001: "Vistara",
	SG001: "SpiceJet",
	G801: "Go Air",
};
// SG001 - DELBOM - 578;
export const ICON_SOURCES = {
	"6E001": {
		name: "IndiGo",
		shortID: "6E",
		icon: indigo,
		icon2: "https://raw.githubusercontent.com/avy10/assestsForNSReactProjects/main/icons/indigo.png",
		newtonID: "65144a1b664a43628887c45e",
	},

	AI001: {
		name: "Air India",
		shortID: "AI",
		icon: airIndia,
		icon2: "https://raw.githubusercontent.com/avy10/assestsForNSReactProjects/main/icons/AI.png",
		newtonID: "65144a1b664a43628887c45d",
	},
	UK001: {
		name: "Vistara",
		shortID: "UK",
		icon: vistara,
		icon2: "https://raw.githubusercontent.com/avy10/assestsForNSReactProjects/main/icons/UK.png",
		newtonID: "65144a1b664a43628887c460",
	},
	SG001: {
		name: "SpiceJet",
		shortID: "SG",
		icon: spicyJett,
		icon2: "https://raw.githubusercontent.com/avy10/assestsForNSReactProjects/main/icons/SG.png",
		newtonID: "65144a1b664a43628887c45f",
	},
	G801: {
		name: "Go Air",
		shortID: "G8",
		icon: goAir,
		icon2: "https://raw.githubusercontent.com/avy10/assestsForNSReactProjects/main/icons/G8.png",
		newtonID: "65144a1b664a43628887c461",
	},
};
