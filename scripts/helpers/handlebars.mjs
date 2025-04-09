export function initHandlebarsHelpers() {

	Handlebars.registerHelper("setVar", function(varName, varValue, options) {
		options.data.root[varName] = varValue
	})

	Handlebars.registerHelper("ifEquals", function(arg1, arg2, options) {
		return (arg1 == arg2) ? options.fn(this) : options.inverse(this)
	})

}
