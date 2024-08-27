import React from "react";

function PageHeader({ title }: { title: string }) {
  return (
    <div className='w-full h-fit max-w-xl py-8 px-4 border-b-[1.5px] border-white'>
      <h1 className='text-white font-medium text-lg'>{title}</h1>
    </div>
  );
}

export default PageHeader;
