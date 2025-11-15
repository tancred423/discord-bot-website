# Discord Bot Website Template

A simple, reusable website template for showcasing your Discord bot with a Discord-themed design. Supports hosting multiple bot websites from a single repository with automatic deployment.

## Features

- Discord-inspired UI matching the Discovery page
- Theme switcher (Auto/Light/Dark)
- Responsive design
- Image carousel with auto-play
- Multi-bot support - host multiple bots from one repository
- Automatic deployment via GitHub Actions
- Docker support for easy deployment
- Dynamic favicon from bot avatar
- Per-bot port configuration

## For developers

1. Copy the .env.skel file to .env
2. Populate `VITE_BOT_CONFIG` with which config you wanna use (this is the folder name in public)
3. Launch the site:

  ```bash
  docker-compose up
  ```

### On production

1. Create the .env file and pick your config
2. Launch the site

```bash
docker-compose -f docker-compose.prod.yml up --build
```

Note that you can also use the deploy script to automatically launch all configurations. Just make sure to have the .env file set for every config directory.

## Multi-Bot Configuration

This template supports hosting multiple bots from a single repository. Each bot has its own configuration directory under `/public`.

### Project Structure (Example)

```
/public
  /naago
    config.json         # Naago bot configuration
    avatar.png          # Bot avatar
    banner.png          # Banner image
    carousel1.png       # Screenshots
    ...
  /paissa
    config.json         # Paissa bot configuration
    avatar.png
    banner.png
    ...
```

### Adding a New Bot

1. Create a new directory under `/public` with your bot's name (e.g., `/public/mybot`)
2. Add a `config.json` file in that directory
3. Place your bot's images (avatar, banner, carousel images) in that directory
4. The deployment workflow will automatically discover and deploy it

### Configuration File

Each bot needs a `config.json` in its directory:

```json
{
  "name": "Your Bot Name",
  "description": "Bot description with **markdown** support",
  "avatar": "/mybot/avatar.png",
  "banner": "/mybot/banner.png",
  "inviteUrl": "https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID",
  "supportServerUrl": "https://discord.gg/YOUR_INVITE",
  "serverCount": "100 (as of 25 Nov 2025)",
  "categories": ["Utility", "Fun"],
  "languages": ["English, US"],
  "port": 3551,
  "carouselImages": [
    "/mybot/carousel1.png",
    "/mybot/carousel2.png"
  ],
  "links": [
    {
      "label": "GitHub",
      "url": "https://github.com/your/repo"
    }
  ],
  "permissions": [
    {
      "name": "Send Messages",
      "reason": "Required to respond to commands and send notifications."
    }
  ]
}
```

## Deployment

### Automatic Deployment (GitHub Actions)

The repository includes a GitHub Actions workflow that:

1. Discovers all bot configs in `/public`
2. Builds a Docker image for each bot
3. Pushes images to GitHub Container Registry
4. Deploys each bot to your server with its configured port

**Setup:**

1. Set up GitHub secrets:
   - `DEPLOY_HOST` - Your server IP/hostname
   - `DEPLOY_USER` - SSH username
   - `DEPLOY_SSH_KEY` - SSH private key
   - `DEPLOY_PATH` - Base path on server (e.g., `/home/your_name/discord-bot-website`)

2. Push to `main` branch - deployment happens automatically

3. Each bot will be deployed to: `$DEPLOY_PATH/{bot-name}-website/`

**Container Names:**
- Containers are named `{bot-name}-website` (e.g., `naago-website`, `paissa-website`)
- Each bot runs on its configured port from `config.json`


## Customization Tips

### Favicon
The favicon is automatically set from the bot's avatar image. No manual configuration needed.

## Troubleshooting

**Images not loading?**
- Check that images exist in `/public/{bot-name}/`
- Verify image paths in `config.json` start with `/{bot-name}/`
- Ensure filenames match exactly (case-sensitive)

**Config not loading?**
- Verify `config.json` is valid JSON (no trailing commas)
- Check browser console for errors
- Ensure the config directory name matches the path in image URLs

**Port conflicts?**
- Each bot must have a unique `port` in its `config.json`
- Check that ports aren't already in use: `sudo lsof -i :PORT`

**Deployment issues?**
- Check GitHub Actions logs for build errors
- Verify SSH keys and server access
- Ensure Docker is running on the server
- Check container logs: `docker logs {bot-name}-website`

**Styling looks broken?**
- Run `npm install` to ensure dependencies are installed
- Clear browser cache
- Check console for errors

## Tech Stack

- Vue 3
- TypeScript
- Vite
- Docker
- Nginx (production)
- GitHub Actions (CI/CD)

## License

MIT
