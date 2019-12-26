export default store => next => action => {
    if(action.api){
        fetch(action.api)
            .then(res => res.json())
            .then(response => next({...action, response}))
    } else next(action);
};