// Imports??
import { PF2eWeapon } from "../types/pf2e/weapon.js"

/**
 * Notes...
 * TODO:
 * 1. Create a new UI to handle the ammunition of weapons, including PF2e-only
 * 2. Create utils and handlers for all of the events when updating from the UI so that all other default views
 * get the same data
 * 	2a. Potentially using flags on the item, rather than Actor Effects or trying to edit the item directly
 * 	2b. Will require async functionality to handle the data when a roll/strike is made and the ammunition is consumed
 * 3. Animations/assets for each window
 * 	3a. Can CSS acheive all the animations of barrels and more?
 * 	3b. Does this UI exist on its own, or is it attached to the character sheet?
 */

/**
 * @param {PF2eWeapon} weapon
 */
export function meleeAmmo(weapon) {
	const actor = weapon.actor
	const isChamber = weapon.traits.some(t => t.includes("chamber"))
	let isMeleeAmmo

	if (!isChamber) {
		return false
	} else {
		// We want to do something with this, but not sure what, yet.
	}

	return isChamber
}

export async function initMeleeAmmo() {
	// NOTE: Find all items that contain the trait "chamber"
	// We then need to check to make sure that these are melee only
	// then return the list back to the caller
	//
	// NOTE: This doesn't work as intended, so either we need to...
	// 1. override the ranges in PF2e's systems, which is locked behind private consts, or
	// 2. override the system altogether and build a new UI that handles the entire process OUTSIDE of the
	// WepaonSheetPF2e class
	const chamberItems = game.items.filter(item => item.traits.some(t => t.includes("chamber")))
	const chamberMelee = chamberItems.filter(c => c.system.range < 10)

	// console.log(chamberMelee)

	for (let i in chamberMelee) {
		await chamberMelee[i].setFlag("pf2e-vessaya", "isMeleeAmmo", true)
	}

	// console.log(chamberMelee[0].flags)
}
