import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Cart.css";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/cart", {
          params: { userId }
        });

        if (res.status === 200) {
          setCartItems(res.data.items);
          setLoading(false);
        }
      } catch (err) {
        console.log("Error fetching cart", err);
      }
    };

    if (userId) fetchCart();
  }, [userId]);

  return (
    <div className="container mt-4">
      <h2>My Cart</h2>

      {loading ? (
        <p>Loading...</p>
      ) : cartItems.length === 0 ? (
        <p>Your cart is empty 🛒</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-3">
          {cartItems.map((item) => (
            <div className="col" key={item._id}>
              <div className="card p-3">
                <h5>{item.product.name}</h5>
                <p><b>Price:</b> ₹{item.product.price}</p>
                <p><b>Quantity:</b> {item.quantity}</p>
                <p><b>Total:</b> ₹{item.product.price * item.quantity}</p>
                <p><b><button onClick={()=>deleteProduct(i._id)} className='btn btn-danger'>Remove</button></b></p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
