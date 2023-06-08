const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
const mongooseDelete = require('mongoose-delete')


const Schema = mongoose.Schema;
const course = new Schema({
    name: { type: String },
    level:{type:String},
    description: { type: String, maxLength: 600 },
    idVideo: {type: String},
    img: {type: String},
    slug: { type: String, slug: 'name', unique: true},
    createdAt: {type: String}
});

mongoose.plugin(slug)
course.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt : true  })

module.exports = mongoose.model('course', course)