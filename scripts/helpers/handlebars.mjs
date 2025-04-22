export function initHandlebarsHelpers() {

	Handlebars.registerHelper("setVar", function(varName, varValue, options) {
		options.data.root[varName] = varValue
	})

	Handlebars.registerHelper("ifEquals", function(arg1, arg2, options) {
		return (arg1 == arg2) ? options.fn(this) : options.inverse(this)
	})

	Handlebars.registerHelper("getImgFromUUID", function(uuid, _) {
		return game.actors.find(a => a.uuid === uuid).img
	})

	Handlebars.registerHelper("getRepText", function(value) {
		let text
		if (value < 20) {
			text = "Ignored"
		} else if (value < 60) {
			text = "Liked"
		} else if (value < 120) {
			text = "Admired"
		} else {
			text = "Revered"
		}
		return text
	})

}
