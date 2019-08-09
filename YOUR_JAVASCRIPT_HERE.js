// Write your JS here
const hero = {
    name: "Bob",
    heroic: true,
    inventory: [],
    health: 10,
    weapon: {
        type: "stick",
        damage: 2,
    }
}

function rest(character) {
    if (character.health == 10) {
        alert("You're already fully rested!")
    }
    character.health = 10;
    return character;
}

function pickUpItem(character, item) {
    character.inventory.push(item)
}

function equipWeapon(character, item) {
    if (character.inventory[0]) {
        character.weapon = character.inventory[0]
    }
}