# Transit Card

A modern glass-style Lovelace card for Home Assistant displaying real-time S-Bahn, Tram, and Bus departures.

![Transit Card Preview](https://via.placeholder.com/400x300?text=Transit+Card+Preview)

## Features

- Real-time departures from Deutsche Bahn API
- Glass/blur aesthetic with dark theme
- Collapsible sections for S-Bahn / Tram / Bus
- Live countdown updates
- Delay indicators
- Platform display
- Configurable stops and refresh interval

## Installation

### HACS (Recommended)

1. Open HACS in Home Assistant
2. Click the three dots menu → **Custom repositories**
3. Add this repository URL with category **Lovelace**
4. Search for "Transit Card" and install
5. Restart Home Assistant

### Manual

1. Download `transit-card.js` from the [latest release](../../releases)
2. Copy to `config/www/transit-card.js`
3. Add resource in **Settings → Dashboards → Resources**:
   - URL: `/local/transit-card.js`
   - Type: JavaScript Module

## Configuration

```yaml
type: custom:transit-card
title: Abfahrten              # Optional header
stops:
  sbahn: "8002681"            # Weststadt/Südstadt
  tram:
    - "506913"                # Christuskirche
    - "506953"                # Römerkreis Süd
  bus:
    - "518175"                # Kaiserstraße
refresh_interval: 30          # Seconds (default: 30)
max_departures: 5             # Per section (default: 5)
collapsed:                    # Sections to start collapsed
  - bus
style: glass                  # 'glass' or 'solid'
```

## Finding Stop IDs

Use the Deutsche Bahn API to find stop IDs:

```
https://v6.db.transport.rest/locations?query=Heidelberg
```

Or search on [bahn.expert](https://bahn.expert/) and look at the URL.

## Common Stops (Heidelberg)

| Stop | ID | Type |
|------|-----|------|
| Heidelberg Hbf | 8000156 | S-Bahn |
| Weststadt/Südstadt | 8002681 | S-Bahn |
| Bismarckplatz | 506903 | Tram |
| Christuskirche | 506913 | Tram |
| Römerkreis Süd | 506953 | Tram |

## License

MIT

## Credits

Transit data provided by [v6.db.transport.rest](https://v6.db.transport.rest/) (CC BY 4.0)
