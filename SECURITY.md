# Security Notes

- Do not commit Google API keys or service credentials.
- Set `VITE_GEMINI_API_KEY` through Cloud Build substitutions or your local `.env` file.
- Restrict the Gemini API key in Google Cloud Console to the required APIs and allowed HTTP referrers.
- Rotate any key that was previously committed to the repository.
- The frontend calls Gemini directly, so the browser can still see the key in the built bundle. Use Google Cloud API restrictions for production.
