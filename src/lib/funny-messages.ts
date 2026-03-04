// Funny messages shown when user tries to click the "No" button

export const funnyMessages = [
  "Nice try! 😏",
  "Oops, missed!",
  "That button is shy!",
  "Are you really sure?",
  "Try the other one!",
  "No running away!",
  "The button has stage fright!",
  "Come on, be nice!",
  "Wrong choice, try again!",
  "That button doesn't work!",
  "Maybe reconsider? 🥺",
  "The button escaped!",
  "Catch me if you can!",
  "Not today!",
  "Love always wins! 💕",
];

export function getRandomMessage(): string {
  return funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
}
