'use strict'

const Post = use('App/Models/Post')

class HomeController {
	async index ({ view }) {
		let posts = await Post.query()
			.forIndex()
			.fetch()

		return view.render('index', { posts })
	}
}

module.exports = HomeController
