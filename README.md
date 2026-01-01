# 🔗 URL Shortening Service API

A RESTful API for generating short URLs locally and redirecting users to original URLs.  
*Shortened URLs only work while the server is running.*

---

## Features

- Create short URLs from long URLs  
- Store original and shortened URLs in a PostgreSQL database  
- Redirect users using shortened URLs  
- Input validation to ensure valid URL format  

---

## How It Works

1. User sends a long URL to the API via a POST endpoint  
2. The API:
   - Validates the URL  
   - Stores it in the database  
   - Generates a unique short code  
3. The user receives a shortened URL  
4. When the shortened URL is visited while the server is running:
   - The API looks up the short code  
   - Matches it with the original long URL  
   - Redirects the user to the original destination  

---

## What I Learned

- How URL shortening services work internally
- How to redirect users with links
