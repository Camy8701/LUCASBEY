# LEITZ Template (Plain HTML)

This repo is a white-label template based on the Letz Physio site. Edit `data.json` with your client details and run the build script to generate a ready-to-deploy site in `dist/`.

## Quick start

```bash
node build.js
```

Your built site will be in `dist/`.

## Customize client data

Edit `data.json`:

- `CLINIC_NAME`
- `CLINIC_NAME_UPPER`
- `PHONE_DISPLAY`
- `PHONE_TEL`
- `EMAIL`
- `ADDRESS_LINE1`
- `ADDRESS_LINE2`
- `ADDRESS_INLINE`
- `BOOKING_URL`

## Template tokens

Templates live in `src/` and use tokens like:

```
{{CLINIC_NAME}}
{{PHONE_DISPLAY}}
{{EMAIL}}
```

## Create a new client site

1. Use this repo as a template or clone it.
2. Update `data.json` and assets in `src/assets/`.
3. Run `node build.js`.
4. Deploy the contents of `dist/`.
