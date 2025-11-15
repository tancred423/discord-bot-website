# Discord Bot Website Template

A simple, reusable website template for showcasing your Discord bot with a Discord-themed design.

## Features

- Discord-inspired UI matching the Discovery page
- Theme switcher (Auto/Light/Dark)
- Responsive design
- Image carousel with auto-play
- Configurable via single JSON file
- Docker support for easy deployment

## Quick Start

### Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

### With Docker

Development:
```bash
docker-compose up
```

Production:
```bash
docker-compose -f docker-compose.prod.yml up --build
```

## Configuration

Edit `/public/config.json` to customize your bot's information:

```json
{
  "name": "Your Bot Name",
  "description": "Bot description with **markdown** support",
  "avatar": "/avatar.png",
  "banner": "/banner.png",
  "inviteUrl": "https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID",
  "supportServerUrl": "https://discord.gg/YOUR_INVITE",
  "serverCount": 100,
  "categories": ["Utility", "Fun"],
  "languages": ["English, US"],
  "carouselImages": [
    "/carousel1.png",
    "/carousel2.png"
  ],
  "links": [
    {
      "label": "GitHub",
      "url": "https://github.com/your/repo"
    },
    {
      "label": "Terms of Service",
      "url": "/terms"
    },
    {
      "label": "Privacy Policy",
      "url": "/privacy"
    }
  ],
  "permissions": [
    {
      "name": "Send Messages",
      "reason": "Required to respond to commands and send notifications."
    },
    {
      "name": "Embed Links",
      "reason": "Used to display rich formatted messages."
    }
  ]
}
```

## Adding Images

Place your images in the `/public` folder:

- `/public/avatar.png` - Bot avatar (recommended: 512x512px)
- `/public/banner.png` - Banner image (recommended: 1920x240px)
- `/public/carousel1.png`, `/public/carousel2.png`, etc. - Screenshots (recommended: 16:9 aspect ratio)

## Configuration Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Bot name displayed throughout the site |
| `description` | string | Bot description (supports markdown) |
| `avatar` | string | Path to avatar image |
| `banner` | string | Path to banner image |
| `inviteUrl` | string | Discord OAuth2 invite URL |
| `supportServerUrl` | string | Discord server invite link |
| `serverCount` | number | Number of servers (auto-formatted: 1.5K, 2.3M, etc.) |
| `categories` | string[] | Category tags |
| `languages` | string[] | Supported languages |
| `carouselImages` | string[] | Array of screenshot paths |
| `links` | object[] | Additional links (GitHub, website, etc.) |
| `permissions` | object[] | Required Discord permissions with explanations |

### Permission Object

```json
{
  "name": "Permission Name",
  "reason": "Optional explanation why this permission is needed"
}
```

The `reason` field is optional but recommended to help users understand why your bot needs specific permissions.

## Deploying Multiple Bots

This is a template for a single bot. To host multiple bots:

1. Clone this repository for each bot
2. Customize the `config.json` for each instance
3. Deploy each instance separately (different domains/ports)
4. Each instance runs independently with its own configuration

Example:
```
bot1-website/  (configured for Bot 1)
bot2-website/  (configured for Bot 2)
bot3-website/  (configured for Bot 3)
```

## Project Structure

```
/public
  config.json         # Bot configuration
  avatar.png         # Bot avatar
  banner.png         # Banner image
  carousel1.png      # Screenshot 1
  carousel2.png      # Screenshot 2

/src
  /components
    Header.vue
    Carousel.vue
    Overview.vue
    Permissions.vue
    Sidebar.vue
  /styles
    main.css
  App.vue
  config.ts
  main.ts
```

## Tech Stack

- Vue 3
- TypeScript
- Vite
- Docker
- Nginx (production)

## Customization Tips

### Top Banner
The small banner at the top shows your bot name with a subtle dark background.

### Theme Toggle
Users can switch between:
- **Auto** - Follows system preference
- **Light** - Light theme
- **Dark** - Dark theme

### Server Count Formatting
Numbers are automatically formatted:
- Under 1,000: Shows as-is (e.g., "500")
- 1,000-999,999: Shows with K (e.g., "5.2K")
- 1,000,000+: Shows with M (e.g., "1.5M")

## Troubleshooting

**Images not loading?**
- Check that images exist in `/public`
- Verify image paths in `config.json` start with `/`
- Ensure filenames match exactly (case-sensitive)

**Config not loading?**
- Verify `config.json` is valid JSON (no trailing commas)
- Check browser console for errors
- Make sure file is in `/public/config.json`

**Styling looks broken?**
- Run `npm install` to ensure dependencies are installed
- Clear browser cache
- Check console for errors

## License

MIT
