import { LANGUAGES_BY_RARITY } from "./scripts/consts.mjs"
import { default as VessayaJournalSheet } from "./scripts/journal/journal-sheet.mjs"
import { initConfigs } from "./scripts/configs.mjs"

const MODULE = "pf2e-vessaya"

async function updateSource(source, langs) {
	// NOTE: might be worth revisiting this to see if we can refactor with
	// `foundry.utils.mergeObject` instead.
	let origLangs = source._source
	let i, s

	for (i of Object.keys(origLangs)) {
		if (langs[i] && Array.isArray(langs[i])) {
			for (s of origLangs[i]) {
				if (!langs[i].includes(s))
					origLangs.unavailable.push(s)
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

	DocumentSheetConfig.registerSheet(JournalEntry, MODULE, VessayaJournalSheet, {
		label: "Vessaya Journal Sheet",
		makeDefault: true,
	})

	initConfigs()

	// NOTE: Enrichers are declared and handled further down in a second Hooks.once("init") call
})

Hooks.once("ready", async () => {
	const currentVersion = game.modules.get(MODULE).version
	const lastVersion = game.modules.get(MODULE, "lastVersion")

	if (foundry.utils.isNewerVersion(currentVersion, lastVersion)) {
		// Do some logic here - if we care about showing new versions...?
	}

	let savedLangs = game.settings.get("pf2e", "homebrew.languageRarities")

	await updateSource(savedLangs, LANGUAGES_BY_RARITY)
})

Hooks.on("renderJournalSheet", (app, html) => {
	// console.log(app, html)
	// horribly hacky jquery code... don't look at it. i'm ashamed... :(
	const el = html.find(".window-title")
	console.log(el)
})

Hooks.on("renderJournalPageSheet", (app, html) => {
	const doc = app.document
	const journalFlag = doc.parent.sheet instanceof VessayaJournalSheet
	if (journalFlag)
		html.addClass("vessaya")
})

Hooks.on("renderPartySheetPF2e", function(sheet, html, data) {
	if (!game.user.isGM)
		return
})
