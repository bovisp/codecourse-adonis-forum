'use strict'

const { validateAll } = use('Validator')
const moment = require('moment')
const Post = use('App/Models/Post')

class PostController {
	create ({ view }) {
		return view.render('posts.create')
	}

	async show ({ view, params }) {
		let post = await Post.query()
			.with('user')
			.with('tag')
			.with('replies')
			.with('replies.user')
			.with('answer')
			.with('answer.user')
			.where('slug', '=', params.slug)
			.firstOrFail()

		return view.render('posts.show', {
			post: post.toJSON()
		})
	}

	async store ({ request, response, session, auth }) {
		const { title, tag, body } = request.all()

		const rules = {
			title: 'required',
			tag: 'required|exists:tags,id',
			body: 'required'
		}

		const validation = await validateAll(request.all(), rules)

		if (validation.fails()) {
			session.withErrors(validation.messages())
				.flashAll()

			return response.redirect('back')
		}

		const post = new Post()

		post.fill({
			title,
			body,
			tag_id: tag,
			user_id: auth.user.id,
			last_reply_at: moment()
		})

		await post.save()

		return response.redirect('/')
	}
}

module.exports = PostController
