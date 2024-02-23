function commonReducer(prevState={
    error : '',
    loading : false,
    alrtstat : true
}, action){
    // console.log(action)
    switch (action){
        case 'common':
            return{
                ...prevState,
                show : action.payload
            }
        case 'set-loading':
            return{
                ...prevState,
                loading : action.payload
            }
        case 'set-error':
            // console.log("error")
            return{
                ...prevState,
                error :action.payload
            }
        case 'alert-status' :
            return{
                ...prevState,
                addWorktypeStatus : action.payload
            }
        default :
            return prevState
    }
}
export default commonReducer;
