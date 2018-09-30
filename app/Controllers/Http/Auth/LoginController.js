'use strict'

const { validateAll } = use('Validator')

const User = use('App/Models/User')

class LoginController {
	index ({ view }) {
		return view.render('auth.login')
	}

	async store ({ request, response, session, auth }) {
		const { email, password } = request.all()

		const rules = {
			email: 'required|email',
			password: 'required'
		}

		const validation = await validateAll(request.all(), rules)

		if (validation.fails()) {
			session.withErrors(validation.messages())
				.flashAll()

			return response.redirect('back')
		}

		await auth.attempt(email, password)

		return response.redirect('home')
	}
}

module.exports = LoginController
