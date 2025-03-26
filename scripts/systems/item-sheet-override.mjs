const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api

export class AmmoUI extends HandlebarsApplicationMixin(ApplicationV2) {

	constructor() {
		super()
		this.itemId = ""
		this.actorItemID = ""
	}

	static DEFAULT_OPTIONS = {
		id: "ammo-manager",
		form: {
			handler: AmmoUI.#onSubmit,
			closeOnSubmit: false
		},
		position: {
			width: 480,
			height: "auto"
		},
		tag: "form",
		window: {
			icon: "fas fa-gear",
			title: "Title",
			contentClasses: ["standard-form"]
		},
		actions: {
			reset: AmmoUI.reset
		}
	}

	static PARTS = {
		test: {
			template: "./modules/pf2e-vessaya/templates/test.hbs"
		},
		footer: {
			template: "./modules/pf2e-vessaya/templates/footer.hbs"
		}
	}

	static async reset() {
		await game.settings.set("pf2e-vessaya", "enableAmmoSystem", {})
	}

	get title() {
		return `Ammo Management${this.itemId !== null ? ": " + this.itemId : ""}`
	}

	_prepareContext(options) {
		const settings = game.settings.get("pf2e-vessaya", "enableAmmoSystem")
		const buttons = [
			{
				type: "submit",
				icon: "fa-solid fa-save",
				label: "Save"
			}
		]
		console.log(settings)
		return {
			settings,
			buttons,
			checkbox: settings === true ? "checked" : ""
		}
	}

	_onRender(context, options) {
		this.element.querySelector("input[name=enableAmmoSystem]").addEventListener("click", () => {
			console.log("Hello World!")
		})
	}

	static async #onSubmit(event, form, formData) {
		const settings = foundry.utils.expandObject(formData.object)
		await Promise.all(
			Object.entries(settings)
				.map(([key, value]) => game.settings.set("pf2e-vessaya", key, value))
		)
	}

}
