const moduleName = "pf2e-vessaya"

export function initConfigs() {
	game.settings.register(moduleName, "enableReputation", {
		name: "Enable Reputation in Party Sheet",
		scope: "world",
		config: true,
		default: true,
		type: Boolean
	})
}
