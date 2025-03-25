import { loc, locPath, locSettings } from "../utils/utils.mjs"

export const postToChatConfig = {
	none: 0,
	simple: 1,
	full: 2
}

export function initConfigSettings() {
	// Do we need this?
	game.settings.register(
		"pf2e-vessaya",
		"schemaVersion",
		{
			name: locSettings("schemaVersion.name"),
			hint: locSettings("schemaVersion.name"),
			scope: "world",
			config: false,
			type: Number,
			default: null
		}
	)

	game.settings.register(
		"pf2e-vessaya",
		"enableAmmoSystem",
		{
			name: locSettings("enableAmmoSystem.name"),
			hint: locSettings("enableAmmoSystem.hint"),
			scope: "world",
			config: true,
			type: Boolean,
			default: true
		}
	)

	// This would be useful, I guess.
	// game.settings.register(
	// 	"pf2e-vessaya",
	// 	"postActionToChat",
	// 	{
	// 		name: locSettings("postActionToChat.name"),
	// 		hint: locSettings("postActionToChat.hint"),
	// 		scope: "world",
	// 		config: true,
	// 		type: Number,
	// 		choices: {
	// 			0: locSettings("postToChat.none"),
	// 			1: locSettings("postToChat.simple"),
	// 			2: locSettings("postToChat.full")
	// 		},
	// 		default: postToChatConfig.simple
	// 	}
	// )
	//
	// game.settings.register(
	// 	"pf2e-vessaya",
	// 	"postAmmoToChat",
	// 	{
	// 		name: locSettings("postAmmoToChat.name"),
	// 		hint: locSettings("postAmmoToChat.hint"),
	// 		scope: "world",
	// 		config: true,
	// 		type: Number,
	// 		choices: {
	// 			0: locSettings("postToChat.none"),
	// 			1: locSettings("postToChat.simple"),
	// 			2: locSettings("postToChat.full")
	// 		},
	// 		default: postToChatConfig.simple
	// 	}
	// )
	//
	// game.settings.register(
	// 	"pf2e-vessaya",
	// 	"requiredPermissionToShowMessage",
	// 	{
	// 		name: locSettings("pf2e-vessaya.name"),
	// 		hint: locSettings("pf2e-vessaya.hint"),
	// 		scope: "world",
	// 		config: true,
	// 		type: Number,
	// 		choices: {
	// 			0: loc("OWNERSHIP.NONE"),
	// 			1: loc("OWNERSHIP.LIMITED"),
	// 			2: loc("OWNERSHIP.OBSERVER"),
	// 			3: loc("OWNERSHIP.OWNER"),
	// 		},
	// 		default: 0
	// 	}
	// )
	//
	// game.settings.register(
	// 	"pf2e-vessaya",
	// 	"preventFiringUnloaded",
	// 	{
	// 		name: locSettings("preventFiringUnloaded.name"),
	// 		hint: locSettings("preventFiringUnloaded.hint"),
	// 		scope: "world",
	// 		cconfig: true,
	// 		type: Boolean,
	// 		default: true
	// 	}
	// )
	//
	// game.settings.register(
	// 	"pf2e-vessaya",
	// 	"advancedAmmoSystemPlayer",
	// 	{
	// 		name: locSettings("advancedAmmoSystemPlayer.name"),
	// 		hint: locSettings("advancedAmmoSystemPlayer.hint"),
	// 		scope: "world",
	// 		config: true,
	// 		type: Boolean,
	// 		default: true
	// 	}
	// )
	//
	// game.settings.register(
	// 	"pf2e-vessaya",
	// 	"preventFiringUnloadedNPC",
	// 	{
	// 		name: locSettings("preventFiringUnloadedNPC.name"),
	// 		hint: locSettings("preventFiringUnloadedNPC.hint"),
	// 		scope: "world",
	// 		config: true,
	// 		type: Boolean,
	// 		default: true
	// 	}
	// )
	//
	// game.settings.register(
	// 	"pf2e-vessaya",
	// 	"ammoEffectsEnable",
	// 	{
	// 		name: locSettings("ammoEffectsEnable.name"),
	// 		hint: locSettings("ammoEffectsEnable.hint"),
	// 		scope: "world",
	// 		config: true,
	// 		type: Boolean,
	// 		default: true
	// 	}
	// )
	//
	// game.settings.register(
	// 	"pf2e-vessaya",
	// 	"ammoEffectsWarningLevel",
	// 	{
	// 		name: game.i18n.localize("pf2e-vessaya.ammoSystem.effect.settings.warningLevel.name"),
	// 		hint: game.i18n.localize("pf2e-vessaya.ammoSystem.effect.settings.warningLevel.hint"),
	// 		scope: "client",
	// 		config: true,
	// 		type: Boolean,
	// 		default: false
	// 	}
	// )
	//
	// game.settings.register(
	// 	"pf2e-vessaya",
	// 	"advancedThrownWeaponSystem",
	// 	{
	// 		name: locSettings("advancedThrownWeaponSystem.name"),
	// 		hint: locSettings("advancedThrownWeaponSystem.hint"),
	// 		scope: "world",
	// 		config: true,
	// 		type: Boolean,
	// 		default: true
	// 	}
	// )
	//
	// game.settings.register(
	// 	"pf2e-vessaya",
	// 	"fakeOutDC",
	// 	{
	// 		name: game.i18n.localize("pf2e-vessaya.feat.fakeOut.settings.dc.name"),
	// 		hint: game.i18n.localize("pf2e-vessaya.feat.fakeOut.settings.dc.hint"),
	// 		scope: "world",
	// 		config: true,
	// 		type: Number,
	// 		default: 15,
	// 		choices: {
	// 			15: "15",
	// 			20: "20",
	// 			0: game.i18n.localize("pf2e-vessaya.feat.fakeOut.settings.dc.enemyDC")
	// 		}
	// 	}
	// )
	//
	// game.settings.register(
	// 	"pf2e-vessaya",
	// 	"hideTokenIcons",
	// 	{
	// 		name: locSettings("hideTokenIcons.name"),
	// 		hint: locSettings("hideTokenIcons.hint"),
	// 		scope: "client",
	// 		config: true,
	// 		type: Boolean,
	// 		default: false
	// 	}
	// )
	//
	// game.settings.register(
	// 	"pf2e-vessaya",
	// 	"doNotShowWarningAgain",
	// 	{
	// 		name: "",
	// 		scope: "client",
	// 		default: false,
	// 		type: Boolean,
	// 		config: false
	// 	}
	// )
	//
	// Hooks.on("renderSettingsConfig", (_, html) => {
	// 	const headerTemplate = (headerName, desc = "") => `
	// 			<div style="...">
	// 				<h3 style="...">${headerName}</h3>
	// 				${desc}
	// 			</div>
	// 		`
	//
	// 	html.find('div[data-setting-id="pf2e-vessaya.postActionToChat"]')
	// 		?.closest(".form-group")
	// 		?.before(
	// 			headerTemplate(
	// 				loc("chatControls.header"),
	// 				`
	// 					<p class="notes">${loc("chatControls.description.main")}</p>
	// 					<ul class="notes">
	// 						<li>${loc("chatControls.description.full")}</li>
	// 						<li>${loc("chatControls.description.simple")}</li>
	// 						<li>${loc("chatControls.description.none")}</li>
	// 					</ul>
	// 				`
	// 			)
	// 		)
	//
	// 	html.find('div[data-setting-id="pf2e-vessaya.preventFiringUnloaded"]')
	// 		?.before(
	// 			headerTemplate(
	// 				loc("ammoSystemPlayer.header"),
	// 				`<p class="notes">${loc("ammosystemPlayer.description")}</p>`
	// 			)
	// 		)
	//
	// 	html.find('div[data-setting-id="pf2e-vessaya.preventFiringUnloadedNPC"]')
	// 		?.before(
	// 			headerTemplate(
	// 				loc("ammoSystemNPC.header"),
	// 				`
	// 					<p class="notes">${loc("ammoSystemNPC.description.line1")}</p>
	// 					<p class="notes">${loc("ammoSystemNPC.description.line2")}</p>
	// 				`
	// 			)
	// 		)
	//
	// 	html.find('div[data-setting-id="pf2e-vessaya.ammoEffectsEnable"]')
	// 		?.before(
	// 			headerTemplate(
	// 				loc("ammoEffects.header"),
	// 				`<p class="notes">${loc("ammoEffects.description")}</p>`
	// 			)
	// 		)
	//
	// 	html.find('div[data-setting-id="advancedThrownWeaponSystem.header"]')
	// 		?.before(
	// 			headerTemplate(
	// 				loc("advancedThrownWeaponSystem.header"),
	// 				`
	// 					<p class="notes">${loc("advancedThrownWeaponSystem.description.line1")}</p>
	// 					<p class="notes">${loc("advancedThrownWeaponSystem.description.line2")}</p>
	// 				`
	// 			)
	// 		)
	//
	// 	html.find('div[data-setting-id="pf2e-vessaya.fakeOutDC"]')
	// 		?.before(
	// 			headerTemplate(
	// 				loc("misc.header"),
	// 				`<p class="notes">${loc("misc.description")}`
	// 			)
	// 		)
	// })
}
