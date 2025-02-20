import { LANGUAGE_BY_RARITIES } from "./scripts/consts.mjs"

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

	// The following code is ugly as balls. I will write a function for this
	// because this looks disgusting... but it works!
	let savedLangs = game.settings.get("pf2e", "homebrew.languageRarities")
	savedLangs._source.rare.push("oldtor")
	savedLangs._source.commonLanguage = "vessi"

	savedLangs._source.rare.sort()

	await game.settings.set("pf2e", "homebrew.languageRarities", savedLangs)
})
