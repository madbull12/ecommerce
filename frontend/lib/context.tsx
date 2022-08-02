import { createContext,ReactNode,useContext,useState } from "react";


export const ShopContext = createContext({});
export const useShopContext = () => useContext<any>(ShopContext);


export const ShopContextProvider = ({ children }:{ children:ReactNode }) => {
    const [qty,setQty] = useState(1);
    const [showCart,setShowCart] = useState(false);
    const [cartItems,setCartItems] = useState([]);
    const increaseQty = () => {
        setQty(prev=>prev+1);
    }
    const decreaseQty = () => {
        setQty(prev=>prev===1 ? 1 : prev-1);
    }



    return (<ShopContext.Provider value={{ qty,increaseQty,decreaseQty,showCart,setShowCart,cartItems }}>
        {children}
    </ShopContext.Provider>)
    
}
