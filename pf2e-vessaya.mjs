import { LANGUAGES_BY_RARITY } from "./scripts/consts.mjs"
// import { default as VessayaJournalSheet } from "./scripts/journal/journal-sheet.mjs"
import { VessayaJournalSheet } from "./scripts/journal/journal-sheet.mjs"

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

Hooks.once("init", () => {
	globalThis.vessaya = game.modules.get(MODULE)
	vessaya.opts = {}
	vessaya.dataModels = {}
	vessaya.CSS_CLASS = "vessaya"

	DocumentSheetConfig.registerSheet(JournalEntry, MODULE, VessayaJournalSheet, {
		label: "Vessaya Journal Sheet",
		makeDefault: false,
	})
})

Hooks.once("ready", async () => {
	const currentVersion = game.modules.get(MODULE).version
	const lastVersion = game.modules.get(MODULE, "lastVersion")

	if (foundry.utils.isNewerVersion(currentVersion, lastVersion)) {
		// Do some logic here
	}

	let savedLangs = game.settings.get("pf2e", "homebrew.languageRarities")

	await updateSource(savedLangs, LANGUAGES_BY_RARITY)
})
