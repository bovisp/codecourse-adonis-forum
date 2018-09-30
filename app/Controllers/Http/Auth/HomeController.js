'use strict'

class HomeController {
	index ({ view }) {
		return view.render('auth.home')
	}
}

module.exports = HomeController
