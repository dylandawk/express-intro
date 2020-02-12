const chance = require("chance");
const myChance = chance(); /*"seed" gives you the start point of the random generation*/

console.log(`Your new name is ${myChance.name()} and you're new job is ${myChance.profession()}`);