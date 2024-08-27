import React, { useContext, useMemo, useState } from "react";
import crown from "../assets/crown_icon.svg";
import star from "../assets/star_icon.svg";
import primeBadge from "../assets/prime_badge.svg";
import macbook from "../assets/mac_mock.jpg";
import chvron from "../assets/chevron_icon.svg";
import { faker } from "@faker-js/faker";
import { cartStore } from "../context/cart";

function ProductCard({ rank }: { rank: string | number }) {
  const { addItem } = useContext(cartStore);

  const currencyFormat = useMemo(() => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
  }, []);

  const [productDetail] = useState(() => {
    const price = faker.number.bigInt({ min: 200, max: 2000 });

    return {
      brand: faker.company.name(),
      name: faker.commerce.productName(),
      desc: faker.commerce.productDescription(),
      reviewCount: faker.number.bigInt({ min: 2000, max: 10000 }).toString(),
      price: {
        display: currencyFormat.format(price),
        value: price,
      },
    };
  });

  return (
    <div className='w-72 h-full min-h-[525px] bg-neutral-600 rounded-3xl self-stretch'>
      <div className='h-12 w-full px-8 py-4 flex flex-row items-center gap-2'>
        <div className='w-10 h-12 p-2 flex items-center justify-center bg-yellow-600 rounded-b-full -mt-1'>
          <h2 className='text-center text-xl font-bold text-white'>0{rank}</h2>
        </div>
        <div className='h-full w-full flex flex-row items-center gap-1'>
          <img src={crown} alt='crown icon' />
          <p className='text-yellow-600 text-xs w-28'>
            1.4k purchased in the last 30 days
          </p>
        </div>
      </div>
      <div className='w-full h-full px-8 pt-2'>
        <div className='w-full'>
          <img
            src={macbook}
            alt='product image'
            className='w-44 h-44 mx-auto'
          />
        </div>
        <div className='w-full h-auto flex flex-col gap-4 pt-2 pb-4'>
          <h4 className='text-[#777777] truncate text-ellipsis'>{productDetail.brand}</h4>
          <h1 className='text-[20px] leading-6 font-bold text-white pt-1 h-24 truncate text-wrap text-ellipsis'>
            {productDetail.name}
          </h1>
          <div className='w-full h-fit flex flex-row gap-2 items-center'>
            <div className='w-fit h-fit flex flex-row'>
              {[1, 2, 3, 4, 5].map((vx) => (
                <img
                  key={"star" + vx}
                  src={star}
                  alt='star'
                  className='w-6 h-6'
                />
              ))}
            </div>
            <p className='text-sm text-[#777777]'>
              {productDetail.reviewCount}
            </p>
          </div>
          <div className='w-fit h-fit flex flex-row gap-2 items-center'>
            <span className='text-xl'>{productDetail.price.display}</span>
            <span className='h-5 px-2 rounded-full bg-red-100 text-red-500 my-auto leading-tight'>
              20% Off
            </span>
            <span>
              <img src={primeBadge} alt='prime badge' />
            </span>
          </div>
          <button
            onClick={(_) =>
              addItem({
                desc: productDetail.desc,
                name: productDetail.name,
                price: Number(productDetail.price.value),
                qty: 1,
              })
            }
            className='w-full flex flex-row items-center justify-center gap-2 p-2 rounded-full bg-green-500 font-bold mt-auto text-white'
          >
            <span>View Product</span>
            <img src={chvron} alt='' />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
