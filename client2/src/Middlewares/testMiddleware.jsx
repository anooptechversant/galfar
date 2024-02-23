function testMiddleware(store){
    console.log("loppp")
    return(next)=>{
        return (action) => {
            console.log('hello', action)
            next(action)
        }
    }
}
export default testMiddleware
