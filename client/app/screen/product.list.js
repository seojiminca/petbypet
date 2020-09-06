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
      <ul className='grid grid-cols-3 gap-6'>
        {data.products.map((item) => (
          <li key={item._id} className='h-50'>
            <Link to={`/productdetail/${item._id}`}>
              <div>
                <img
                  className='rounded'
                  src='https://catlifetoday.com/wp-content/uploads/2019/05/dry-cat-food.jpg'
                ></img>
                <h3 className='text-center'>{item.name}</h3>
                <h6 className='text-center text-gray-500'>{item.brand}</h6>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};
export default ProductList;
