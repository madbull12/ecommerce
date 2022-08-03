import { createContext,ReactNode,useContext,useState } from "react";
import { IProduct } from "../interface";


export const ShopContext = createContext({});
export const useShopContext = () => useContext<any>(ShopContext);


export const ShopContextProvider = ({ children }:{ children:ReactNode }) => {
    const [qty,setQty] = useState(1);
    const [showCart,setShowCart] = useState<boolean>(false);
    const [cartItems,setCartItems] = useState<any>([]);
    const increaseQty = () => {
        setQty(prev=>prev+1);
    }
    const decreaseQty = () => {
        setQty(prev=>prev===1 ? 1 : prev-1);
    }

    const addToCart = (product:any,quantity:number) => {
        const exist = cartItems?.find((item:any)=>item?.attributes.slug === product?.attributes.slug);
        console.log(exist)
        if(exist) {
            setCartItems(cartItems.map((_item:any)=>_item?.attributes.slug === product?.attributes.slug ? {
                ...exist, quantity:exist.quantity + quantity
            }:_item))
        } else {
            setCartItems([...cartItems,{ ...product, quantity:quantity}])
        }

    }

    const removeFromCart = (slug:string) => {
        console.log(slug)
        const exist = cartItems?.find((item:IProduct)=>item?.attributes.slug === slug);

        if(exist?.quantity===1) {
            setCartItems(cartItems?.filter((item:IProduct)=>item.attributes.slug !== slug));
        } else {
            setCartItems(cartItems?.map((item:IProduct)=>
                item.attributes.slug === slug ? { ...exist,quantity:exist.quantity - 1 } : item
            ))
        }

    }

    return (<ShopContext.Provider value={{ qty,increaseQty,decreaseQty,showCart,setShowCart,cartItems,addToCart,removeFromCart }}>
        {children}
    </ShopContext.Provider>)
    
}
