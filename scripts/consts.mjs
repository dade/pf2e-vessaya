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
	"vessi"
]

const UNCOMMON_LANGUAGES = [
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
	"tengu",
	"thalassic",
	"vanara",
	"ysoki"
]

const RARE_LANGUAGES = [
	"oldtor",
	"anadi",
	"elder-thing",
	"goloma",
	"shisk",
	"strix",
	"shoony",
	"lashunta",
]

const LANGUAGE_RARITIES = [
	"common", "uncommon", "rare", "secret"
]

const LANGUAGE_BY_RARITIES = {
	common: COMMON_LANGUAGES,
	uncommon: UNCOMMON_LANGUAGES,
	rare: RARE_LANGUAGES,
	secret: ["wildsong"]
}

const LANGUAGES = ["common", ...COMMON_LANGUAGES, ...UNCOMMON_LANGUAGES, ...RARE_LANGUAGES, "wildsong"]
LANGUAGES.sort()

export {
	LANGUAGES,
	LANGUAGE_RARITIES,
	LANGUAGE_BY_RARITIES
}
