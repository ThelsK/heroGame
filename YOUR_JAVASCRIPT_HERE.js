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
        displayStats()
    }
    character.health = 10;
    return character;
}

function pickUpItem(character, item) {
    character.inventory.push(item)
    document.getElementById(item.type).classList.add("hidden")
    if (item.damage) {
        addEvent(`${character.name} picks up a ${item.type} (${character.weapon.damage} damage).`)
    }
    else {
        addEvent(`${character.name} picks up a ${item.type}.`)
    }
    displayStats()
}

function equipWeapon(character, item) {
    if (character.inventory[0] && character.weapon != character.inventory[0]) {
        character.inventory.push(character.weapon)
        character.weapon = character.inventory[0]
        character.inventory.shift()
        addEvent(`${character.name} equips a ${character.weapon.type} (${character.weapon.damage} damage).`)
        displayStats()
    }
}

function addEvent(eventText) {
    const eventElement = document.getElementById("eventList")
    eventElement.innerText = `${eventElement.innerText}${eventText}\n`
}

function displayStats() {
    document.getElementById("heroName").innerText = hero.name
    document.getElementById("heroHealth").innerText = `Health: ${hero.health} of 10.`
    document.getElementById("heroWeapon").innerText = `Weapon: ${hero.weapon.type} (${hero.weapon.damage} damage)`
    if (hero.inventory.length) {
        let inventory = "Inventory:"
        for (let i = 0; i < hero.inventory.length; i++) {
            const item = hero.inventory[i]
            if (item.damage) {
                inventory += `\n${item.type} (${item.damage} damage)`
            }
            else {
                inventory += `\n${item.type}`
            }
        }
        document.getElementById("heroInventory").innerText = inventory
    }
    else {
        document.getElementById("heroInventory").innerText = "Empty inventory."
    }
}

addEvent(`${hero.name} goes on a grand adventure!`)
displayStats()