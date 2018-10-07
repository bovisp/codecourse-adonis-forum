'use strict'

const Post = use('App/Models/Post')
const { validateAll } = use('Validator')

class BestAnswerController {
	async store ({ request, response, auth, params }) {
		const { answer_id } = request.all()

		let post = await Post.query()
			.where('slug', '=', params.slug)
			.ownedByUser(auth.user)
			.whereHas('replies', builder => {
				builder.where('id', '=', answer_id)
			})
			.firstOrFail()

		const rules = {
			answer_id: 'required|exists:posts,id'
		}

		const validation = await validateAll(request.all(), rules)

		if (validation.fails()) {
			session.withErrors(validation.messages())
				.flashAll()

			return response.redirect('back')
		}

		post.answer_id = answer_id

		await post.save()

		return response.redirect('back')
	}

	async destroy ({ params, auth, response }) {
		let post = await Post.query()
			.where('slug', '=', params.slug)
			.ownedByUser(auth.user)
			.firstOrFail()

		post.answer_id = null

		await post.save()

		return response.redirect('back')
	}
}

module.exports = BestAnswerController
