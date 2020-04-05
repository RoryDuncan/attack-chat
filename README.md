# attack-chat

![CI/CD](https://github.com/RoryDuncan/attack-chat/workflows/CI/CD/badge.svg)

This is an experiment to see what a chat experience would be like if XSS is a feature.

With XSS as a feature, obviously there can't be authentication or vital stored data.


> You: That sounds dangerous!

Kind of.

Here are some of the reasons why it's not _that_ concerning:

- Chat rooms are protected via Security through Obscurity, by their room ID.
  - At this stage, the database is publically read and write, so someone can still find your room.
- You can only join rooms with their ID / URL shared with you.
- Evaluation of code is only opt-in. Joining a room doesn't automatically make you susceptible to anything.
  - You can enable auto-evaluation of code after joining a channel. Quite simply: **Trust the people in that room before turning on auto-evaluation**.
- you're still protected by your browser requirements around user interactions


Here are some reasons about why it could be concerning:

- No evaluation protections are in place. Someone can `while(true) document.write("-");` and any other simple methods for crashing your browser instance.
- Injecting Iframes could be problematic
- You can become part of a bot farm if they XHR from your device.

**Thus**, for your safety:
- **review code before evaluating**
- **Only enable auto-evaluation in a room with users your trust**
- Encompassing both statements above: **Don't chat with strangers.**

## Possible next steps

- Add authentication despite risks
  - allows private rooms
  - allows people in that room to potentially steal your authentication
    - with trust — perhaps not an issue