import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { createContext } from "react";

export interface ICartItem {
  name: string;
  desc: string;
  qty: number;
  price: number;
}

export const cartStore = createContext<{
  cartItems: Record<string, ICartItem>;
  setCartItems: React.Dispatch<React.SetStateAction<Record<string, ICartItem>>>;
  addItem: (item: ICartItem) => void;
  editItem: (id: string, item: ICartItem) => void;
  deleteItem: (id: string) => void;
}>({} as any);

function CartContext({ children }: PropsWithChildren) {
  const [cartItems, setCartItems] = useState<Record<string, ICartItem>>({});

  const addItem = useCallback(
    (item: ICartItem) => {
      const alreadyInCartIndex = Object.values(cartItems).findIndex(
        (itemx) => itemx.name.toLowerCase() === item.name.toLowerCase()
      );

      if (alreadyInCartIndex > -1) {
        const findedItemId = Object.keys(cartItems)[alreadyInCartIndex];
        const { qty, ...itemRest } = cartItems[findedItemId];
        editItem(findedItemId, { ...itemRest, qty: qty + 1 });
        return;
      }

      const id = (Object.keys(cartItems).length + 1).toString();
      setCartItems((prev) => ({ ...prev, [id]: item }));
    },
    [cartItems]
  );

  const editItem = useCallback(
    (id: string, item: ICartItem) => {
      if (item.qty < 1) {
        setCartItems(({ [id]: _, ...prev }) => ({ ...prev }));
        return;
      }

      setCartItems(({ [id]: _, ...prev }) => ({ ...prev, [id]: item }));
    },
    [cartItems]
  );

  const deleteItem = useCallback(
    (id: string) => {
      setCartItems(({ [id]: _, ...prev }) => ({ ...prev }));
    },
    [cartItems]
  );

  useEffect(() => {
    const isStorageInitialized = localStorage.getItem("cart") !== null;

    if (isStorageInitialized) {
      try {
        const cart = JSON.parse(localStorage.getItem("cart")!);
        if (Object.keys(cart).length > 0) {
          setCartItems((_) => cart);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
      } catch (error) {
        setCartItems((_) => ({}));
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <cartStore.Provider
      value={{
        cartItems,
        setCartItems,
        addItem,
        editItem,
        deleteItem,
      }}
    >
      {children}
    </cartStore.Provider>
  );
}

export default CartContext;
