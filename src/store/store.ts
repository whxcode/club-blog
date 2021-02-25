import { createStore,combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import userReducer,{ IUser } from "@/store/user"
export interface IReducer {
    user: IUser
}
const reducer = combineReducers<IReducer>({
    user: userReducer,
})
const store = createStore(reducer,{

},applyMiddleware(thunk))
export default store