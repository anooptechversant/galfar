function commonAction(payload){
    return{
        type : 'login',
        payload :payload
    }
}
function setLoading (isLoading){
    return {
        type : 'loading',
        payload : isLoading
    };
}

function setError (error){
    return{
        type : 'error',
        payload : error

    };
}
function setCommonResponse (responsestatus){
    return{
        type : 'responseStatus',
        payload : responsestatus

    };
}
function setCommonResponseFail (responsestatusfail){
    return{
        type : 'responseStatusFail',
        payload : responsestatusfail

    };
}
export default commonAction;
export{
    setLoading,
    setError,
    setCommonResponse,
    setCommonResponseFail

}