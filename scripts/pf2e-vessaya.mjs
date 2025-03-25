import { LANGUAGES_BY_RARITY } from "./consts.mjs"
import { initConfigSettings } from "./config/config.mjs"
import { meleeAmmo, initMeleeAmmo } from "./systems/ammo-system.mjs"
import { MyNewApp } from "./systems/item-sheet-override.mjs"

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

	// Initialize all the parts of the module
	initConfigSettings()
})

Hooks.once("ready", async () => {
	const currentVersion = game.modules.get("pf2e-vessaya").version
	const lastVersion = game.modules.get("pf2e-vessaya", "lastVersion")

	if (foundry.utils.isNewerVersion(currentVersion, lastVersion)) {
		// Do some logic here
	}

	let savedLangs = game.settings.get("pf2e", "homebrew.languageRarities")

	await updateSource(savedLangs, LANGUAGES_BY_RARITY)

	const ammo = meleeAmmo(await game.actors.find(a => a.name === "test").items.find(b => b.name === "Gunblade"))
	console.log(ammo)

	initMeleeAmmo()
})

Hooks.on("renderWeaponSheetPF2e", (data, html) => {
	// const item = data.item
	// const actor = data.item.actor
	//
	// if (item.getFlag("pf2e-vessaya", "isMeleeAmmo") && item.system.range < 10) {
	// 	console.log("HELLO WORLD!")
	//
	// 	html.find('fieldset.basics div.form-group:last-child')?.after(
	// 		`
	// 			<div class="form-group">
	// 				<label for="field-${data.appId}-reload">Reload Time</label>
	// 				<select name="system.reload.value" id="field-${data.appId}-reload">
	// 					<option value></option>
	// 					<option value="0">0</option>
	// 					<option value="1">1</option>
	// 					<option value="2">2</option>
	// 					<option value="3">3</option>
	// 					<option value="10">10</option>
	// 					<option value="-">—</option>
	// 				</select>
	// 			</div>
	// 		`
	// 	)
	// }
})
