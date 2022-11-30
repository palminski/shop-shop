import React, {createContext, useContext} from 'react';
import { useProductReducer } from './reducers';

const StoreContext = createContext();
const {Provider} = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
    const [state,dispatch] = useProductReducer({
        products: [],
        categories: [],
        currentCategory: '',
    });
    //confirm it works
    console.log(state);
    return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
    return useContext(StoreContext);
};

export {StoreProvider, useStoreContext};

//Above is last thing I did. Check section 22.1.5 tommorow