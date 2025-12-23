/**
 * Edit your "presentation flow" here.
 *
 * Each scene is a node with:
 *  - id: route key
 *  - title: short headline
 *  - body: array of paragraphs (keeps formatting clean and safe)
 *  - music: optional { trackId, autoplay?: boolean }
 *  - gate: optional { requireMusicStarted?: boolean, requireMinSecondsPlayed?: number }
 *  - actions: array of buttons
 *      - label: text on button
 *      - to: scene id or external URL
 *      - style: "primary" | "ghost" | "danger"
 *      - confirm: optional confirm dialog config
 *
 * Tip: Keep the content here, keep the UI in components.
 */

export const flowConfig = {
  entrySceneId: "intro",
  defaultTrackId: "noir"
};

export const tracks = {
  noir: {
    id: "noir",
    title: "Noir Ambient",
    // Put your own MP3 in /public/audio and update the path.
    // Autoplay is blocked on phones unless user taps first.
    src: "/audio/Nika, Heart of the City.mp3",
    loop: true,
    volume: 0.55
  }
};

export const scenes = [
  {
    id: "intro",
    title: "Before we start",
    body: [
      "Put your phone on Do Not Disturb.",
      "Dim the lights a bit, and press Play when you are ready."
    ],
    music: { trackId: "noir", autoplay: false },
    gate: { requireMusicStarted: true },
    actions: [
      { label: "I am ready", to: "moment", style: "primary" },
      { label: "Skip music", to: "moment", style: "ghost" }
    ]
  },
  {
    id: "moment",
    title: "First things first",
    body: [
      "I like you, Nika!",
      "And I’d love to take you on a date and write a little chapter of our own."
    ],
    actions: [
      { label: "Why?", to: "elegant", style: "primary" },
      {
        label: "No way",
        to: "endrabbit",
        style: "ghost",
        confirm: {
          title: "One second",
          message: "Are you sure? you don't want to see why?",
          confirmText: "I'm sure :(",
          cancelText: "no wait!"
        }
      }
    ]
  },

  {
    id: "endrabbit",
    title: "So unfortunate",
    body: [
      "So sad Nika, but it is okay, we can always be friend if you want",
      "Also please text me the word : 'Rabbit' so I will know your decision"
    ],
  },

  {
    id: "elegant",
    title: "Why?",
    body: [
      "Why what? We are fucking awesome, simple as that!",
      "Choose any of these, you cannot go wrong."
    ],
    actions: [
      { label: "Why Nika is awesome", to: "Nika", style: "primary" },
      { label: "Why Hossein is awesome", to: "Hossein", style: "primary" },
      { label: "Why we should go on a date", to: "HosseinNika", style: "primary" }
    ]
  },


  {
    id: "Nika",
    title: "Nika",
    body: [
      "Nika you are awesome",
      "You are incredibly smart, and I love how easy it is to connect with you.",
      "You are honest, confident, brave, and unapologetically yourself.",
      "And yes… you are also unbelievably attractive!"
    ],
    actions: [
      { label: "Let's go on a date", to: "Date", style: "primary" },
      { label: "Back", to: "elegant", style: "ghost" },
    ]
  },


  {
    id: "Hossein",
    title: "Hossein",
    body: [
      "Really? You want to know why I'm awesome? Isn't it obvious? :))",
      "First, I can build a website for you!",
      "Second, I'm ambitious, funny, and kind.",
      "Lastly, I'm one of the smartest people you've ever seen :)"
    ],
    actions: [
      { label: "Let's go on a date", to: "Date", style: "primary" },
      { label: "Back", to: "elegant", style: "ghost" },
    ]
  },




  {
    id: "HosseinNika",
    title: "I like you",
    body: [
      "We should go on a date, because",
      "I really like you. Need proof? I literally built a whole website just for you!",
      "I’m also very romantic… so trust me, you’ll have a great time 😄",
    ],
    actions: [
      { label: "Let's go on a date", to: "Date", style: "primary" },
      { label: "Back", to: "elegant", style: "ghost" },
    ]
  },




  {
    id: "Date",
    title: "Hoorraaa!",

    body: [
      "There is no back button!",
      "You have three options!",
      "Choose wisely.",
    ],

    actions: [
      { label: "Chill date", to: "chill", style: "ghost" },
      { label: "Surprise date", to: "surprise", style: "primary" },
      { label: "Crazy date", to: "crazy", style: "danger" },

    ]
  },




  {
    id: "chill",
    title: "Chill date",
    body: [
      "Coooooooool",
      "please text me the word : 'Monkey' so I will know your decision, also tell me which day works best for you."
    ],
  },



  {
    id: "surprise",
    title: "Surprise date",
    body: [
      "Be ready for your best or worst day :))",
      "please text me the word : 'Tiger' so I will know your decision, also tell me which day works best for you."
    ],
  },



  {
    id: "crazy",
    title: "Crazy date",
    body: [
      "Don't worry, i will return you in complete health to your family",
      "please text me the word : 'Dragon' so I will know your decision, also tell me which day works best for you."
    ],
  },



  {
    id: "music",
    title: "Music check",
    body: [
      "Tap Play, then enjoy a few seconds.",
      "When you feel it, continue."
    ],
    music: { trackId: "sparkle", autoplay: false },
    gate: { requireMusicStarted: true, requireMinSecondsPlayed: 6 },
    actions: [
      { label: "Continue", to: "question", style: "primary" },
      { label: "Back", to: "playful", style: "ghost" }
    ]
  },
  {
    id: "question",
    title: "The question",
    body: [
      "Imagine this is your final page.",
      "You can place any message here, with as many choices as you want."
    ],
    actions: [
      { label: "Yes", to: "yes", style: "primary" },
      { label: "No", to: "no", style: "danger" },
      { label: "Restart", to: "intro", style: "ghost" }
    ]
  },
  {
    id: "yes",
    title: "Nice",
    body: [
      "You can end the experience here.",
      "Or branch into another ending."
    ],
    actions: [
      { label: "One more page", to: "ending", style: "primary" },
      { label: "Restart", to: "intro", style: "ghost" }
    ]
  },
  {
    id: "no",
    title: "Fair",
    body: [
      "No worries.",
      "That is also a valid ending."
    ],
    actions: [
      { label: "Restart", to: "intro", style: "primary" }
    ]
  },
  {
    id: "ending",
    title: "End",
    body: [
      "Replace this with your own finale.",
      "You can also link out to an external URL if you want."
    ],
    actions: [
      { label: "Open Instagram", to: "https://instagram.com", style: "ghost" },
      { label: "Restart", to: "intro", style: "primary" }
    ]
  }
];
