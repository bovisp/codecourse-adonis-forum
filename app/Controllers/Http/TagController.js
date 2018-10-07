'use strict'

const Post = use('App/Models/Post')

class TagController {
	async index ({ view, params }) {
		let posts = await Post.query()
			.forIndex()
			.whereHas('tag', builder => {
				builder.where('slug', params.tag)
			})
			.fetch()

		return view.render('index', { posts })
	}
}

module.exports = TagController
