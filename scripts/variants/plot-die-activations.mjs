class Activation extends foundry.absctract.DataModel {
	static defineSchema() {
		return {
			plotDie: new foundry.data.fields.BooleanField({
				nullable: true,
				initial: false,
				label: "VESSAYA.DICE.PLOT.RaiseTheStakes"
			})
		}
	}
}
