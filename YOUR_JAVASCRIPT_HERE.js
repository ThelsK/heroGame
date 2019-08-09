// Write your JS here
const hero = {
    name: "Bob the Brave",
    heroic: true,
    inventory: [],
    health: 10,
    maxHealth: 10,
    hitChance: 0.5,
    weapon: {
        type: "stick",
        damage: 2,
    }
}
const goblin = {
    name: "Goblin",
    heroic: false,
    inventory: [],
    health: 10,
    maxHealth: 10,
    hitChance: 0.3,
    weapon: {
        type: "axe",
        damage: 2,
    },
    image: "goblin",
    loot: "axe",
}
const ogre = {
    name: "Ogre",
    heroic: false,
    inventory: [],
    health: 30,
    maxHealth: 30,
    hitChance: 0.7,
    weapon: {
        type: "greatclub",
        damage: 5,
    },
    image: "ogre",
    loot: "treasure",
}

function grave(character) {
    alert(`Here lies ${character.name}, who has been slain in battle.`)
}

function rest(character) {
    if (character.health == 10) {
        alert("You are already at full health!")
    }
    else {
        addEvent(`${character.name} rests and regains ${10 - character.health} health.`)
        character.health = 10;
        displayStats()
    }
    return character
}

function pickUpItem(character, item) {
    character.inventory.push(item)
    if (item.damage) {
        addEvent(`${character.name} picks up the ${item.type} (${item.damage} damage).`)
    }
    else {
        addEvent(`${character.name} picks up the ${item.type}.`)
    }
    displayStats()
    return character
}

function pickUpImage(character, item) {
    pickUpItem(character, item)
    document.getElementById(item.type).classList.add("hidden")
    if (item.type == "treasure") {
        alert(`Congratulations ${character.name}!\n\nYou have looted the treasure and won the game!`)
    }
}

function equipWeapon(character, item) {
    if (character.inventory[0] && character.weapon != character.inventory[0]) {
        character.inventory.push(character.weapon)
        character.weapon = character.inventory[0]
        character.inventory.shift()
        addEvent(`${character.name} equips the ${character.weapon.type} (${character.weapon.damage} damage).`)
        displayStats()
    }
    return character
}

function fightEnemy(character, enemy) {
    performAttack(character, enemy)
    if (!enemy.health) {
        addEvent(`${enemy.name} dropped their ${enemy.loot}. Shiny loot!`)
        document.getElementById(enemy.image).classList.add("hidden")
        document.getElementById(enemy.loot).classList.remove("hidden")

        if (!ogre.health && goblin.health) {
            alert(`${hero.name} unlocked the achievement Giantslayer!\n\n(Kill the Ogre without killing the Goblin.)`)
        }
        return
    }
    performAttack(enemy, character)
    displayStats()
    if (!hero.health) {
        const images = document.getElementsByClassName("heroIcon")
        for (let i = 0; i < images.length; i++) {
            images[i].classList.add("hidden")
        }
        document.getElementById("grave").classList.remove("hidden")
        alert(`${hero.name} has been slain in battle.`)
    }
}

function performAttack(character, target) {
    if (Math.random() < character.hitChance) {
        addEvent(`${character.name} strikes ${target.name} with their ${character.weapon.type}, dealing ${character.weapon.damage} damage.`)
        target.health -= character.weapon.damage
        if (target.health > target.maxHealth * 3 / 4) {
            addEvent(`${target.name} is slightly injured.`)
        }
        else if (target.health > target.maxHealth * 1 / 2) {
            addEvent(`${target.name} is somewhat beaten up.`)
        }
        else if (target.health > target.maxHealth * 1 / 4) {
            addEvent(`${target.name} is bleeding profoundly.`)
        }
        else if (target.health >= 1) {
            addEvent(`${target.name} is gravely wounded.`)
        }
        else {
            addEvent(`${target.name} is slain in battle.`)
            target.health = 0
        }
    }
    else {
        addEvent(`${character.name} attacks ${target.name} with their ${character.weapon.type}, but misses.`)
    }
}

function addEvent(eventText) {
    const eventElement = document.getElementById("eventList")
    eventElement.innerText = `${eventElement.innerText}${eventText}\n`
    eventElement.scrollTop = eventElement.scrollHeight
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

function renameHero() {
    const name = document.getElementById("nameInput").value.trim()
    if (!name) {
        alert("Please enter a name for your hero!")
        return
    }
    addEvent(`${hero.name} is now known as ${name}.`)
    hero.name = name
    displayStats()
    document.getElementById("nameLabel").classList.add("hidden")
    document.getElementById("nameInput").classList.add("hidden")
    document.getElementById("nameButton").classList.add("hidden")
}

addEvent(`${hero.name} goes on a grand adventure!`)
displayStats()