import express from 'express';
import pool from '../repositories/db.js';
import { body, validationResult } from 'express-validator';
import { shortenURL } from '../services/service.js';
const router = express.Router();

// create a short URL from the provided long URL
router.post('/shorten',
    // Validate and sanitize the input URL
    body('longURL').isURL().withMessage('Invalid URL format'), // Validation middleware
    async (req, res) => {
        const errors = validationResult(req); // store validation results
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }); // return errors

        const { longURL } = req.body; // retrive url from req body

        try {
            const shortCode = await shortenURL(longURL); // generate short code from util function
            res.json({ shortUrl: `${process.env.BASE_URL}/${shortCode}` }); // respond with the generated short code
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
);

// retrieve the long URL associated with the given short code
router.get('/:shortCode', async (req, res) => {
    const { shortCode } = req.params;

    try {
        const result = await pool.query('SELECT long_url FROM urls WHERE shorturl = $1', [shortCode]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        // Redirect to the original long URL
        const longURL = result.rows[0].long_url; 

        // Use 302 Found for temporary redirection
        return res.redirect(302, longURL);
    } catch (err) {
        console.error('Error retrieving long URL:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;