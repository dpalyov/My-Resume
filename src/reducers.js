const initialState = {
    notification: {
        enabled: false,
        text: "",
        image: ""
    }
}

const appReducer = (state, action) => {
    switch(action.type){
        case "NOTIFICATION": {
            return {
                ...state,
                notification: action.payload
            }
        }
        default: return state;
    }
}

export {initialState, appReducer}