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

	console.log(currentVersion, lastVersion)

	if (foundry.utils.isNewerVersion(currentVersion, lastVersion)) {
		// Do some logic here
	}

	const pf2e = CONFIG.PF2E

	// Preserve the original languages
	let pf2elang = pf2e.languages

	// How we do this...
	// We set up a bunch of languages, then...
	// in game.pf2e.settings.campaign.languages.common
	// we = [ "langs" ]
})
