# League-Skins

League Skins isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
Programmer: Kenny Luu
Art and UI Design: Thanh Nguyen

Passion Project meant to help players keep track of their favorite skins and when they go on sale all in one place. For questions, please contact us via Kenny’s Linkedin inbox:
Postgres + TypeScript + Express

github icon: https://devicon.dev/
other icons: https://uxwing.com/license/
//TODO (have some time constraints atm)

- UI component based
- populate DB with CDD raw json using script referencing wiki
- better description + mention communityDragon + skinSpotlights + Khada + Official Wiki, linkedIN links, no AI, icon
- tests front/back
- catalog functionality first (view skins)
- filter skinlines
- save to wishlist (uses local)
- allow logins (not sure if possible yet, so can save wishlist across local wipes, should take prior over local)
- if logins work, email (validate) when sale (prob use db)
- accessbility
- pagination?
- future plans/features (keep working on this + try get job + gamejam + Riot hackathon, maybe wiki for Bandletale) i.e. roadmap

optional

- use cloudflare r2 to host images (not sure how much, hopefully free) the cache images too (this is so not rely on CDD for images) 
- backup db with pgdump and RLS db?
- weekly sales includes hextech rotation (maybe super limited stuff like that jax skin)
- newest skins + patch
- include pbe (upcoming skins, pbe tag) or have page for that
- tag system (unlikely since prob need big db which can't afford, skinlines doable)
- some sort of import/export file (json?) system as alternative to logging in
