import { LANGUAGES_BY_RARITY, REPUTATION } from "./scripts/consts.mjs"
// import { default as VessayaJournalSheet } from "./scripts/journal/journal-sheet.mjs"
import { VessayaJournalSheet } from "./scripts/journal/journal-sheet.mjs"
import { initConfigs } from "./scripts/configs.mjs"
import { ReputationSystem } from "./scripts/reputation/reputation-system.mjs"

const MODULE = "pf2e-vessaya"

const vessaya = {
	rep: REPUTATION
}

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

	initConfigs()
	ReputationSystem.init()
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

Hooks.on("renderJournalSheet", () => {
	// horribly hacky jquery code... don't look at it. i'm ashamed... :(
	const el = $(".sheet.journal-sheet.vessaya .document-title-edit")
	if (el.length > 0) {
		el.delete()
		$('.sheet.journal-sheet.vessaya .window-header .document-id-link').after(
			`<a class="document-title-edit" data-tooltip="Edit Document Title" data-tooltip-direction="UP"><i class="fa-solid fa-edit"></i></a>`
		)
	} else {
		$('.sheet.journal-sheet.vessaya .window-header .document-id-link').after(
			`<a class="document-title-edit" data-tooltip="Edit Document Title" data-tooltip-direction="UP"><i class="fa-solid fa-edit"></i></a>`
		)
	}

	$('.sheet.journal-sheet.vessaya .document-title-edit').click(() => {
		$(".sheet.journal-sheet.vessaya input.title").toggleClass("display")
	})
})

Hooks.on("renderPartySheetPF2e", function(sheet, html, data) {
	if (!game.user.isGM)
		return

	$('a[data-action="addNPC"]').on("click", async () => {
		await ReputationSystem.addNPC().then(() => {
			setTimeout(async () => {
				await sheet.render(true)
			}, 1000)
		})
	})

	$('a[data-action="addFaction"]').on("click", async () => {
		await ReputationSystem.addFaction(sheet)
	})

	$('a[data-action="reset"]').on("click", async () => {
		await ReputationSystem.repopulateData(
			game.actors.party,
			vessaya.rep,
			true
		).then(() => {
			setTimeout(async () => {
				await sheet.render(true)
			}, 500)
		})
	})

	$(".rep-details").on("click", (event) => {
		const group = event.currentTarget.closest(".rep-entry").querySelector(".member-rep")
		if (group) {
			group.style.display = group.style.display === "block" ? "none" : "block"
		}
	})

	$('a[data-action="edit-rep"]').on("click", (event) => {
		const ct = event.currentTarget
		const ch = $(ct).closest(".party-rep").find(".rep-details").children()
		ch.each((c) => {
			$(ch[c]).toggleClass("hidden")
		})
	})
})
