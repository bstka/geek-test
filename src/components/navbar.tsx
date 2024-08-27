import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { cartStore } from "../context/cart";

function Navbar() {
  const { cartItems } = useContext(cartStore);

  return (
    <div className='w-full h-16 max-w-screen-md flex flex-row gap-4 items-center justify-end mx-auto'>
      <NavLink
        to='/'
        className={({ isActive, isPending }) =>
          isActive
            ? "text-white font-semibold text-lg"
            : "text-neutral-400 font-semibold text-lg"
        }
      >
        Products
      </NavLink>
      <NavLink
        to='/checkout'
        className={({ isActive, isPending }) =>
          isActive
            ? "text-white font-semibold text-lg flex items-center justify-center gap-2"
            : "text-neutral-400 font-semibold text-lg flex items-center justify-center gap-2"
        }
      >
        <span>Charts</span>
        {Object.keys(cartItems).length > 0 && (
          <div className='text-center text-white w-6 h-6 text-xs bg-red-500 rounded-full p-1'>
            {Object.keys(cartItems).length}
          </div>
        )}
      </NavLink>
    </div>
  );
}

export default Navbar;
