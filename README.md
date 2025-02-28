# 918.software

Website for 918.software - Custom web and business logic systems specializing in AI integration, workflow automation, and AI training.

## Deployment

This site is deployed using GitHub Pages directly from the main branch. The deployment process is as follows:

1. Make your changes to the website files
2. Run the deployment script: `./deploy.sh`
3. The script will commit and push your changes to the main branch
4. GitHub Pages will automatically deploy the site from the main branch
5. The site will be available at [https://918.software](https://918.software)

## Development Notes

- CSS improvements have been made to ensure proper centering on mobile devices
- The `private_docs` directory is excluded from Git and deployment
- The `_site` directory is used for the build process and is also excluded from Git

## File Structure

- `css/` - Stylesheet files
- `js/` - JavaScript files
- `images/` - Image assets
- `fonts/` - Font files
- `private_docs/` - Private documentation (not deployed)
- `.nojekyll` - Tells GitHub Pages not to process your site with Jekyll

## Technical Information

- The site uses a responsive design approach with modern CSS
- Mobile menu is implemented with CSS transitions and JavaScript
- Navigation between pages is handled through standard HTML links
