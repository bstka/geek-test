import React, { useContext, useEffect, useMemo, useState } from "react";
import PageHeader from "../components/pageHeader";
import mastercardLogo from "../assets/mastercard_logo.png";
import rupayLogo from "../assets/rupay_logo.png";
import visaLogo from "../assets/visa_logo.png";
import arrrowRight from "../assets/arrow_right.svg";
import CheckOutCartItem from "../components/checkOutCartItem";
import { cartStore } from "../context/cart";

function Checkout() {
  const { cartItems } = useContext(cartStore);

  const [total, setTotal] = useState({
    subtotal: 0,
    total: 0,
  });

  const currencyFormat = useMemo(() => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
  }, []);

  useEffect(() => {
    const calcSubtotal = Object.values(cartItems).reduce((prev, curr) => {
      return curr.price * curr.qty + prev;
    }, 0);

    setTotal({
      subtotal: calcSubtotal,
      total: calcSubtotal + 4,
    });
  }, [cartItems]);
  
  return (
    <div className='w-full max-w-screen-xl h-fit mx-auto px-8'>
      <div className='w-full h-full flex flex-row gap-4'>
        <div className='w-full h-full flex flex-col items-start justify-start'>
          <PageHeader title='Shopping Continue' />
          <div className='text-white py-4'>
            <h2 className='text-lg font-medium'>Shopping Cart</h2>
            <small>
              You have {Object.keys(cartItems).length} item in your cart
            </small>
          </div>
          <div className='w-full max-w-xl flex flex-col gap-4 items-start justify-start'>
            {Object.keys(cartItems!).map((id) => (
              <CheckOutCartItem
                desc={cartItems![id].desc}
                name={cartItems![id].name}
                price={cartItems![id].price}
                qty={cartItems![id].qty}
                id={id}
                key={cartItems![id].name}
              />
            ))}
          </div>
        </div>
        <div className='h-fit w-96 border rounded-3xl p-6'>
          <div className='w-full h-20 flex flex-row items-center justify-between'>
            <h1 className='text-xl text-white font-semibold'>Card Details</h1>
            <figure className='w-12 h-12 bg-white rounded-md'></figure>
          </div>
          <div className='flex flex-col justify-start items-start gap-4'>
            <div className='w-full h-full flex flex-col gap-6'>
              <label className='text-white'>Card Type</label>
              <div className='w-full h-fit flex flex-row gap-2'>
                {[mastercardLogo, visaLogo, rupayLogo].map((logo) => {
                  return (
                    <button
                      key={logo}
                      className='h-12 w-20 flex items-center justify-center border border-white rounded-lg'
                    >
                      <img className='w-16' src={logo} alt='' />
                    </button>
                  );
                })}
                <button className='h-12 w-20 flex items-center justify-center border border-white rounded-lg'>
                  <span className='text-white text-sm font-bold'>See All</span>
                </button>
              </div>
            </div>
            <div className='w-full h-full flex flex-col gap-4'>
              <label className='text-white'>Name on card</label>
              <input
                type='text'
                placeholder='Name'
                className='text-white rounded-lg border border-white p-2 bg-transparent'
              />
            </div>
            <div className='w-full h-full flex flex-col gap-4'>
              <label className='text-white'>Card Number</label>
              <input
                type='text'
                placeholder='1111 2222 3333 4444'
                className='text-white rounded-lg border border-white p-2 bg-transparent'
              />
            </div>
            <div className='w-full h-full flex flex-row gap-2'>
              <div className='w-1/2 h-full flex flex-col gap-4'>
                <label className='text-white'>Expiration date</label>
                <input
                  type='text'
                  placeholder='mm/yy'
                  className='text-white rounded-lg border border-white p-2 bg-transparent'
                />
              </div>
              <div className='w-1/2 h-full flex flex-col gap-4'>
                <label className='text-white'>CVV</label>
                <input
                  type='number'
                  placeholder='123'
                  className='text-white rounded-lg border border-white p-2 bg-transparent'
                />
              </div>
            </div>
            <hr className='border-white w-full my-2' />
            <div className='w-full h-fit flex flex-col gap-1'>
              <div className='w-full flex flex-row justify-between text-white'>
                <span>Subtotal</span>
                <span>{currencyFormat.format(total.subtotal)}</span>
              </div>
              <div className='w-full flex flex-row justify-between text-white'>
                <span>Shipping</span>
                <span>{currencyFormat.format(4)}</span>
              </div>
              <div className='w-full flex flex-row justify-between text-white'>
                <span>Total (Tax incl.)</span>
                <span>{currencyFormat.format(total.total)}</span>
              </div>
            </div>
            <hr />
            <button className='w-full border rounded-xl flex flex-row items-center justify-between p-4 text-white'>
              <span>{currencyFormat.format(total.total)}</span>
              <div className='flex flex-row items-center gap-1'>
                <span>Checkout</span>{" "}
                <img src={arrrowRight} alt='' className='text-white' />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
