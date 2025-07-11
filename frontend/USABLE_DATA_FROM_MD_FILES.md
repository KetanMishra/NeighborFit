# Usable Data from Markdown Files (Scan Report)

After scanning all Markdown files in the `frontend` folder for structured, importable data (JSON, YAML, tables), the following was found:

- All JSON and YAML code blocks are for configuration, documentation, or code samples (e.g., VSCode config, GitHub Actions, API response examples).
- No Markdown tables contain actual data about neighborhoods, users, or reviews.
- No importable data relevant to the application's database was found in any Markdown file.

**Conclusion:**  
There is no relevant, importable data in the Markdown files in the `frontend` folder.  
Continue to use `backend/seed/neighborhoods.json` for data import and seeding.

*Generated by automated scan.* 