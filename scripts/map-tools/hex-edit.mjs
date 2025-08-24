import { VessayaHexData } from "./region-hex.mjs"

export default class VessayaHexEdit extends FormApplication {
	/** @inheritdoc **/
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			id: "vessaya-hex-edit",
			classes: [ vessaya.CSS_CLASS ],
			template: "modules/pf2e-vessaya/templates/hex-edit.hbs",
			width: 420,
			height: "auto",
			popOut: true,
			closeOnSubmit: true
		})
	}

	static featurePartial = "modules/pf2e-vessaya/templates/hex-edit-features.hbs"
	
	get title() {
		return `Edit Hex: ${this.object.toString()}`
	}

	async _render(force, options) {
		await loadTemplates([ this.constructor.featurePartials ])
		vessaya.hexConfig = this
		return super._render(force, options)
	}

	async close(options) {
		await super.close(options)
		vessaya.hexConfig = null
	}

	async getData(options) {
		return Object.assign(await super.getData(options), {
			camps: vessaya.CONST.CAMPS,
			commodities: vessaya.CONST.COMMODITIES,
			explorationStates: vessaya.CONST.EXPLORATION_STATES,
			hex: this.object.data,
			features: vessaya.CONST.FEATURES,
			featurePartial: this.constructor.featurePartial
		})
	}

	/** @override */
	async _updateObject(event, formData) {
		formData = foundry.utils.expandObject(formData)
		formData.features = formData.features
			? Object.values(formData.features)
			: []
		const state = VessayaHexData.cleanData(formData, { partial: true })
		vessaya.state.updateSource({
			hexes: {
				[this.object.key]: state,
			}
		})
		await vessaya.state.save()
	}

	async #onClickAction(event) {
		event.preventDefault()
		const button = event.currenTarget
		const action = button.dataset.action

		switch (action) {
			case "addFeature": {
				const html = await renderTemplate(this.constructor.featurePartial, {
					id: foundry.utils.randomID(),
					type: "landmark",
					features: vessaya.CONST.FEATURES
				})
				const fieldset = button.closest("fieldset")
				fieldset.insertAdjacentHTML("beforeend", html)
				this.setPosition({ height: "auto" })
				break
			}
			case "removeFeature": {
				const div = button.closest("div.form-group")
				div.remove()
				this.setPosition({ height: "auto" })
				break
			}
		}
	}
}
