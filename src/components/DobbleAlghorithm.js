const numberOfSymbolsOnCard = 4;
const numberOfCards = numberOfSymbolsOnCard**2 - numberOfSymbolsOnCard + 1
const itemList = [...Array(numberOfCards).keys()]

const DobbleAlghorithm = (online = false) => {
    const initialize = async () => {
        const n = numberOfSymbolsOnCard-1;
        let cards = await addFirstSet(n)
        cards = await addNSets(n, cards)
        if (online) {
            cards = cards.slice(1)
        }
        cards = shuffleArray(cards)
        return cards;
    }
    return initialize()
}

const addFirstSet = (n) => {
    let cards = []
    //Add first set of n+1 cards (e.g. 4 cards)
    for (let i = 0; i < n + 1; i++) {
        //Add new card with first symbol
        cards.push([itemList[0]])
        //Add n+1 symbols on the card (e.g. 4 symbols)
        for (let j = 0; j < n; j++) {
            cards[i].push(itemList[(j+1)+(i*n)])
        }
    }
    return cards;
}

const addNSets = (n, cards) => {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            //Append a new card with 1 symbol
            cards.push([itemList[i+1]])
            for (let k = 0; k < n; k++) {
                let val  = (n+1 + n*k + (i*k+j)%n)+1
                cards[cards.length - 1].push(itemList[val-1])
            }                
        }            
    }
    return cards;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

module.exports = DobbleAlghorithm