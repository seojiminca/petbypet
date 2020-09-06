import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductList = () => {
  const [data, setData] = useState({ products: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:5000/products");
      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <main className='p-4'>
      <ul className='grid grid-cols-1 gap-6'>
        {data.products.map((item) => (
          <Link
            to={{
              pathname: `/productdetail/${item.name}`,
              state: {
                productId: item._id,
              },
            }}
          >
            <li key={item._id} className='grid grid-cols-2 h-50'>
              <img className='rounded h-50 w-auto' src={item.image} />

              <div className='p-4'>
                <h6 className='text-gray-500'>{item.brand}</h6>
                <h3>{item.name}</h3>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </main>
  );
};
export default ProductList;
