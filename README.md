# Lux Flow (Vue 3 + Vite) for Vercel

A dark, luxury, mobile-first "presentation flow" website:
- Start page
- Scene pages driven by a single data file
- Branching buttons (choose-your-path)
- Confirmation popups
- Music dock (play, pause, mute)
- Smooth transitions and glassy UI

## 1) Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal.

## 2) Edit your flow (add pages)

Edit:

- `src/flows/story.js`

Add a new scene:

```js
{
  id: "my-new-step",
  title: "My new step",
  body: ["First line", "Second line"],
  actions: [
    { label: "Next", to: "somewhere", style: "primary" },
    { label: "Back", to: "intro", style: "ghost" }
  ]
}
```

Then link to it by using `to: "my-new-step"`.

## 3) Add audio

Put MP3 files in:

- `public/audio/`

Then update `tracks` in `src/flows/story.js`.

Important: Phones block autoplay. Use the Start button to enable audio (a user gesture).

## 4) Deploy to Vercel

Push this folder to GitHub, then in Vercel:
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`

That is it.

## Notes

- External links: set `to: "https://..."` in an action.
- Confirmation popup: add a `confirm` object in the action.
- Scene gating: use `gate` to require music started or a minimum seconds played.
