import { LANGUAGES_BY_RARITY } from "./scripts/consts.mjs"

async function updateSource(source, langs) {
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

	let savedLangs = game.settings.get("pf2e", "homebrew.languageRarities")

	updateSource(savedLangs, LANGUAGES_BY_RARITY)
})
