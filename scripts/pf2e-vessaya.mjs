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

	initMeleeAmmo()
})

Hooks.on("renderWeaponSheetPF2e", (data, html) => {

	const item = data.item
	const actor = data.item.actor

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

Hooks.on("renderCharacterSheetPF2e", (data, html) => {
	const actor = data.actor
	const el = html.find('li.strike section h4.name a')

	for (let i = 0; i < el.length; i++) {
		const item = game.actors.find(ac => ac._id === actor._id).items.find(it => it.name === el[i].innerText)
		if (item) {
			let editButton = document.createElement("div")
			editButton.innerHTML =
				`<a data-action="edit-item" data-uuid="Actor.${actor._id}.Item.${item.id}" data-item-id="${item.id}">
					<i class="fa-solid fa-fw fa-edit"></i>
				</a>
				<a data-action="manage-ammo" data-uuid="Actor.${actor._id}.Item.${item.id}" data-item-id="${item.id}">
					<i class="fa-solid fa-fw fa-spinner"></i>
				</a>`

			el[i]?.after(editButton)
		}
	}

	$('a[data-action="manage-ammo"]').click(() => {
		// NOTE:
		// This opens the item's ammo selector, which we should first exclude non-ammo items
		// from here, we can handle the rest of the logic
	})
})
