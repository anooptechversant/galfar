function usersReducer(state={
    userdata : [],
    usererror : '',
    userloading : false
},action){
    switch (action.type){
        case 'set-data':
            return{
                ...state,
                userdata :action.payload
            }
        case 'loading' :
            return{
                ...state,
                userloading : action.payload
            }
        case 'error' :
            return{
                ...state,
                usererror : action.payload
            }
        default :
            return state;

    }
}

export default usersReducer;