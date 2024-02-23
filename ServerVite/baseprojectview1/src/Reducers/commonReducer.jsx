function commonReducer(prevState = false, action){
    switch (action.type){
        case 'common':
            return{
                ...prevState,
                show : action.payload
            }
        default :
            return prevState
    }
}
export default commonReducer;
