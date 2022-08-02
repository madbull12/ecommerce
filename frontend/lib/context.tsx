import { createContext,ReactNode,useContext,useState } from "react";
import { IProduct } from "../interface";


export const ShopContext = createContext({});
export const useShopContext = () => useContext<any>(ShopContext);


export const ShopContextProvider = ({ children }:{ children:ReactNode }) => {
    const [qty,setQty] = useState(1);
    const [showCart,setShowCart] = useState(false);
    const [cartItems,setCartItems] = useState<any>([]);
    const[disableCart,setDisableCart] = useState<boolean>(false);
    const increaseQty = () => {
        setQty(prev=>prev+1);
    }
    const decreaseQty = () => {
        setQty(prev=>prev===1 ? 1 : prev-1);
    }

    const addToCart = (product:any) => {
        const exist = cartItems?.find((item:IProduct)=>item.attributes.slug === product.attributes.slug);

        console.log(product)
        console.log(cartItems)
        if(exist) {
            setDisableCart(true)
        } else {
            setCartItems([...cartItems,product]);

        }
    }

    return (<ShopContext.Provider value={{ qty,increaseQty,decreaseQty,showCart,setShowCart,cartItems,addToCart,disableCart }}>
        {children}
    </ShopContext.Provider>)
    
}
