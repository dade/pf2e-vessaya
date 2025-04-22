// import { ApplicationV2, HandlebarsApplicationMixin } foundry.applications.api
import { initHandlebarsHelpers } from "../helpers/handlebars.mjs"

const MODULE = "pf2e-vessaya"

export class ReputationSystem {

	static app = null

	static async init() {
		this.patchFunc(
			"ActorSheet.prototype._renderInner",
			async function(wrapped, ...args) {
				let inner = await wrapped(...args)
				if (this.constructor.name == "PartySheetPF2e") {
					let [data] = args

					// NOTE: We may need to rebuild some data here. If so, repop the flag schema in this step
					await ReputationSystem.applyReputationTemplate(inner, data)
				}

				return inner
			}
		)

		initHandlebarsHelpers()
	}

	static patchFunc(prop, func, type) {
		if (game.modules.get("lib-wrapper")?.active) {
			libWrapper.register("pf2e-vessaya", prop, func, type)
		} else {
			const oldFunc = eval(prop)
			eval(`${prop} = function (event) {
				return func.call(this, oldFunc.bind(this), ...arguments)
			}`)
		}
	}

	static async applyReputationTemplate(inner, data) {
		let template = await renderTemplate("modules/pf2e-vessaya/templates/reputation/party-rep.html", data)
		let repTab = $("<div>").attr("data-tab", "reputation").addClass("tab").append(template)

		$("> .sub-nav", inner).append($("<a>").attr("data-tab", "reputation").text("Reputation"))
		$("> section.container", inner).append(repTab)
	}

	static async addNPC() {
		const party = game.actors.party
		const flags = party.getFlag(MODULE, "reputation")

		const uuid = foundry.utils.randomID(5)

		const members = party.members
		let pcs = []

		for (let member of members) {
			let pc = {
				name: member.name,
				uuid: member.uuid,
				reputation: 0
			}
			pcs.push(pc)
		}

		const npcStruct = {
			id: uuid,
			name: `New NPC ${flags.npcs.length + 1}`,
			value: 0,
			pcs,
			expanded: false
		}

		flags.npcs.push(npcStruct)
		party.setFlag(MODULE, "reputation", flags)
	}

	static async addFaction() {
		const party = game.actors.party
		const flags = party.getFlag(MODULE, "reputation")

		const uuid = foundry.utils.randomID(5)

		const members = party.members
		let pcs = []

		for (let member of members) {
			let pc = {
				name: member.name,
				uuid: member.uuid,
				reputation: 0
			}
			pcs.push(pc)
		}

		const factionStruct = {
			id: uuid,
			name: `New Faction ${flags.factions.length + 1}`,
			value: 0,
			pcs,
			expanded: false
		}

		flags.factions.push(factionStruct)
		party.setFlag(MODULE, "reputation", flags)
	}

	static async repopulateData(party, schema, rebuildData = false) {
		let data = await party.getFlag(MODULE, "reputation")
		if (rebuildData) {
			await party.setFlag(MODULE, "reputation", null)
			await party.setFlag(MODULE, "reputation", schema)
		}

		if (!data)
			await party.setFlag(MODULE, "reputation", schema)
	}

	static switchRepEdit(event) {
		const target = event.currentTarget
		const details = $(target).closest(`.party-rep`).find(".rep-details").children()

		$(target).parent().children().toggleClass("hidden")

		details.each((c) => {
			$(details[c]).toggleClass("hidden")
		})
	}

}
