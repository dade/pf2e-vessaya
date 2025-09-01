import { LANGUAGES_BY_RARITY } from "./scripts/consts.mjs"
import { default as VessayaJournalSheet } from "./scripts/journal/journal-sheet.mjs"
import { initConfigs } from "./scripts/configs.mjs"
import { PlotDie, initPlotDie } from "./scripts/variants/plot-die.mjs"

// CONSTS
import * as CONST from "./scripts/map-tools/map-consts.mjs"

// Map Imports
import VessayaHex from "./scripts/map-tools/region-hex.mjs"
import VessayaRegion from "./scripts/map-tools/region.mjs"
import VessayaHexHUD from "./scripts/map-tools/hex-hud.mjs"
import VessayaState from "./scripts/map-tools/region-state.mjs"
import VessayaKingdomLayer from "./scripts/map-tools/kingdom-layer.mjs"

const MODULE = "pf2e-vessaya"

async function updateLangSource(source, langs) {
	// TODO: might be worth revisiting this to see if we can refactor with
	// `foundry.utils.mergeObject` instead.
	let origLangs = source._source
	let i, s

	for (i of Object.keys(origLangs)) {
		if (langs[i] && Array.isArray(langs[i])) {
			for (s of origLangs[i]) {
				if (!langs[i].includes(s))
					origLangs.unavailable.push(s)

				// to move them back, do this
				if (origLangs.unavailable.includes(s))
					origLangs.unavailable.splice(s, 1)
			}
		}
	}

	Object.keys(langs).forEach((l) => {
		if (l !== "common")
			origLangs[l] = langs[l]
	})

	await game.settings.set("pf2e", "homebrew.languageRarities", source)
}

Hooks.once("init", async () => {
	globalThis.vessaya = game.modules.get(MODULE)
	vessaya.opts = {}
	vessaya.dataModels = {}
	vessaya.CSS_CLASS = "vessaya"
	vessaya.CONST = CONST

	vessaya.api = {
		VessayaHex,
		VessayaHexHUD,
		VessayaRegion,
		VessayaState,
		VessayaKingdomLayer
	}

	DocumentSheetConfig.registerSheet(JournalEntry, MODULE, VessayaJournalSheet, {
		types: [ "base" ],
		label: "Vessaya Journal Sheet",
		makeDefault: false,
	})

	game.settings.register(MODULE, "enablePlotDie", {
		name: "Enable Cosmere's Opportunity Dice",
		scope: "world",
		config: true,
		default: true,
		type: Boolean
	})

	game.settings.register(MODULE, "state", {
		name: "Vessaya Region State",
		scope: "world",
		config: false,
		requiresReload: false,
		type: VessayaState,
		default: {},
		onChange: (value) => {
			vessaya.state = value
			vessaya.region.onUpdateState()
		}
	})

	game.settings.register(MODULE, "fogExplorationRadius", {
		name: "Fog of War Reveal Radius",
		hint: "Configures how many hexes are revealed when the part token moves on the world map. Default: the party's hex and adjacent hexes are revealed. Limited: only the hex that the part hase entered is revealed.",
		scope: "world",
		config: true,
		type: String,
		choices: {
			"default": "Default (adjacent hexes)",
			"limited": "Limited (single hex)"
		},
		default: "default"
	})
	
	if (game.settings.get(MODULE, "enablePlotDie"))
		initPlotDie()
})

Hooks.once("ready", async () => {
	const currentVersion = game.modules.get(MODULE).version
	const lastVersion = game.modules.get(MODULE, "lastVersion")

	if (foundry.utils.isNewerVersion(currentVersion, lastVersion)) {
		// Do some logic here - if we care about showing new versions...?
	}

	// TODO: Turn this into a button that we can force "reset" of languages
	// but not do it on every ready hook.
	let savedLangs = game.settings.get("pf2e", "homebrew.languageRarities")
	await updateLangSource(savedLangs, LANGUAGES_BY_RARITY)

	if (game.settings.get(MODULE, "enablePlotDie")) {
		console.log("Write plot die code")
	}
})

Hooks.on("canvasConfig", () => vessaya.region._onConfig())
Hooks.on("canvasInit", () => vessaya.region._onInit())
Hooks.on("canvasDraw", () => vessaya.region._onDraw())
Hooks.on("canvasReady", () => vessaya.region._onReady())
Hooks.on("canvasTearDown", () => vessaya.region._onTearDown())
Hooks.on("getSceneControlButtons", (buttons) => {
	vessaya.region._extendSceneControlButtons(buttons)
})

Hooks.once("setup", function () {
	vessaya.state = VessayaState.load()
	vessaya.region = new VessayaRegion()
})

Hooks.on("renderJournalSheet", (app, html) => {
	// console.log(app, html)
	// horribly hacky jquery code... don't look at it. i'm ashamed...
	const el = html.find(".window-title")
})

Hooks.on("renderJournalPageSheet", (app, html) => {
	const doc = app.document
	const journalFlag = doc.parent.sheet instanceof VessayaJournalSheet

	if (journalFlag)
		html.addClass("vessaya")
})

Hooks.on("renderCheckModifiersDialog", (app, html) => {
	if (!game.settings.get(MODULE, "enablePlotDie"))
		return

	const page = app.document
})
