import VessayaRegionMap from "./region.mjs"

/**
 * Individual hex metadata used to describe the Stolen Lands game state.
 * Encounter information:
 * @property {string} page // The journal page for the hex's encounter/location (if it has one)
 * @property {string} [discoveryTrait] // The encounter's discovery trait
 * @property {boolean} resourceTrait // The encounter's resource trait
 * @property {string} showEncounter // Whether or not the page is visible to players
 * Resource information:
 * @property {string} [commodity]
 * @property {string} [camp]
 * @property {string} showResources // Whether or not camps & commodities are visible to players
 * Travel information:
 * @property {string} zone
 * @property {string} terrain
 * @property {string} travel
 * Exploration & Kingdom-building information:
 * @property {number} exploration
 * @property {boolean} cleared
 * @property {boolean} claimed
 * Features
 * @property {array} features
 */
export class VessayaHexData extends foundry.abstract.DataModel {
	static defineSchema() {
		const fields = foundry.data.fields;
		const C = vessaya.CONST;
		return {
			page: new fields.StringField(),
			discoveryTrait: new fields.StringField(),
			resourceTrait: new fields.BooleanField({ initial: false }),
			showEncounter: new fields.BooleanField({ initial: false }),
			commodity: new fields.StringField({
				choices: C.COMMODITIES,
				blank: true,
				initial: "",
			}),
			camp: new fields.StringField({
				choices: C.CAMPS,
				blank: true,
				initial: "",
			}),
			showResources: new fields.BooleanField({ initial: false }),
			zone: new fields.StringField({ choices: C.ZONES, initial: "CA" }),
			terrain: new fields.StringField({
				choices: C.TERRAIN,
				initial: "plains",
			}),
			travel: new fields.StringField({ choices: C.TRAVEL, initial: "open" }),
			exploration: new fields.NumberField({
				choices: Object.values(C.EXPLORATION_STATES).map((s) => s.value),
				initial: 0,
			}),
			cleared: new fields.BooleanField({ initial: false }),
			claimed: new fields.BooleanField({ initial: false }),
			features: new fields.ArrayField(
				new fields.SchemaField({
					type: new fields.StringField({
						choices: C.FEATURES,
						initial: "landmark",
					}),
					name: new fields.StringField({ blank: true }),
					discovered: new fields.BooleanField({ initial: false }),
				}),
			),
		};
	}
}

export default class VessayaHex extends (foundry.grid?.GridHex ?? GridHex) {

	constructor(coordinates, grid) {
		super(coordinates, grid);
		/**
		 * Game data regarding the hex.
		 * @type {VessayaHexData}
		 */
		this.data = this.#initializeHex();
	}

	key = VessayaHex.getKey(this.offset)

	get name() {
		if (this.data.page) {
			const page = fromUuidSync(this.data.page)
			if (page)
				return page.name
		}
		if (this.data.discoveryTrait)
			return this.discoveryTrait.label

		return this.toString()
	}
	get zone() {
		return vessaya.CONST.ZONES[this.data.zone]
	}

	get terrain() {
		return vessaya.CONST.TERRAIN[this.data.terrain]
	}

	get travel() {
		return vessaya.CONST.TRAVEL[this.data.travel]
	}

	get difficulty() {
		return vessaya.CONST.TRAVEL[this.data.difficulty]
	}

	get discoveryTrait() {
		return vessaya.CONST.DISCOVERY_TRAITS[this.data.discoveryTrait]
	}

	get explorationState() {
		return Object.values(vessaya.CONST.EXPLORATION_STATES).find((s) => s.value === this.data.exploration)
	}

	get color() {
		return Color.from(this.zone.color)
	}

	/**
	 * Initialize data for the hex
	 * @returns {VessayaHexData}
	 */
	#initializeHex() {
		const initial = vessaya.CONST.HEXES[this.toString()] || {}
		const state = vessaya.state.hexes[this.key] || {}
		const zone = vessaya.CONST.ZONES[initial.zone] || {}
		return VessayaHexData.fromSource(
			Object.assign({
				terrain: zone.terrain,
				travel: zone.travel
			},
			initial,
			state
		))
	}
	
	/**
	 * Get a unique integer that identifies a hex using offset coordinates
	 * @param {HexOffsetCoordinate} offset			The grid offset coordinate
	 * @returns {number}												The unique key
	 */
	static getKey(offset) {
		let i, j
		if (game.release.generation >= 12)
			({ i, j } = offset)
		else
			({ row: i, col: j } = offset)

		return Number((1000 * i) + j)
	}

	/**
	 * Express the hex as a string with format "{row}.{col}".
	 * @returns {string}
	 */
	toString() {
		let i, j
		if (game.release.generation >= 12)
			({ i, j } = this.offset)
		else
			({ row: i, col: j } = this.offset)
		return `${i}.${j}`
	}

	/**
	 * Draws a region on the map, taking the starting point,
	 * and then drawing based on directional inputs.
	 * @param {number}
	 * @param {Array} directions
	 * @returns {Array} coordinates
	 */
	static drawRegion(startCoords = [], startingPoint = "topleft", directions = []) {
		// This is all edited and customized code... for my future self to remember:
		// We are setting w = 50 which should be the size of the hex grid as per Foundry
		// Yes. This is manual. I don't have a more elegant solution at this time!
		//
		// From here, we are working out the height (this is the same ratio for all hexes)
		// and then creating "direction" code so that we can simply call it as part of the
		// hex definitions so I don't have to do math or manually set the coords each time...
		// because who the fuck needs that? you just have a start point, and then call
		// "dr" for down-right, "uu" for up-up, "ur" for up-right, etc.
		// It's elengant. Sue me...
		const w = 50
		const h = w * 1.1547

		let c = []
		let cc = []
		let sc = startCoords

		switch (startingPoint) {
			case "bottomleft":
				sc[1] += w * 0.75;
				break;
			case "bottom":
				sc[0] += w * 0.5;
				sc[1] += h;
				break;
			case "bottomright":
				sc[0] += w;
				sc[1] += h * 0.75;
				break;
			case "topleft":
				sc[1] += h * 0.25;
				break;
			case "top":
				sc[0] += w * 0.5;
				break;
			case "topright":
				sc[0] += w;
				sc[1] += h * 0.25;
				break;
		}
		
		cc = sc;

		if (directions !== null && cc !== null) {
			for (let dir of directions) {
				switch (dir) {
					case "dr":
						cc[0] += w * 0.5;
						cc[1] += h * 0.25;
						c.push(cc[0], cc[1]);
						break;
					case "dd":
						cc[1] += h * 0.5;
						c.push(cc[0], cc[1]);
						break;
					case "dl":
						cc[0] -= w * 0.5;
						cc[1] += h * 0.25;
						c.push(cc[0], cc[1]);
						break;
					case "ul":
						cc[0] -= w * 0.5;
						cc[1] -= h * 0.25;
						c.push(cc[0], cc[1]);
						break;
					case "uu":
						cc[1] -= h * 0.5;
						c.push(cc[0], cc[1]);
						break;
					case "ur":
						cc[0] += w * 0.5;
						cc[1] -= h * 0.25;
						c.push(cc[0], cc[1]);
						break;
				}
			}
		}

		return c
	}

}
