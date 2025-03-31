export class VessayaJournalSheet extends JournalSheet {

	constructor(doc, options) {
		super(doc, options)
		this.options.classes.push(vessaya.CSS_CLASS)
	}

}

// This should really extend foundry.applications.sheets.journal.JournalEntrySheet, right?
// export default class VessayaJournalSheet extends foundry.applications.sheets.journal.JournalEntrySheet {
//
// 	static DEFAULT_OPTIONS = {
// 		classes: ["vessaya"],
// 		position: {
// 			width: 1000,
// 			height: 920
// 		}
// 	}
//
// 	_preparePageData() {
// 		const pages = super._preparePageData();
// 		for (const p of Object.values(pages)) this._augmentPageData(p);
// 		return pages
// 	}
//
// 	_augmentPageData(p) {
// 		const page = this.entry.pages.get(p.id)
// 		p._index = page.system?.index ?? page.flags.vessaya?.index ?? ""
// 		p._tags = this._getPageTags(page)
// 	}
//
// 	_getPageTags(page) {
// 		const sheet = this.getPageSheet(page)
// 		const pageTags = sheet._getTags?.()
// 		const tocTags = {}
//
// 		if (pageTags?.status) {
// 			const s = pageTags.status
// 			tocTags.status = {
// 				...s,
// 				tooltip: s.label,
// 				label: s.short
// 			}
// 		}
//
// 		return tocTags
// 	}
//
// 	async _prepareSidebarContext(ctx, options) {
// 		await super._prepareSidebarContext(ctx, options)
// 		this._numberPages(ctx.toc)
// 	}
//
// 	async _renderHTML(ctx, options) {
// 		const rendered = await super._renderHTML(ctx, options)
//
// 		if (!("sidebar" in rendered))
// 			return rendered
//
// 		for (const page of ctx.toc) {
// 			if (foundry.utils.isEmpty(page._tags))
// 				continue
//
// 			const li = rendered.sidebar.querySelector(`.toc li[data-page-id="${page.id}"]`)
// 			const h = li.firstElementChild()
// 			const tagsHTML = vessaya.api.applications.renderTags(page._tags)
// 			h.insertAdjacentHTML("beforeend", tagsHTML)
// 		}
// 		return rendered
// 	}
//
// 	async _renderPageView(element, sheet) {
// 		await super._renderPageView(element, sheet)
// 		const h1 = element.querySelector(".journal-page-header > h1")
//
// 		if (h1)
// 			h1.classList.add("vessaya-header")
// 	}
//
// 	_numberPages(toc) {
// 		let i = 1
// 		for (const page of toc) {
// 			if (page.isCategory)
// 				continue
// 			if (page._index)
// 				page.number = page._index
// 			else
// 				page.number = i++
// 		}
// 	}
//
// 	async configurePage({ index } = {}) {
// 		const page = this.document.pages.get(this.pagesInView[0].dataset.pageId)
//
// 		if (!page) {
// 			ui.notificatios.error("No current page detected")
// 			return
// 		}
//
// 		const vessaya = {}
// 		if (index)
// 			vessaya.index = index
// 		else
// 			vessaya["-=index"] = null
//
// 		await page.udate({ flags: { vessaya } })
// 	}
//
// 	async migrateCategories() {
// 		const doc = this.document
// 		const vessayaCategories = doc.getFlag("pf2e-vessaya", "categories")
//
// 		if (!vessayaCategories)
// 			throw new Error("No Vessaya categories to migrate")
//
// 		const categories = []
// 		const categoryMap = {}
//
// 		for (const c of vessayaCategories) {
// 			const id = vessaya.api.generateId(`Vessaya Cat ${c.header}`, 16)
// 			categoryMap[c.id] = id
// 			categories.push({
// 				_id: id,
// 				name: c.header,
// 				sort: c.ordder * 10000
// 			})
// 		}
//
// 		await doc.createEmbeddedDocuments("JournalEntryCategory", categories, { keepId: true })
//
// 		const pages = []
// 		for (const p of doc.pages) {
// 			const vessayaCat = p.getFlag("pf2e-vessaya", "category")
//
// 			if (!vessayaCat)
// 				continue
//
// 			const category = categoryMap[vessayaCat] || null
// 			pages.push({
// 				_id: p.id,
// 				category,
// 				"flags.pf2e-vesssaya.-=category": null
// 			})
// 		}
// 		await doc.updates({
// 			pages, "flags.pf2e-vessaya.-=categories": null
// 		})
// 	}
//
// }
