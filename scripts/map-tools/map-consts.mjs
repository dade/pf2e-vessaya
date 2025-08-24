export { default as HEXES } from "./region-hexes.mjs"
export { default as ZONES } from "./zones.mjs"

/**
 * The progression of exploration states for an individual hex
 * @type {ReadOnly<{NONE: number, RECON: number, MAP: number}>}
 */
export const EXPLORATION_STATES = Object.freeze({
	NONE: {
		value: 0,
		label: "VESSAYA.EXPLORATION_STATES.NONE"
	},
	RECON: {
		value: 1,
		label: "VESSAYA.EXPLORATION_STATES.RECON"
	},
	MAP: {
		value: 2,
		label: "VESSAYA.EXPLORATION_STATES.MAP"
	}
})

/**
 * The terrain types in the region
 * @type {ReadOnly<{ id: string, label: string, img: string }>}
 */
export const TERRAIN = Object.freeze({
	plains: {
		id: "plains",
		label: "VESSAYA.TERRAIN.PLAINS",
		img: "modules/pf2e-vessaya/assets/maps-regions/vessaya/terrain/plains.webp"
	},
	forest: {
		id: "forest",
		label: "VESSAYA.TERRAIN.FOREST",
		img: "modules/pf2e-vessaya/assets/maps-regions/vessaya/terrain/forest.webp"
	},
	hills: {
		id: "hills",
		label: "VESSAYA.TERRAIN.HILLS",
		img: "modules/pf2e-vessaya/assets/maps-regions/vessaya/terrain/hills.webp"
	},
	mountains: {
		id: "mountains",
		label: "VESSAYA.TERRAIN.MOUNTAINS",
		img: "modules/pf2e-vessaya/assets/maps-regions/vessaya/terrain/mountains.webp"
	},
	wetlands: {
		id: "wetlands",
		label: "VESSAYA.TERRAIN.WETLANDS",
		img: "modules/pf2e-vessaya/assets/maps-regions/vessaya/terrain/wetlands.webp"
	},
	swamp: {
		id: "swamp",
		label: "VESSAYA.TERRAIN.SWAMP",
		img: "modules/pf2e-vessaya/assets/maps-regions/vessaya/terrain/swamp.webp"
	},
	lake: {
		id: "lake",
		label: "VESSAYA.TERRAIN.LAKE",
		img: "modules/pf2e-vessaya/assets/maps-regions/vessaya/terrain/lake.webp"
	},
	coast: {
		id: "coast",
		label: "VESSAYA.TERRAIN.COAST",
		img: "modules/pf2e-vessaya/assets/maps-regions/vessaya/terrain/coast.webp"
	},
	ocean: {
		id: "ocean",
		label: "VESSAYA.TERRAIN.OCEAN",
		img: "modules/pf2e-vessaya/assets/maps-regions/vessaya/terrain/ocean.webp"
	},
	islands: {
		id: "islands",
		label: "VESSAYA.TERRAIN.ISLANDS",
		img: "modules/pf2e-vessaya/assets/maps-regions/vessaya/terrain/islands.webp"
	},
	glacier: {
		id: "glacier",
		label: "VESSAYA.TERRAIN.GLACIER",
		img: "modules/pf2e-vessaya/assets/maps-regions/vessaya/terrain/glacier.webp"
	},
	tundra: {
		id: "tundra",
		label: "VESSAYA.TERRAIN.TUNDRA",
		img: "modules/pf2e-vessaya/assets/maps-regions/vessaya/terrain/tundra.webp"
	}
})

/**
 * The overalnd travel speeds encountered in the region
 * @enum {ReadOnly<{ id: string, label: string, multiplier: number }>}
 */
export const TRAVEL = Object.freeze({
	open: {
		id: "open",
		label: "VESSAYA.TRAVEL.OPEN",
		multiplier: 1,
	},
	difficult: {
		id: "difficult",
		label: "VESSAYA.TRAVEL.DIFFICULT",
		multiplier: 2,
	},
	greater: {
		id: "greater",
		label: "VESSAYA.TRAVEL.GREATER",
		multiplier: 1,
	},
	water: {
		id: "water",
		label: "VESSAYA.TRAVEL.WATER",
		multiplier: 1,
	},
	impassable: {
		id: "impassable",
		label: "VESSAYA.TRAVEL.IMPASSABLE",
		multiplier: Infinity,
	},
});

/**
 * The encounter trait that indicates how easy it is to detect a feature while exploring
 */
export const DISCOVERY_TRAITS = Object.freeze({
	landmark: {
		id: "landmark",
		label: "VESSAYA.DISCOVERY_TRAITS.LANDMARK",
	},
	standard: {
		id: "standard",
		label: "VESSAYA.DISCOVERY_TRAITS.STANDARD",
	},
	secret: {
		id: "secret",
		label: "VESSAYA.DISCOVERY_TRAITS.SECRET",
	},
});

/**
 * The types of special "terrain features" that can exist on a hex in the region
 * @type {ReadOnly<{ id: string, label: string, img: string }>}
 */
export const FEATURES = Object.freeze({
	landmark: {
		id: "landmark",
		label: "VESSAYA.FEATURES.LANDMARK",
		img: "modules/pf2e-vessaya/assets/maps-regions/vessaya/features/landmark.webp",
	},
	ruin: {
		id: "ruin",
		label: "VESSAYA.FEATURES.RUIN",
		img: "modules/pf2e-vessaya/assets/maps-regions/vessaya/features/ruins.webp",
	},
	structure: {
		id: "structure",
		label: "VESSAYA.FEATURES.STRUCTURE",
		img: "modules/pf2e-vessaya/assets/maps-regions/vessaya/features/structure.webp",
	},
	farmland: {
		id: "farmland",
		label: "VESSAYA.FEATURES.FARMLAND",
		img: "modules/pf2e-vessaya/assets/maps-regions/vessaya/features/farmland.webp",
	},
	ford: {
		id: "ford",
		label: "VESSAYA.FEATURES.FORD",
		img: "modules/pf2e-vessaya/assets/maps-regions/vessaya/features/ford.webp",
	},
	waterfall: {
		id: "waterfall",
		label: "VESSAYA.FEATURES.WATERFALL",
		img: "modules/pf2e-vessaya/assets/maps-regions/vessaya/features/waterfall.webp",
	},
	hazard: {
		id: "hazard",
		label: "VESSAYA.FEATURES.HAZARD",
		img: "modules/pf2e-vessaya/assets/actor-portraits/hazards/default.webp",
	},
	village: {
		id: "village",
		label: "VESSAYA.FEATURES.VILLAGE",
		img: "modules/pf2e-vessaya/assets/maps-regions/vessaya/features/village.webp",
	},
	town: {
		id: "town",
		label: "VESSAYA.FEATURES.TOWN",
		img: "modules/pf2e-vessaya/assets/maps-regions/vessaya/features/town.webp",
	},
	city: {
		id: "city",
		label: "VESSAYA.FEATURES.CITY",
		img: "modules/pf2e-vessaya/assets/maps-regions/vessaya/features/city.webp",
	},
	metropolis: {
		id: "metropolis",
		label: "VESSAYA.FEATURES.METROPOLIS",
		img: "modules/pf2e-vessaya/assets/maps-regions/vessaya/features/metropolis.webp",
	},
});

/**
 * The resources which may exist in a particular hex of the region
 * @enum {ReadOnly<{ id: string, label: string }>}
 */
export const COMMODITIES = Object.freeze({
	food: {
		id: "food",
		label: "VESSAYA.COMMODITIES.FOOD",
		img: "modules/pf2e-vessaya/assets/maps-regions/vessaya/features/food.webp",
	},
	ore: {
		id: "ore",
		label: "VESSAYA.COMMODITIES.ORE",
		img: "modules/pf2e-vessaya/assets/maps-regions/vessaya/features/ore.webp",
	},
	lumber: {
		id: "lumber",
		label: "VESSAYA.COMMODITIES.LUMBER",
		img: "modules/pf2e-vessaya/assets/maps-regions/vessaya/features/lumber.webp",
	},
	luxuries: {
		id: "luxuries",
		label: "VESSAYA.COMMODITIES.LUXURIES",
		img: "modules/pf2e-vessaya/assets/maps-regions/vessaya/features/luxury.webp",
	},
	stone: {
		id: "stone",
		label: "VESSAYA.COMMODITIES.STONE",
		img: "modules/pf2e-vessaya/assets/maps-regions/vessaya/features/stone.webp",
	},
});

/**
 * The types of work camps that exist in the region
 * @enum {ReadOnly<{ id: string, label: string }>}
 */
export const CAMPS = Object.freeze({
	quarry: {
		id: "quarry",
		label: "VESSAYA.CAMPS.QUARRY",
		img: "modules/pf2e-vessaya/assets/maps-regions/vessaya/features/quarry.webp",
	},
	mine: {
		id: "mine",
		label: "VESSAYA.CAMPS.MINE",
		img: "modules/pf2e-vessaya/assets/maps-regions/vessaya/features/mine.webp",
	},
	lumber: {
		id: "lumber",
		label: "VESSAYA.CAMPS.LUMBER",
		img: "modules/pf2e-vessaya/assets/maps-regions/vessaya/features/lumber.webp",
	},
	fishing: {
		id: "fishing",
		label: "VESSAYA.CAMPS.FISHING",
		img: "modules/pf2e-vessaya/assets/maps-regions/vessaya/features/fishing.webp"
	}
});


