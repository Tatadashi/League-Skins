# League-Skins

"League Skins" isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.

Passion Project meant to help players keep track of their favorite skins and when they go on sale all in one place. For questions, please contact us via Kenny’s Linkedin inbox:

# Credits 

Programmer: Kenny Luu
Art and UI Design: Thanh Nguyen
Aatrox Composite Sword & Cosplayer Neeko Artwork by Thanh Nguyen

Icons:
github: https://devicon.dev/
title sparkle: https://www.rawpixel.com/image/6194095/png-aesthetic-sticker
user: Helmet Bro Summoner Icon - https://wiki.leagueoflegends.com/en-us/File:Helmet_Bro_profileicon.png
other: https://uxwing.com/license/
    - light mode - https://uxwing.com/day-sunny-icon/
    - dark mode - https://uxwing.com/moon-line-icon/
    - home - https://uxwing.com/instagram-home-feed-icon/
    - sale - https://uxwing.com/tag-line-icon/
    - wishlist - https://uxwing.com/heart-thin-icon/
    - collection - https://uxwing.com/list-round-bullet-icon/
    - about - https://uxwing.com/list-round-bullet-icon/

All other art from Riot fetched from CommunityDragon Raws

Thank you to SkinSpotlights and Khada, support them below
 - https://modelviewer.lol/ - https://ko-fi.com/khada3d
 - https://www.youtube.com/channel/UC0NwzCHb8Fg89eTB5eYX17Q - Epic Creator Code: skinspotlights

Thanks to the Riot Games Community (Wiki, CommunityDragon, 3rd Party Devs)
 - https://wiki.leagueoflegends.com/en-us/ - https://discord.com/invite/zEe6fcw6fm
 - https://www.communitydragon.org/ - https://www.patreon.com/communitydragon - https://discord.com/invite/rZQwuek
 - https://discord.com/invite/riotgamesdevrel

Roboto (sidebar/about): https://fonts.google.com/specimen/Roboto

# Roadmap

- UI component based
- populate DB with CDD raw json using script referencing wiki
- update DB show differences
- tests front/back
- filter skinlines
- sort alphabetical, release, champion (alphabetical), tier
- save to wishlist (uses local)
- allow logins (not sure if possible yet, so can save wishlist across local wipes, should take prior over local)
- if logins work, email (validate) when sale (prob use db)
- accessbility
- pagination?
- future plans/features (keep working on this + try get job + gamejam + Riot hackathon, maybe wiki for Bandletale) i.e. roadmap

optional
- more sorting categories
- use cloudflare r2 to host images (not sure how much, hopefully free) the cache images too (this is so not rely on CDD for images) 
- backup db with pgdump and RLS db?
- weekly sales includes hextech rotation (maybe super limited stuff like that jax skin)
- newest skins + patch
- include pbe (upcoming skins, pbe tag) or have page for that
- tag system (unlikely since prob need big db which can't afford, skinlines doable)
- some sort of import/export file (json?) system as alternative to logging in
- skin promo charity section
