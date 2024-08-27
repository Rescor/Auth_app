import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail.js';
import { jwtSecret } from '../utils/jwt_secret.js';
import connection from '../db.js';

const router = express.Router();
router.use(express.json());

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password.trim()) {
    return res.status(400).json({ message: 'No email or password' });
  }

  if (!isEmail(email) || password.trim().length < 8) {
    return res.status(400).json({ message: 'Wrong email or password' });
  }

  connection.query('SELECT * FROM accounts WHERE email = ?', [email], async (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Something went wrong :(' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Wrong email or password' });
    }

    const user = results[0];
    const isPwdCorrect = await bcrypt.compare(password, user.password);

    if (!isPwdCorrect) {
      return res.status(401).json({ message: 'Wrong email or password' });
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '30m' });
    delete user.password;

    return res.status(200).json({
      token: `Bearer ${token}`,
      user
    });
  });
});

router.post('/register', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password.trim()) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (!isEmail(email) || password.trim().length < 8) {
    return res.status(400).json({ message: 'Wrong email or small password' });
  }

  connection.query('SELECT * FROM accounts WHERE email = ?', [email], async (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Something went wrong :(' });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: 'A user with this email already exists' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      connection.query('INSERT INTO accounts (email, password) VALUES (?, ?)', [email, hashedPassword], (error) => {
        if (error) {
          return res.status(500).json({ message: 'Something went wrong :(' });
        }

        return res.status(201).json({ message: 'Account has been successfully created!' });
      });
    } catch (e) {
      return res.status(500).json({ message: 'Something went wrong :(' });
    }
  });
});

export default router;
