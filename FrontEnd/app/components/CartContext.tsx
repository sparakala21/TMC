import { createContext, ReactNode, useContext, useState } from "react";

type CartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: string
    quantity: number
    name: string
}

type CartContext = {
    getItemQuantity: (id: string) => number
    increaseCartQuantity: (id: string) => void
    decreaseCartQuantity: (id: string) => void
    removeFromCart: (id: string) => void
    cartItems: CartItem[]
}
const CartContext = createContext({} as CartContext)

export function useCart() {
    return useContext(CartContext)
}

export function CartProvider({ children }: CartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    
    function getItemQuantity(id: string) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id: string, name: string) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, {id, name, quantity: 1}]
            } else {
                return currItems.map(item => {
                    if (item.id === id){
                        return { ...item, quantity: item.quantity + 1}
                    }
                    else {
                        return item
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id: string) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id){
                        return { ...item, quantity: item.quantity - 1}
                    }
                    else {
                        return item
                    }
                })
            }
        })
        
    }

    function removeFromCart(id: string) {
        setCartItems(currItems => {
            return currItems.filter(items => items.id !== id)
        })
    }

    function setCartFromAccount(AccountCart: Array<Object>) {
        AccountCart.forEach((item) => {
            let acc_id = item.id;
            let acc_name = item.name;
            increaseCartQuantity(acc_id , acc_name);
        });
    }

    function cartToAPIPost(){
        let output = [];
        let temp_item;
        const [cartItems] = useState<CartItem[]>([]);
        cartItems.forEach((item)=> {
            for(let i = 0; i < item.quantity; i++){
                temp_item = item;
                temp_item;
                if ('quantitiy' in temp_item){
                    delete temp_item.quantity;
                }
                output.push(temp_item);
            }
        })
        return output;
    }



    return (
    <CartContext.Provider value= {{getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartItems, setCartFromAccount, cartToAPIPost}}>
        {children}
    </CartContext.Provider>
    )
}