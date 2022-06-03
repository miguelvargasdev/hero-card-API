const express = require('express');
const app = express();
const PORT = 8000;

const cards = {
    'adept pyromancer': {
        'cardName': 'Adept Pyromancer',
        'cardCost': 2,
        'cardType': 'Companion',
        'subType': 'Human Mage',
        'attack': 1,
        'health': 3,
        'cardText': 'When Adept Pyromancer comes into play you may pay 3 Mana to deal 3 Magic Damage to target Hero or Companion.',
        'flavorText': "Now now, don't go and make it too easy for me!"
    },
    'adventuring scholar':{
        'cardName': 'Adventuring Scholar',
        'cardCost': 3,
        'cardType': 'Companion',
        'subType': 'Human Mage Scout',
        'attack': 2,
        'health': 4,
        'cardText': "Whenever Adventuring Scholar deals combat damage, draw a card. 4 mana: Adventuring Scholar ignores defenders when attacking this turn.",
        'flavorText': "A reliable map can lead you anywhere."
    }
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

app.listen(PORT, () => {
    console.log(`The server is now running on port ${PORT}! Betta go catch it!`);
})