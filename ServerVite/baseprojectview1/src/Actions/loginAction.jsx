function loginAction(payload){
    return{
        type : 'login',
        payload :payload
    };
}
function setData(data){
    return {
        type : 'set-data',
        payload : data
    };
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
export default loginAction;
export{
    loginAction,
    setData,
    setLoading,
    setError
}
