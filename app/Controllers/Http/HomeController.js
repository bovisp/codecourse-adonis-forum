'use strict'

const Post = use('App/Models/Post')

class HomeController {
	async index ({ view }) {
		let posts = await Post.query()
			.with('tag')
			.with('user')
			.whereNull('parent_id')
			.fetch()

		return view.render('index', { posts })
	}
}

module.exports = HomeController
