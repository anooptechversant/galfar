function loginReducer(state={
    data : [],
    error : '',
    loading : false
},action){
    switch (action.type){
        case 'set-data':
            return{
                ...state,
                data :action.payload
            }
        case 'loading' :
            return{
                ...state,
                loading : action.payload
            }
        case 'error' :
            return{
                ...state,
                error : action.payload
            }
        default :
            return state;

    }
}

export default loginReducer;
