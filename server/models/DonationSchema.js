const mongoose = require('mongoose')

const DonationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    type: String,
  },
},{ timestamps: true } )

const Donation = mongoose.model('Donation', DonationSchema)

module.exports = Donation
