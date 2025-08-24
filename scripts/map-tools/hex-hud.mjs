export default class VessayaHexHUD extends Application {

	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			id: "vessaya-hex-hud",
			classes: [vessaya.CSS_CLASS],
			template: "modules/pf2e-vessaya/templates/hex-hud.hbs",
			popOut: false,
			width: 760,
			height: "auto"
		})
	}

	/**
	 * The target hex that the HUD describes
	 * @type {VesiHex}
	 */
	hex;

	/**
	 * Is the hex HUD enabled?
	 * @type {boolean}
	 */
	enabled = false;

	/* -------------------------------------------- */

	/** @override */
	_injectHTML(html) {
		this._element = html;
		document.getElementById("hud").appendChild(html[0]);
	}

	toggle(enabled) {
		enabled ??= !this.enabled
		this.enabled = enabled
		if (enabled)
			vessaya.region.kingdomLayer.visible = true
		else {
			vessaya.region.kingdomLayer.visible = false
			this.clear()
		}
	}


	getData(options = {}) {
		const data = this.hex.data

		return {
			id: this.options.id,
			cssClass: this.options.classes.join(" "),
			hex: this.hex,
			commodity: vessaya.CONST.COMMODITIES[data.commodity],
			camp: vessaya.CONST.CAMPS[data.camp],
			displayEncounter: data.page && (game.user.isGM || data.showEncounter),
			displayResources: (data.camp || data.commodity) && (game.user.isGM || data.showResources),
			explored: data.exploration > 0,
			zone: this.hex.zone,
			features: data.features.reduce((arr, f) => {
				if (game.user.isGM || f.discovered)
					arr.push({
						name: f.name || game.i18n.localize(vessaya.CONST.FEATURES[f.type]?.label),
						discovered: f.disocvered,
						img: game.i18n.localize(vessaya.CONST.FEATURES[f.type]?.img) || "modules/pf2e-vessaya/assets/maps-regions/features/default.webp"
					})

				return arr
			}, [])
		}
	}

	setPosition({ left, top } = {}) {
		const position = {
			height: undefined,
			left: left,
			top: top,
			width: this.options.width
		}
		this.element.css(position)
	}

	async activate(hex) {
		this.hex = hex

		if (vessaya.region.zoneGraphics.visible) {
			const zoneKey = hex.zone.id
			const polygon = vessaya.CONST.ZONES[zoneKey]?.polygon
			if (polygon !== undefined) {
				vessaya.region.zoneGraphics.clear().lineStyle(8, 0x606060, 1, 0.5).drawPolygon(polygon)
			}
		}

		if (this.enabled) {
			const { x, y } = hex.topLeft
			const options = {
				left: x + (game.release.generation >= 12 ? hex.grid.sizeX : hex.config.width) + 20,
				top: y
			}
			const grid = game.release.generation >= 12 ? canvas.interface.grid : canvas.grid

			grid.clearHighlightLayer("VessayaRegion")
			grid.highlightPosition("VessayaRegion", { x, y, color: Color.from(hex.color) })
			return this._render(true, options)
		}
	}

	clear() {
		let states = this.constructor.RENDER_STATES
		const grid = game.release.generation >= 12 ? canvas.interface.grid : canvas.grid
		grid.clearHighlightLayer("VessayaRegion")
		
		if (this._state <= states.NONE)
			return

		this._state = states.CLOSING
		this.element.hide()
		this._element = null
		this._state = states.NONE
	}

}
