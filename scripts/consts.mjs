const moduleId = "pf2e-vessaya"

const COMMON_LANGUAGES = [
	"draconic",
	"dwarven",
	"elven",
	"fey",
	"gnomish",
	"goblin",
	"halfling",
	"jotun",
	"orcish",
	"sakvaroth",
	"vessi"
]

const UNCOMMON_LANGUAGES = [
	"aklo",
	"chthonian",
	"selduin",
	"amurrun",
	"cyclops",
	"daemonic",
	"iruxi",
	"kholo",
	"grippli",
	"kitsune",
	"nagaji",
	"necril",
	"pyric",
	"shadowtongue",
	"tanuki",
	"tengu",
	"thalassic",
	"vanara",
	"wayan",
	"ysoki"
]

const RARE_LANGUAGES = [
	"oldtor",
	"anadi",
	"androffan",
	"elder-thing",
	"goloma",
	"shisk",
	"strix",
	"shoony",
	"lashunta",
]

const UNAVAILABLE_LANGUAGES = [
	"adlet",
	"alghollthu",
	"arboreal",
	"boggard",
	"calda",
	"caligni",
	"diabolic",
	"ekujae",
	"empyrean",
	"hallit",
	"kelish",
	"kibwani",
	"lirgeni",
	"muan",
	"mwangi",
	"mzunu",
	"ocotan",
	"osiriani",
	"petran",
	"protean",
	"requian",
	"shoanti",
	"skald",
	"sphinx",
	"sussuran",
	"tang",
	"tien",
	"utopian",
	"varisian",
	"vudrani",
	"xanmba",
	"ancient-osiriani",
	"anugobu",
	"arcadian",
	"azlanti",
	"destrachan",
	"drooni",
	"dziriak",
	"elder-thing",
	"erutaki",
	"formian",
	"garundi",
	"girtablilu",
	"grioth",
	"hwan",
	"iblydan",
	"ikeshti",
	"immolis",
	"jistkan",
	"jyoti",
	"kaava",
	"kashrishi",
	"kovintal",
	"mahwek",
	"migo",
	"minaten",
	"minkaian",
	"munavri",
	"okaiyan",
	"orvian",
	"rasu",
	"ratajin",
	"razatlani",
	"russian",
	"samsaran",
	"sasquatch",
	"senzar",
	"shae",
	"shisk",
	"shobhad",
	"shoony",
	"shory",
	"strix",
	"surki",
	"talican",
	"tanuki",
	"tekritanin",
	"thassilonian",
	"varki",
	"vishkanyan",
	"wyrwood",
	"yaksha",
	"yithian"
]

const SECRET_LANGUAGES = [
	"wildsong"
]

const COMMON_LANGUAGE = "vessi"

const LANGUAGE_RARITIES = [
	"common", "uncommon", "rare", "secret"
]

const LANGUAGES_BY_RARITY = {
	common: COMMON_LANGUAGES,
	uncommon: UNCOMMON_LANGUAGES,
	rare: RARE_LANGUAGES,
	secret: SECRET_LANGUAGES,
	unavailable: UNAVAILABLE_LANGUAGES,
	commonLanguage: COMMON_LANGUAGE
}

const LANGUAGES = ["common", ...COMMON_LANGUAGES, ...UNCOMMON_LANGUAGES, ...RARE_LANGUAGES, "wildsong"]
LANGUAGES.sort()

const IMPORTED_RESOURCES = {
	PLOT_DICE_BLANK_BUMP: `modules/${moduleId}/assets/dice/opp/plot_blank_bump.png`,
	PLOT_DICE_BLANK: `modules/${moduleId}/assets/dice/opp/plot_blank.png`,
	PLOT_DICE_C2_BUMP: `modules/${moduleId}/assets/dice/opp/plot_c2_bump.png`,
	PLOT_DICE_C2: `modules/${moduleId}/assets/dice/opp/plot_c2.png`,
	PLOT_DICE_C4_BUMP: `modules/${moduleId}/assets/dice/opp/plot_c4_bump.png`,
	PLOT_DICE_C4: `modules/${moduleId}/assets/dice/opp/plot_c4.png`,
	PLOT_DICE_OP_BUMP: `modules/${moduleId}/assets/dice/opp/plot_op_bump.png`,
	PLOT_DICE_OP: `modules/${moduleId}/assets/dice/opp/plot_op.png`,
	PLOT_DICE_C2_IN_CHAT: `modules/${moduleId}/assets/icons/svg/dice/dp_c2.svg`,
	PLOT_DICE_C4_IN_CHAT: `modules/${moduleId}/assets/icons/svg/dice/dp_c4.svg`,
	PLOT_DICE_OP_IN_CHAT: `modules/${moduleId}/assets/icons/svg/dice/dp_op.svg`
}

const PLOT_DIE_SIDES = {
	1: `<img src="${IMPORTED_RESOURCES.PLOT_DICE_C2_IN_CHAT}"`,
	2: `<img src="${IMPORTED_RESOURCES.PLOT_DICE_C4_IN_CHAT}"`,
	3: `&nbsp;`,
	4: `&nbsp;`,
	5: `<img src="${IMPORTED_RESOURCES.PLOT_DICE_OP_IN_CHAT}"`,
	6: `<img src="${IMPORTED_RESOURCES.PLOT_DICE_OP_IN_CHAT}"`,
}

export const REPUTATION = {
	"factions": [
	],
	"npcs": [
	]
}

export {
	LANGUAGES,
	LANGUAGE_RARITIES,
	LANGUAGES_BY_RARITY,
	IMPORTED_RESOURCES,
	PLOT_DIE_SIDES
}
