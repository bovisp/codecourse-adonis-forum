'use strict'

const Model = use('Model')

class Post extends Model {
	static boot () {
		super.boot()

		this.addTrait('Slugify')
	}

	tag () {
		return this.belongsTo('App/Models/Tag')
	}

	user () {
		return this.belongsTo('App/Models/User')
	}
}

module.exports = Post
