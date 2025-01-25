const DonationSchema = require('../models/DonationSchema')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()

router.post('/create-donation', async (req, res) => {
  const { title, description, image, city } = req.body
  if (!title || !description || !image || !city)
    return res.status(400).json({ msg: 'Missing donation parameters' })

  const newDonation = new DonationSchema({ title, description, image, city })
  const savedDonationRes = await newDonation.save()
  if (savedDonationRes) {
    return res.status(200).json({ msg: 'donation is successfully saved' })
  } else {
    return res.status(400).json({ msg: 'Error in donation save' })
  }
})

router.post('/get-donations', async (req, res) => {
  const { } = req.body;
  const donations = await DonationSchema.find({}).limit(20).sort({ createdAt: -1 });;
  return res.status(200).json({ donations })
})

router.post('/query-donations', async (req, res) => {
  const { searchKey, city } = req.body;
  let donations;
  if (searchKey || city) {
    donations = await DonationSchema
      .find({
        $or: [
          { title: { $regex: searchKey, $options: "i" } },
          { description: { $regex: searchKey, $options: "i" } },
        ],
        $and: [
          { city: { $regex: city, $options: "i" } }
        ]
      }).sort({ createdAt: -1 });
  } else {
    donations = await DonationSchema.find({});
  }
  return res.status(200).json({ donations })
})

module.exports = router
