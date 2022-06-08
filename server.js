const express = require('express');
const app = express();
const PORT = 8000;


class Card {
    constructor(name, cost, type, subType, attack, health, cardText, flavorText){
        this.name = name;
        this.cost = cost;
        this.type = type;
        this.subType = subType;
        this.attack = attack;
        this.health = health;
        this.cardText = cardText;
        this.flavorText = flavorText;
    }
}

const cards = {
    'adept pyromancer': new Card('Adept Pyromancer', 2, 'Companion', 'Human Mage', 1, 3, 'When Adept Pyromancer comes into play you may pay 3 Mana to deal 3 Magic Damage to target Hero or Companion.', "Now now, don't go and make it too easy for me!"),
    'adventuring scholar': new Card('Adventuring Scholar', 3, 'Companion', 'Human Mage Scout', 2, 4, 'Whenever Adventuring Scholar deals combat damage, draw a card. 4 mana: Adventuring Scholar ignores defenders when attacking this turn.', "A reliable map can lead you anywhere."),
    'alabaster guardian': new Card('Alabaster Guardian', 3, 'Companion', 'Human Cleric', 3, 4, 'Your Companions have +3 Health while defending.', "Those who swear to protect the light will find themselves sheltered by it in turn."),
    'arcane wisp': new Card('Arcane Wisp', 2, 'Companion', 'Spirit', 0, 2, 'As long as Arcane Wisp is in play your Hero has +2 Mana.', "Often cared for by sorcerers, wisps are said to be a sign of good fortune."),
    'armorsmith': new Card('Armorsmith', 2, 'Companion', 'Human Craftsman', 2, 3, 'As long as Armorsmith is in play, your Hero has +3 Armor.', "Try not to break it this time..."),
    'avarice demon': new Card('Avarice Demon', 4, 'Companion', 'Demon', 1, 3, 'Avarice Demon gets +1 Attack for each card in your hand. 2 Mana, 2 Heath: Draw a card.', "They say that greed brings out the worst in people. What if I told you that there is something even worse than that?"),
    'ayani, bison spirit': new Card('Ayání, Bison Spirit', 3, 'Companion', 'Beast Spirit', 2, 6, "Hinder, Retaliate. (This Companion can’t attack or use its active abilities the turn it comes into play. Whenever this Companion is attacked it also deals combat damage equal to its A to the attacker.)", "Nature doesn't just give, it's a cycle."),
    'barbed guardsman': new Card('Barbed Guardsman', 3, 'Companion', 'Razlore Warrior', 3, 3, "When Ayání comes into play search the side deck for 2 Prairie Bison Companions and put them into play. 4 Health: Ayání can't defend this turn. Any play may activate this ability.", "Nature doesn't just give, it's a cycle."),
    'blackmarket smuggler': new Card('Blackmarket Smuggler', 3, 'Companion', 'Human Rogue',2, 3, 'When Black Market Smuggler comes into play you may target two Equipment and swap control of them with each other.',"He can get what you need to where it needs to go, but not always when you're ready to part with it."),
    'beast tamer': new Card('Beast Tamer', 5, "Companion", "Human Scout", 5, 5, "When Beast Tamer comes into play gain control of target Beast Companion."),
    'bewitching vampire': new Card('Bewitching Vampire', 5, "Companion", "Vampire", 4, 6, "Whenever Bewitching Vampire kills a Companion return it to play under your control.","My words shall sway you even after death."),
    'blackmarket smuggler': new Card('Blackmarket Smuggler', 3, 'Companion', 'Human Rogue',2, 3, 'When Black Market Smuggler comes into play you may target two Equipment and swap control of them with each other.',"He can get what you need to where it needs to go, but not always when you're ready to part with it."),
    'channeler of frost': new Card('Channeler of Frost', 3, 'Companion', 'Orc Shaman', 4, 3, 'Your opponent’s Companions have Hinder. (They cannot attack or use their active abilities the turn they come into play.)'),
    'dark ritualist': new Card('Dark Ritualist', 2, 'Companion', 'Human Warlock',3, 1, 'When Dark Ritualist dies search the side deck for a Demon Spawn Companion and put it into play.'),
    'demon spawn': new Card('Demon Spawn', 4, 'Companion', 'Demon', 5, 5, 'Hinder. (This Companion can’t attack or use its active abilities the turn it comes into play.)'),
    'devoted worshipper': new Card('Devoted Worshipper', 1, 'Companion', 'Human Cleric', 0, 1, 'As long as Devoted Worshiper is in play your Hero can’t die. Devoted Worshiper can’t be attacked.',"My faith is stronger than any steel."),
    'ens the aurifier': new Card('Ens the Aurifier', 7, 'Companion', 'Dragon', 8, 8, 'Ens the Aurifier is unaffected by Spells and abilities. (He can still be damaged by them.) Whenever Ens the Aurifier kills a Companion search the side deck for a Gold Effigy Companion and put it into play.',"Few dare trespass in the Aurifier’s domain..."),
    'flickerwalker': new Card('Flickerwalker', 2, 'Companion', 'Spirit', 1, 3, 'When Flickerwalker comes into play return a card you control to your hand.',"If you find your things often getting misplaced or lost, flickerwalkers are more than likely to blame."),
    'foot soldier': new Card('Foot Soldier', 1, 'Companion', 'Human Warrior', 2, 2, '',"“By my conviction they will be beaten, by my blade they will fall. For my kingdom shall remain unbeaten,for that I would give all.” –Soldier’s song"),
    "forger's apprentice": new Card("Forger's Apprentice", 2, 'Companion', 'Human Craftsman', 2, 2, 'You may play Equipment as if you were 3 levels higher.',"“Trust me, she’s no shoeshiner. Not only can she forge a mean blade, but she’ll also wield one well enough to make sure you follow through on your payment.”"),
    'fortress commander': new Card('Fortress Commander', 3, 'Companion', 'Razlore', 3, 3, 'Companions you control have Retaliate. (When they are attacked they also deal combat damage to the attacker.)',"The Fortress of Barbs is a mighty razlore stronghold that withstood a fabled 90-day siege."),
    'fracture mage': new Card('Fracture Mage', 2, 'Companion', 'Human Mage', 2, 3, 'When Fracture Mage comes into play, destroy target Spell. 4 Mana: Put Fracture Mage from your hand into play.',"“Magic is like glass. Once it’s broken, there’s no fixing it.”"),
    'glint collector': new Card('Glint Collector', 1, 'Companion', 'Goblin', 1, 1, 'Whenever Glint Collector deals combat damage to another Hero, that player discards a card and adds it to your hand.',"“Silverware is worth just as much as gold to a goblin, all they care about is what has the most shine to it.”"),
    'gold effigy': new Card('Gold Effigy', 1, 'Companion', 'Treasure', 0, 3, 'Gold Effigy can’t defend. At the start of your turn you may sacrifice Gold Effigy to draw a card. If Gold Effigy would be put into the graveyard return it to the side deck instead.',"...for those found end up among his collection."),
    'grizzly bear': new Card('Grizzly Bear', 3, 'Companion', 'Beast', 4, 4,'',"“Killing a bear is no easy task, even more so after she's taken your hand.”")
}

app.get(('/'), (request, response) =>{
    response.sendFile(__dirname + '/index.html');
})

app.get(('/api/:cardName'), (request, response) => {
    const cardName = request.params.cardName.toLowerCase();
    if(cards[cardName])
        response.json(cards[cardName]);
    else
        response.json({ 
            'cardName': 'UNKNOWN'
        })
})
app.get(('/api'), (request, response) => {
    response.json(cards);
})
app.get(('/main.js'), (request, response) =>{
    response.sendFile(__dirname + '/main.js');
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is now running on port ${PORT}! Betta go catch it!`);
})