import Navbar from "../components/navbar";
import PageHeader from "../components/pageHeader";
import ProductCard from "../components/productCard";

function App() {
  return (
    <div className='w-full max-w-screen-xl h-fit mx-auto px-8'>
      <PageHeader title='Product List' />
      <div className='w-full h-fit pt-8 grid grid-flow-col gap-4 justify-evenly items-start'>
        {[1, 2, 3].map((v) => {
          return <ProductCard key={v} rank={v} />;
        })}
      </div>
    </div>
  );
}

export default App;
