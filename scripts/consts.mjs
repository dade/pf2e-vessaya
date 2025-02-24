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
	commonLanguage: COMMON_LANGUAGE
}

const LANGUAGES = ["common", ...COMMON_LANGUAGES, ...UNCOMMON_LANGUAGES, ...RARE_LANGUAGES, "wildsong"]
LANGUAGES.sort()

export {
	LANGUAGES,
	LANGUAGE_RARITIES,
	LANGUAGES_BY_RARITY
}
