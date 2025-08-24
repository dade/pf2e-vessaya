export default class VessayaHexSightPolygon extends PointSourcePolygon {

	/**
	 * The amount of padding in pixels added to the explored hex region.
	 * @type {number}
	 */
	static PADDING = 20;

	/**
	 * The cached point offsets of the FOW reveal areas. 1 is the original behavior
	 * and explores the fog of adjacent hexes, 2 is the alternate version that only
	 * explores a single hex.
	 */
	static POINTS = {
		default: [
			[-1.5, -0.25],
			[-1, -0.5],
			[-1, -1],
			[-0.5, -1.25],
			[0, -1],
			[0.5, -1.25],
			[1, -1],
			[1, -0.5],
			[1.5, -0.25],
			[1.5, 0.25],
			[1, 0.5],
			[1, 1],
			[0.5, 1.25],
			[0, 1],
			[-0.5, 1.25],
			[-1, 1],
			[-1, 0.5],
			[-1.5, 0.25],
		],
		limited: [
			[0, 0.5],
			[0.5, 0.25],
			[0.5, -0.25],
			[0, -0.5],
			[-0.5, -0.25],
			[-0.5, 0.25],
		],
	};

	/**
	 * @inheritdoc
	 */
	initialize(origin, config) {
		super.initialize(origin, config);
		const cfg = this.config;

		if (cfg.type !== "sight") {
			throw new Error("HexSightPolygon may only be used for sight polygons.");
		}
	}

	_compute() {
		const hex = vessaya.region.getHexFromPoint(this.origin)
		this.points = VessayaHexSightPolygon.getHexVisibilityPoints(hex)
	}

	/**
   * A static helper method to get the visibility polygon points from a provided hex.
   * @param {GridHex} hex         The provided hex
   * @returns {number[]}          The preared polygon visibility points
   */
	static getHexVisibilityPoints(hex) {
		const c = hex.center
		let sizeX, sizeY
		if (game.release.generation >= 12)
			({ sizeX, sizeY } = hex.grid)
		else
			({ w: sizeX, h: sizeY } = canvas.grid.grid)
		const poly = []

		const setting = game.settings.get("pf2e-vessaya", "fogExplorationRadius") || "default"
		const polygonPoints = this.POINTS[setting]

		for (const [ox, oy] of polygonPoints) {
			const x = c.x + (ox * sizeX)
			const y = c.y + (oy * sizeY)
			const r = new Ray(c, { x, y })
			const py = this.PADDING * Math.sin(r.angle)
			const px = this.PADDING * Math.cos(r.angle)

			poly.push(x + px, y + py)
		}
		return poly
	}

	applyConstraint() {
		return this
	}

}
