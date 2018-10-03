'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use('Hash')

const slugify = require('slugify')
const fakerLib = require('faker')

Factory.blueprint('App/Models/User', async (faker) => {
  return {
    username: faker.username(),
    password: await Hash.make(faker.password('secret')),
    email: faker.email()
  }
})

Factory.blueprint('App/Models/Post', async (faker) => {
	let title = fakerLib.lorem.words(5)
	let user = await Factory.model('App/Models/User').create()
	let tag = await Factory.model('App/Models/Tag').create()
	
	return {
		title,
		body: faker.paragraph(),
		user_id: user.id,
		tag_id: tag.id
	}
})

Factory.blueprint('App/Models/Tag', async (faker) => {
	let name = fakerLib.lorem.words(2)

	return {
		name,
		slug: slugify(name, {
			lower: true
		}),
	}
})