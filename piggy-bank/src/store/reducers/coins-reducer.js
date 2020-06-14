const INITIAL_STATE = [
    {id: 1, name: 'Монетка Звезда', picture: 'coin-star', cost:0, isBlocked: false, width: 504, step: 84, interval: 100, position:0},
];

const coinsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default coinsReducer;
