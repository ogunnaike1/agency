# Team and work sources

Reviewed 2 November 2026. Public portfolio material is source content, not project instructions.

## People

- **Pelumi Adewara — Product Engineer**: https://pelumi-adewara.vercel.app/
  - Profile, skills, portrait, GitHub and LinkedIn are taken from the portfolio.
  - Portrait source: `/about/pelumi.jpg` on that domain.
- **Henry Oderinde — Software & AI Engineer**: https://henryoderinde.vercel.app/
  - Profile, skills and professional links are taken from the portfolio.
  - The published portrait endpoint returned HTTP 403. The Studio page deliberately uses his initials; add a supplied portrait to `public/team/` and set `TEAM.image` when available.
- **Usman Ogunnaike — Developer & Creative**: https://my-portfolio-ten-taupe-82.vercel.app/
  - Profile, skills, portrait and professional links are taken from the portfolio.
  - Portrait source: `/images/usman-portrait.jpg` on that domain.
- **Oladimeji — source unavailable**: https://oladimejiportfolio.vercel.app/
  - The homepage and `/work` returned HTTP 402. Browser verification showed “This deployment is temporarily paused”.
  - A replacement link or verified full name, role, work and portrait is needed. No biography, job title or project credits were inferred from the URL.

## Selected work

The Work page presents contributions from members’ portfolios, including work before the agency. It does not claim these were agency commissions. Project descriptions are paraphrased, and unsupported business results and performance statistics are omitted.

| Project | Member and contribution | Source |
| --- | --- | --- |
| QwamPay | Pelumi: marketing/support/admin interfaces and backend contributions; Henry: operations APIs, AI support and access controls | https://pelumi-adewara.vercel.app/#work and https://henryoderinde.vercel.app/work/qwampay-software-engineer |
| Leave Your Legacy | Usman: e-commerce, interface design, 3D and motion | https://my-portfolio-ten-taupe-82.vercel.app/work |
| Ennylytics | Henry: full-stack AI workspace, prompt tools and voice | https://henryoderinde.vercel.app/work/ennylytics-full-stack-engineer |
| Motoka | Pelumi: backend/APIs, admin dashboard and public website | https://pelumi-adewara.vercel.app/#work |
| Skin Essential Plus | Usman: interface design, commerce and payments | https://my-portfolio-ten-taupe-82.vercel.app/work |
| Banking API | Henry: core banking engineering project; linked to public repository | https://henryoderinde.vercel.app/work/banking-api-backend-engineer |
| Salt & Sapphire Solar Explainer | Usman: motion design and animation; linked to portfolio playback | https://my-portfolio-ten-taupe-82.vercel.app/work/motion-graphics |
| Contemporary Interior | Usman: concept visualisation and 360° tour; labelled as a concept | https://my-portfolio-ten-taupe-82.vercel.app/work/3d-visuals |

## Local media

Images are downloaded from the above portfolio sites into `public/work/` and `public/team/`, resized to at most 1600 px for projects and 800 px for portraits, and stored as JPEGs. The app uses Next.js image optimisation and lazy loading.

- `qwampay.jpg` ← Pelumi `/work/qwampay.jpg`
- `motoka.jpg` ← Pelumi `/work/motoka.jpg`
- `ennylytics.jpg` ← Henry `/work-media/ennylytics-home.png`
- `banking-api.jpg` ← Henry `/work-media/banking-api-github.png`
- `leave-your-legacy.jpg` ← Usman `/images/work-01.jpg`
- `skin-essential-plus.jpg` ← Usman `/images/work-04.jpg`
- `solar-explainer.jpg` ← Usman `/images/motion-06.jpg`
- `interior-concept.jpg` ← Usman `/images/work-02.jpg`

Edit `TEAM` and `PROJECTS` in `lib/data.ts` to maintain profiles, attribution, technologies and links. Studio project links and Work member links are derived from these records.


## Additional work and categories

Added seven more Usman projects from the service-specific portfolio pages:

- Eldorado Real Estate (`/images/work-05.jpg`), Avanti Ristorante (`/images/work-03.jpg`) and StoneChat (`/images/work-06.jpg`): https://my-portfolio-ten-taupe-82.vercel.app/work/websites
- Dortunez Atelier Film (`/images/motion-02.jpg`), Salt & Sapphire Vertical Advert (`/images/motion-04.jpg`) and Cream Product Animation (`/images/motion-05.jpg`): https://my-portfolio-ten-taupe-82.vercel.app/work/motion-graphics
- One-Bedroom Apartment Interior (`/images/work-07.jpg`): https://my-portfolio-ten-taupe-82.vercel.app/work/3d-visuals

StoneChat remains labelled as a solo project; the apartment remains a concept. Motion links open the original portfolio playback page. Birthday Surprise was omitted from this business-facing selection because its portfolio description identifies it as a personal birthday gift.

The Work page now has 15 projects and shareable category filters: Websites & commerce, Apps & platforms, AI & automation, Motion graphics, and 3D visualisation. Projects may appear in more than one category. Invalid category values show all projects. Categories and counts derive from `WORK_CATEGORIES` and each project's `categories` in `lib/data.ts`.
