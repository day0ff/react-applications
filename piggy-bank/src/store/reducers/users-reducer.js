const INITIAL_STATE = [
    {id: 2, name: 'Miroslav', password: null, role: 'user', spriteId:2},
    {id: 1, name: 'Papa', password: 'papa', role: 'admin', spriteId:1},
];

const usersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default usersReducer;
