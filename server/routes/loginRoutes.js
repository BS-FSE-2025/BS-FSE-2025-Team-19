const UserSchema = require('../models/UserSchema')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()

router.post('/register', async (req, res) => {
  const { firstName, lastName, phone, city, email, password } = req.body
  if (!email || !password)
    return res.status(400).json({ msg: 'אימייל וסיסמא הם שדות חובה' })

  if (password.length < 8) {
    return res
      .status(400)
      .json({ msg: 'סיסמא חייבת ליהיות לפחות 8 תווים' })
  }

  const user = await UserSchema.findOne({ email })
  if (user) return res.status(400).json({ msg: 'משתמש כבר קיים עבור אימייל זה' })

  const newUser = new UserSchema({ firstName, lastName, phone, city, email, password })
  bcrypt.hash(password, 7, async (err, hash) => {
    if (err)
      return res.status(400).json({ msg: 'error while saving the password' })

    newUser.password = hash
    const savedUserRes = await newUser.save()
    const userSession = { firstName, lastName, email: newUser.email }
    if (savedUserRes)
      req.session.user = userSession
      return res.status(200).json({ msg: 'user is successfully saved', userSession  })
  })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'נא מלא אימייל וסיסמא' });
  }

  const user = await UserSchema.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: 'User not found' });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (isPasswordCorrect) {
    const userSession = { email: user.email, firstName: user.firstName, lastName: user.lastName };

    req.session.user = userSession;
    res.status(200).json({ msg: 'Login successful', userSession });
  } else {
    res.status(400).json({ msg: 'משתמש או סיסמא לא נכונים' });
  }
});


router.delete(`/logout`, async (req, res) => {
  req.session.destroy((error) => {
    if (error) throw error

    res.clearCookie('session-id') // cleaning the cookies from the user session
    res.status(200).send('Logout Success')
  })
})

router.get('/isAuth', async (req, res) => {
  console.log('Cookies received:', req.headers.cookie); // 
  console.log('isAuth ',req.session.user)
  if (req.session.user) {
    return res.json(req.session.user)
  } else {
    return res.status(401).json('unauthorize')
  }
})

module.exports = router
