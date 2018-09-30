'use strict'

const Route = use('Route')

Route.on('/')
	.render('welcome')
	.as('home')

Route.get('/auth/register', 'Auth/RegisterController.index')
	.as('auth.register')

Route.post('/auth/register', 'Auth/RegisterController.store')
	.as('auth.register')

Route.get('/auth/login', 'Auth/LoginController.index')
	.as('auth.login')

Route.post('/auth/login', 'Auth/LoginController.store')
	.as('auth.login')

Route.get('/auth/home', 'Auth/HomeController.index')
	.as('auth.home')