# TV Dashboard

An Apple TV-style home screen for Samsung Tizen TVs, loaded through [TizenBrew](https://github.com/reisxd/TizenBrew).

- Big clock, date and live weather (high/low, refreshed every 15 minutes)
- Favourites row and an All Apps row, navigated with the remote
- 7 themes (Midnight, Aurora, Sunset, Ocean, Gold, Mono, Photo)
- Photo screensaver after 3 minutes idle, using Bing's photo of the day

## Install in TizenBrew

1. Open TizenBrew on the TV.
2. Open the module manager (the box icon at the top right).
3. Choose **Add GitHub Module** and enter `Shivacore2201/tv-dashboard`.
4. Back on TizenBrew's home, select **Dashboard**.

## Run without TizenBrew

`app/` is also a plain Tizen web app. Zip `config.xml`, `index.html` and `icon.png` into a `.wgt` and install it with TizenBrew Installer's "Select file to install".
