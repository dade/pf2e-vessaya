export class Enrichers {

	static initViewScene() {
		CONFIG.TextEditor.enrichers.push({
			pattern: /@ViewScene\[(.+?)\]/gm,
			enricher: async (match, _) => {
				const arr = match[1].split(".")
				let id

				if (arr.length == 2 && arr[0] == "Scene")
					id = arr[1]
				else
					id = arr[0]

				const scene = game.scenes.get(id)
				const doc = document.createElement("span")
				const myData = `<a class="control viewscene" data-scene-id="${id}" data-tooltip="View scene" aria-describedBy="tooltip"><i class="fa-solid fa-map"></i> <u>${scene?.name}</u></a>`

				doc.innerHTML = myData
				return doc
			}
		})
	}

	static viewScene(event) {
		event.preventDefault()
		const id = event.currentTarget.getAttribute("data-scene-id")
		if (!id)
			return
		const scene = game.scenes.get(id)
		scene?.view()
	}

}
