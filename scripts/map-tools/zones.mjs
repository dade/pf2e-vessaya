import VessayaHex from "./region-hex.mjs"

export default Object.freeze({
	NA: {
		id: "NA",
		label: "VESSAYA.ZONES.NA",
		travel: "water",
		color: "#FFFFFF",
		polygon: []
	},
	CA: {
		id: "CA",
		label: "VESSAYA.ZONES.CA",
		travel: "open",
		color: "#BA1212",
		polygon: VessayaHex.drawRegion([0, 0], "top", [
			"dr", "dd", "dl", "ul", "uu", "ur"
		])
	}
})
