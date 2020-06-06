const INITIAL_STATE = [
    {id: 1, name: 'Miroslav', password: null, role: 'user'},
    {id: 2, name: 'Papa', password: 'papa', role: 'admin'}
];

const usersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default usersReducer;
