'use strict'

const Route = use('Route')

Route.on('/')
	.render('welcome')
	.as('home')

Route.get('/auth/register', 'Auth/RegisterController.index')
	.as('auth.register')

Route.post('/auth/register', 'Auth/RegisterController.store')
	.as('auth.register')