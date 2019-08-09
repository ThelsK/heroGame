// Write your JS here
const hero = {
    name: "Bob the Brave",
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
        alert("You are already at full health!")
    }
    else {
        addEvent(`${character.name} rests and regains ${10 - character.health} health.`)
    }
    character.health = 10;
    return character;
}

function pickUpItem(character, item) {
    character.inventory.push(item)
    if (item.damage) {
        addEvent(`${character.name} picks up ${item.type} (${character.weapon.damage} damage).`)
    }
    else {
        addEvent(`${character.name} picks up ${item.type}.`)
    }    
}

function equipWeapon(character, item) {
    if (character.inventory[0] && character.weapon != character.inventory[0]) {
        character.weapon = character.inventory[0]
        addEvent(`${character.name} equips ${character.weapon.type} (${character.weapon.damage} damage).`)
    }
}

function addEvent(eventText) {
    const eventElement = document.getElementById("eventList")
    eventElement.innerText = `${eventElement.innerText}\n${eventText}`
}