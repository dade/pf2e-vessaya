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
		await ReputationSystem.addNPC(sheet)
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

	$(".party-rep .rep-expand a.expand").on("click", async (event) => {
		const target = event.currentTarget
		const flags = game.actors.party.getFlag(MODULE, "reputation")
		const partyRep = target.closest(".party-rep")
		let repType

		if ($(partyRep).hasClass("faction")) {
			repType = "factions"
		} else if ($(partyRep).hasClass("npc")) {
			repType = "npcs"
		}

		const f = flags[repType].find(a => a.id === partyRep.dataset.id)

		if (f)
			f.expanded = !f.expanded

		await game.actors.party.setFlag(MODULE, "reputation", flags)
	})

	// $('a[data-action="save-rep"]').on("click", async (event) => {
	// 	const target = event.currentTarget
	// 	const repDiv = $(target).closest(".party-rep")[0]
	// 	const id = repDiv.dataset.id
	//
	// 	const nameInput = $(repDiv).find("input.group-name")[0].value
	// 	const valueInput = $(repDiv).find("input.party-value")[0].value
	//
	// 	const party = game.actors.party
	// 	const flags = await party.getFlag(MODULE, "reputation")
	// 	let entry
	//
	// 	if ($(repDiv).has(".faction")) {
	// 		entry = flags.factions.find(a => a.id === id)
	// 		if (entry) {
	// 			entry.name = nameInput
	// 			entry.value = valueInput
	// 		}
	// 	}
	//
	// 	if ($(repDiv).has(".npc")) {
	// 		entry = flags.npcs.find(b => b.id === id)
	// 		if (entry) {
	// 			entry.name = nameInput
	// 			entry.value = valueInput
	// 		}
	// 	}
	//
	// 	await party.setFlag(MODULE, "reputation", flags)
	//
	// 	ReputationSystem.switchRepEdit(event, id);
	// })

	$(".rep-details .form-group .group-name").on("change", async (event) => {
		const target = event.currentTarget
		const partyRep = target.closest(".party-rep")
		const id = partyRep.dataset.id
		const party = game.actors.party
		const flags = party.getFlag(MODULE, "reputation")

		let repType
		let entry

		if ($(partyRep).hasClass("faction")) {
			repType = "factions"
		} else {
			repType = "npcs"
		}

		if (repType !== null) {
			entry = flags[repType].find(a => a.id === id)
			entry.name = target.value
		}

		await party.setFlag(MODULE, "reputation", flags)
	})

	$(".rep-details .number-input").on("change", async (event) => {
		const target = event.currentTarget
		const partyRep = target.closest(".party-rep")
		const id = partyRep.dataset.id
		const party = game.actors.party
		const flags = party.getFlag(MODULE, "reputation")

		let repType
		let entry

		if ($(partyRep).hasClass("faction")) {
			repType = "factions"
		} else {
			repType = "npcs"
		}

		if (repType !== null) {
			entry = flags[repType].find(a => a.id === id)
			entry.value = target.value
		}

		await party.setFlag(MODULE, "reputation", flags)
	})

	$('.member-row input').on("change", async (event) => {
		const target = event.currentTarget
		const repEntry = $(target).closest(".rep-entry")[0]
		const repDiv = $(repEntry).find(".party-rep")[0]

		const repId = repDiv.dataset.id
		const inputValue = target.value
		const party = game.actors.party
		const flags = await party.getFlag(MODULE, "reputation")
		const uuid = $(target).closest(".member-row")[0].dataset.id

		let entry

		if ($(repDiv).hasClass("faction")) {
			entry = flags.factions.find(c => c.id === repId)
			const pc = entry.pcs.find(d => d.uuid === uuid)
			if (entry) {
				pc.reputation = inputValue
			}
		}

		if ($(repDiv).hasClass("npc")) {
			entry = flags.npcs.find(a => a.id === repId)
			const uuid = $(target).closest(".member-row")[0].dataset.id
			const pc = entry.pcs.find(b => b.uuid === uuid)
			if (entry) {
				pc.reputation = inputValue
			}
		}

		await party.setFlag(MODULE, "reputation", flags)
	})

	$('a[data-action="delete-rep"]').on("click", async (event) => {
		const repDiv = $(event.currentTarget).closest(".party-rep")[0]
		const id = repDiv.dataset.id

		const party = game.actors.party
		const flags = await party.getFlag(MODULE, "reputation")
		let entry

		if ($(repDiv).has(".faction")) {
			entry = flags.factions.find(f => f.id === id)
			if (entry) {
				const fi = flags.factions.indexOf(entry)
				flags.factions.splice(fi, 1)
			}
		}

		if ($(repDiv).has(".npc")) {
			entry = flags.npcs.find(n => n.id === id)
			if (entry) {
				const ni = flags.npcs.indexOf(entry)
				flags.npcs.splice(ni, 1)
			}
		}

		await party.setFlag(MODULE, "reputation", flags).then(() => {
			setTimeout(() => {
				sheet.render(true)
			}, 500)
		})
	})
})
