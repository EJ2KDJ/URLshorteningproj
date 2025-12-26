import pool from '../repositories/db.js';
import encode from '../utils/shortCode.js';

// Service functions utilizing the database connection and short code utility
export async function shortenURL(longURL) {


    // Insert the long URL into the database and get the generated ID
    const result = await pool.query(
        'INSERT INTO urls (long_url) VALUES ($1) RETURNING id',
        [longURL]
    );

    // Extract the ID from the result
    const id = result.rows[0].id;

    // Generate the short code using the utility function
    const shortCode = encode(id);

    // Update the database with the generated short code
    await pool.query('UPDATE urls SET shorturl = $1 WHERE id = $2', [shortCode, id]);

    // Return the generated short code
    return shortCode;
}