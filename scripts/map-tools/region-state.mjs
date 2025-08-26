export default class VessayaState extends foundry.abstract.DataModel {

	static defineSchema() {
		const fields = foundry.data.fields
		return {
			hexes: new fields.ObjectField()
		}
	}

	static load() {
		const data = game.settings.get("pf2e-vessaya", "state")
		return this.fromSource(data)
	}

	async save() {
		await game.settings.set("pf2e-vessaya", "state", this.toObject())
	}

	async reset() {
		const hexes = {}
		for (const [ hexString, { state } ] of Object.entries(vessaya.CONST.HEXES)) {
			if (!state)
				continue

			const [ row, col ] = hexString.split(".").map(Number)

			const key = (row * 1000) + col
			hexes[key] = state
		}

		this.updateSource({ hexes }, { recursive: false })
		await this.save()

		if (game.actors.party && vessaya.region.scene) {
			const token = await game.actors.party?.getTokenDocument({
				_id: game.actors.party.id,
				x: 2600,
				y: 1819,
				texture: {
					src: "modules/pf2e-vessaya/assets/party/party-main.webp",
					scaleX: 1.2,
					scaleY: 1.2
				}
			})

			await game.actors.party?.update({
				prototypeToken: {
					texture: {
						src: "modules/pf2e-vessaya/assets/party/party-main.webp",
						scaleX: 1.2,
						scaleY: 1.2
					}
				}
			})

			await vessaya.region.scene.update({
				tokens: [token.toObject()]
			},
			{
				recursive: false,
				noHook: true
			})
		}
	}

}
