import { LANGUAGES_BY_RARITY } from "./scripts/consts.mjs"

function updateSource(source, langs) {
	let origLangs = source._source
	let i

	for (i of Object.keys(origLangs)) {
		if (!langs[i])
			continue
		if (Array.isArray(langs[i]))
			origLangs.unavailable.push(origLangs[i])
	}
}

/**
 * Hooks
 */
Hooks.once("init", () => {
	const module = game.modules.get("pf2e-vessaya")
	module.opts = {}
	module.dataModels = {}
})

Hooks.once("ready", async () => {
	const currentVersion = game.modules.get("pf2e-vessaya").version
	const lastVersion = game.modules.get("pf2e-vessaya", "lastVersion")

	if (foundry.utils.isNewerVersion(currentVersion, lastVersion)) {
		// Do some logic here
	}

	const pf2e = CONFIG.PF2E
	let savedLangs = game.settings.get("pf2e", "homebrew.languageRarities")

	updateSource(savedLangs, LANGUAGES_BY_RARITY)
})
