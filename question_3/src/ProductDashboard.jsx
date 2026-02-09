import React, { useState } from "react";

const productsData = [
  { id: 1, name: "Mobile", price: 15000 },
  { id: 2, name: "Fridge", price: 10000 },
  { id: 3, name: "AC", price: 30000 },
];

function ProductDashboard() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const toggleCart = (product) => {
    const isInCart = cart.find((item) => item.id === product.id);

    if (isInCart) {
      setCart(cart.filter((item) => item.id !== product.id));
      setTotal(total - product.price);
    } else {
      setCart([...cart, product]);
      setTotal(total + product.price);
    }
  };

  const isProductInCart = (id) => {
    return cart.some((item) => item.id === id);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>🛒 Product Dashboard</h1>

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price (₹)</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {productsData.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <button onClick={() => toggleCart(product)}>
                  {isProductInCart(product.id)
                    ? "Remove from Cart"
                    : "Add to Cart"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: "20px" }}>
        Total Cart Value: ₹{total}
      </h2>
    </div>
  );
}

export default ProductDashboard;
