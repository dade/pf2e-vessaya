import { PLOT_DIE_SIDES, IMPORTED_RESOURCES } from "../consts.mjs"

export class PlotDie extends foundry.dice.terms.Die {

	isPlotDie = true
	
	constructor(data = {}) {
		super({
			...data,
			faces: 6
		})
	}

	static DENOMINATION = "p"

	get rolledComplication() {
		return this.results.find((r) => !r.discarded)?.failure ?? false
	}

	get rolledOpportunity() {
		return this.results.find((r) => !r.discarded)?.success ?? false
	}

	async roll({ minimize = false, maximize = false, ...options } = {}) {
		const roll = {
			result: undefined,
			active: true
		}

		if (minimize)
			roll.result = 1
		else if (maximize)
			roll.result = 6
		else
			roll.result = await this._roll(options)

		if (roll.result === undefined)
			roll.result = this.randomFace()
		if (roll.result <= 2) {
			roll.failure = true
			roll.count = roll.result * 2
		} else {
			if (roll.result >= 5)
				roll.success = true
			roll.count = 0
		}

		const rollResult = roll
		this.results.push(rollResult)
		return rollResult
	}

}

export function initPlotDie() {
	CONFIG.Dice.types.push(PlotDie)
	CONFIG.Dice.terms.p = PlotDie
	CONFIG.Dice.termTypes[PlotDie.name] = PlotDie
}
