import VessayaHex from "./region-hex.mjs"
import VessayaHexHUD from "./hex-hud.mjs"
import VessayaHexEdit from "./hex-edit.mjs"
import VessayaHexSightPolygon from "./hex-sight.mjs"
import VessayaKingdomLayer from "./kingdom-layer.mjs"
import VessayaZoneEffects from "./zone-effects.mjs"

export default class VessayaRegion {

	constructor() {
		this.#initializeHexes()
		this.#initializeHUD()
	}

	static SCENE_ID = "7y1pIWCiyLK2YtPY"

	get scene() {
		return game.scenes.get(VessayaRegion.SCENE_ID)
	}

	get active() {
		return canvas.scene?.id === VessayaRegion.SCENE_ID
	}

	hexes = new Collection()
	hoveredHex = null
	hud
	#hexTool
	#zoneTool
	#resetTool
	kingdomLayer
	zoneGraphics = new PIXI.Graphics()
	filterBlur
	filterOutline

	#initializeHexes() {
		const grid = new foundry.grid.HexagonalGrid({ size: 50, even: true })
		for (let i = 0; i < 61; i++) {
			for (let j = 0; j < 74; j++) {
				const hex = new VessayaHex(game.release.generation >= 12 ? { i, j } : { row: i, col: j }, grid)
				this.hexes.set(hex.key, hex)
			}
		}
	}

	#initializeHUD() {
		this.hud = new VessayaHexHUD()
	}

	#initializeZoneFilters() {
		if (this.filterBlur || this.filterOutline)
			return
		const blur = this.filterBlur = new PIXI.BlurFilter(0.5)
		const outline = this.filterOutline = VessayaZoneEffects.create()

		outline.blendMode = blur.blendMode = PIXI.BLEND_MODES.SCREEN
		this.zoneGraphics.filters = [ outline, blur ]
	}

	onUpdateState() {
		this.#initializeHexes()
		if (canvas.id === this.constructor.SCENE_ID)
			this.kingdomLayer.draw()
	}

	getHexFromPoint(point) {
		let offset
		offset = canvas.grid.getOffset(point)
		return this.hexes.get(VessayaHex.getKey(offset))
	}

	_onConfig() {
		if (!this.active)
			return
	}

	_onInit() {
		if (!this.active)
			return
		if (canvas.visibilityOptions)
			canvas.visibilityOptions.persistentVision = true

		this.#initializeZoneFilters()
	}

	_onDraw() {
		if (!this.active)
			return
		CONFIG.Canvas.polygonBackends.sight = VessayaHexSightPolygon
	}

	_onReady() {
		if (!this.active)
			return

		this.kingdomLayer = new VessayaKingdomLayer()
		canvas.interface.grid.addChild(this.kingdomLayer)
		this.kingdomLayer.draw()

		this.#mousemove = this.#onMouseMove.bind(this)
		canvas.stage.on("mousemove", this.#mousemove)
		if (game.user.isGM) {
			this.#mousedown = this.#onMouseDown.bind(this)
			canvas.stage.on("mousedown", this.#mousedown)
		}

		const grid = canvas.interface.grid
		grid.addHighlightLayer("VessayaRegion")
		canvas.interface.addChild(this.zoneGraphics)
	}

	_onTearDown() {
		if (!this.active)
			return

		canvas.interface.removeChild(this.zoneGraphics)
		this.hoveredHex = null
		this.hud.clear()

		canvas.stage.off(this.#mousemove)
		this.#mousemove = undefined
		canvas.stage.off(this.#mousedown)
		this.#mousedown = undefined

		CONFIG.Canvas.polygonBackends.sight = ClockwiseSweepPolygon

		canvas.interface.grid.destroyHighlightLayer("VessayaRegion")
	}

	_extendSceneControlButtons(buttons) {
		if (canvas.id !== this.constructor.SCENE_ID)
			return

		this.#hexTool = buttons.tokens.tools.hex = {
			name: "hex",
			title: "VESSAYA.ToggleHexTool",
			icon: "fa-solid fa-hexagon-image",
			visible: true,
			toggle: true,
			active: this.hud.enabled ?? false,
			onClick: () => this.hud.toggle()
		}

		this.#zoneTool = buttons.tokens.tools.zones = {
			name: "zones",
			title: "VESSAYA.ToggleZoneBoundaries",
			icon: "fa-solid fa-chart-area",
			visible: true,
			toggle: true,
			active: this.zoneGraphics.visible ?? false,
			onClick: () => (this.zoneGraphics.visible = !this.zoneGraphics.visible)
		}

		this.#resetTool = buttons.tokens.tools.reset = {
			name: "reset",
			title: "Reset Map Data",
			icon: "fa-solid fa-cancel",
			visible: game.user.isGM,
			toggle: false,
			onClick: () => vessaya.state.reset()
		}
	}

	#mousemove
	#mousedown
	#clickTime = 0

	#onMouseMove(event) {
		let hex = null
		if (
			(this.hud.enabled || this.zoneGraphics.visible) &&
			event.srcElement?.id === "board"
		) {
			hex = this.getHexFromPoint(event.data.getLocalPosition(canvas.stage))
		}

		if (!hex)
			this.hud.clear()
		else if (hex !== this.hoveredHex)
			this.hud.activate(hex)
		this.hoveredHex = hex || null
	}

	#onMouseDown(event) {
		if (!this.hud.enabled ||
			!this.hoveredHex ||
			![ canvas.stage, canvas.activeLayer ].includes(event.target))
			return
		const t0 = this.#clickTime
		const t1 = (this.#clickTime = Date.now())
		if ((t1 - t0) > 250)
			return
		const hex = this.hoveredHex
		const app = new VessayaHexEdit(hex)
		app.render(true, { left: event.x + 100, top: event.y - 50 })
	}

}
