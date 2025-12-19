# Setup Guide

## Initial Setup

1. Install dependencies:
```bash
npm install
```

2. Add your bot images to `/public/`:
   - `avatar.png` (512x512px recommended)
   - `banner.png` (1920x240px recommended)  
   - `carousel1.png`, `carousel2.png`, etc. (16:9 aspect ratio recommended)

3. Update the bot configuration at `/public/config.json`:
   - Set your actual bot invite URL in `inviteUrl`
   - Set your support server invite URL in `supportServerUrl`
   - Customize `description`, `permissions`, `links`, etc.

4. Run the development server:
```bash
npm run dev
```

5. Open `http://localhost:3000` in your browser

## Docker Deployment

### Development Mode
```bash
docker-compose up
```
Access at `http://localhost:3000`

### Production Mode
```bash
docker-compose -f docker-compose.prod.yml up --build
```
Access at `http://localhost`

## Configuration Details

### Required Fields

All fields in `config.json` are required. Here's what each one does:

**name**: Your bot's display name  
**description**: Full description (supports markdown formatting)  
**avatar**: Path to avatar image (must start with `/`)  
**banner**: Path to banner image (must start with `/`)  
**inviteUrl**: Full Discord OAuth2 authorization URL  
**supportServerUrl**: Discord server invite link  
**categories**: Array of category tags  
**languages**: Array of supported languages  
**carouselImages**: Array of paths to screenshot images  
**links**: Array of link objects with `label` and `url`  
**permissions**: Array of permission objects with `name` and optional `reason`

### Permission Explanations

Each permission should include a `reason` to help users understand why it's needed:

```json
{
  "name": "Send Messages",
  "reason": "Required to respond to your commands."
}
```

The reason will be displayed below the permission name in a lighter color.

### Image Guidelines

**Avatar**
- Recommended size: 512x512px
- Format: PNG, JPG, or WebP
- Square aspect ratio
- Will be displayed as a circle

**Banner**
- Recommended size: 1920x240px
- Format: PNG, JPG, or WebP
- Aspect ratio: 8:1 (wide)
- High-quality image recommended

**Carousel Images**
- Recommended aspect ratio: 16:9
- Format: PNG, JPG, or WebP
- Screenshots of your bot in action
- At least 1280x720px for good quality

## Running Multiple Bot Websites

To host websites for multiple bots:

1. Clone/copy this project folder for each bot
2. Customize the `config.json` in each folder
3. Deploy each instance separately

Example structure:
```
/var/www/
  bot1-website/     (runs on port 3001)
    config.json     (configured for Bot 1)
  bot2-website/     (runs on port 3002)
    config.json     (configured for Bot 2)
```

Each instance is completely independent with its own configuration.

## Production Deployment Tips

1. **Build the project**:
```bash
npm run build
```
This creates optimized files in `/dist`

2. **Use Docker** (recommended):
```bash
docker-compose -f docker-compose.prod.yml up -d
```

3. **Or serve with Nginx/Apache**:
Point your web server to the `/dist` folder after building

4. **Update config.json** with production values before building

5. **Use a reverse proxy** if hosting multiple instances

## Troubleshooting

### Images not appearing?
- Verify files exist in `/public` folder
- Check paths in `config.json` start with `/`
- Ensure filenames match exactly (case-sensitive on Linux)

### Configuration not loading?
- Validate JSON syntax at https://jsonlint.com
- Remove any trailing commas
- Ensure all required fields are present
- Check browser console for error messages

### Styling looks wrong?
- Run `npm install` to install all dependencies
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check that `src/styles/main.css` exists

### Theme toggle not working?
- Check browser console for JavaScript errors
- Ensure Vue is properly loaded
- Try hard refresh (Ctrl+F5)

### Docker issues?
- Make sure Docker is running
- Check ports 3000 (dev) or 80 (prod) are not in use
- Run `docker-compose down` then `docker-compose up` to restart

## Getting Help

If you run into issues:

1. Check the browser console (F12) for errors
2. Check the terminal output for build errors
3. Verify all files are in the correct locations
4. Make sure `config.json` is valid JSON

The most common issues are:
- Invalid JSON syntax in config.json
- Missing image files
- Wrong file paths (remember the `/` prefix)
- Dependencies not installed (`npm install`)
