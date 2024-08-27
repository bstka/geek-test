import React, { PropsWithoutRef, useContext } from "react";
import trash from "../assets/trash.svg";
import chevronUp from "../assets/chevron_up.svg";
import { cartStore, ICartItem } from "../context/cart";

function CheckOutCartItem({
  desc,
  name,
  qty,
  price,
  id,
}: PropsWithoutRef<ICartItem & { id: string }>) {
  const { editItem, deleteItem } = useContext(cartStore);
  return (
    <div className='w-full p-2 rounded-2xl border border-white flex flex-row gap-2 items-center'>
      <figure className='min-w-20 h-20 ml-0 bg-white rounded-lg'></figure>
      <div className='text-white'>
        <h1 className='font-medium text-lg'>{name}</h1>
        <p className='w-64 text-xs truncate overflow-ellipsis'>{desc}</p>
      </div>
      <div className='w-fit ml-auto'>
        <div className='flex flex-row items-center'>
          <input
            type='number'
            min={0}
            disabled
            value={qty}
            className='w-14 text-white rounded-lg p-2 bg-transparent'
          />
          <div className='flex flex-col text-white'>
            <button
              className='p-0'
              onClick={(_) => editItem(id, { desc, name, price, qty: qty + 1 })}
            >
              <img className='w-4' src={chevronUp} alt='' />
            </button>
            <button
              className='p-0'
              onClick={(_) => editItem(id, { desc, name, price, qty: qty - 1 })}
            >
              <img
                className='w-4 transform rotate-180'
                src={chevronUp}
                alt=''
              />
            </button>
          </div>
        </div>
      </div>
      <h2 className='text-white ml-auto text-sm'>${price}</h2>
      <button className='ml-auto px-4' onClick={(_) => deleteItem(id)}>
        <img className='w-6' src={trash} alt='' />
      </button>
    </div>
  );
}

export default CheckOutCartItem;
