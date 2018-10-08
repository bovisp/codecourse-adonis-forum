'use strict'

const Route = use('Route')

Route.get('/', 'HomeController.index')
	.as('home')

Route.get('/search', 'SearchController.index')
	.as('search')

Route.post('/posts/:slug/answer', 'BestAnswerController.store')
	.as('posts.answer.store')
	.middleware(['auth'])

Route.delete('/posts/:slug/answer', 'BestAnswerController.destroy')
	.as('posts.answer.destroy')
	.middleware(['auth'])

Route.post('/posts/:slug/replies', 'PostReplyController.store')
	.as('posts.reply.store')
	.middleware(['auth'])

Route.get('/posts/create', 'PostController.create')
	.as('posts.create')
	.middleware(['auth'])

Route.post('/posts', 'PostController.store')
	.as('posts.store')
	.middleware(['auth'])

Route.get('/posts/unanswered', 'UnansweredPostController.index')
	.as('posts.unanswered')

Route.get('/posts/own', 'OwnPostController.index')
	.as('posts.own')
	.middleware(['auth'])

Route.get('posts/tags/:tag', 'TagController.index')
	.as('posts.tags')

Route.get('/posts/:slug', 'PostController.show')
	.as('posts.show')

Route.get('/auth/register', 'Auth/RegisterController.index')
	.as('auth.register')
	.middleware(['guest'])

Route.post('/auth/register', 'Auth/RegisterController.store')
	.as('auth.register')
	.middleware(['guest'])

Route.get('/auth/login', 'Auth/LoginController.index')
	.as('auth.login')
	.middleware(['guest'])

Route.post('/auth/login', 'Auth/LoginController.store')
	.as('auth.login')
	.middleware(['guest'])

Route.post('/auth/logout', 'Auth/LogoutController.logout')
	.as('auth.logout')
	.middleware(['auth'])

Route.get('/auth/home', 'Auth/HomeController.index')
	.as('auth.home')