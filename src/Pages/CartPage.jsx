import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../Auth-DB/FireBase";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  Heart,
  Star,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartJSON = localStorage.getItem("cart");
      const cart = cartJSON ? JSON.parse(cartJSON) : {};

      const codesInCart = Object.keys(cart).map(Number); // convert keys to numbers

      if (codesInCart.length === 0) {
        setCartItems([]); // Empty cart
        return;
      }

      try {
        const productsRef = collection(db, "Products");
        const data = await getDocs(productsRef);
        const products = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        const items = products
          .filter((product) => codesInCart.includes(product.code))
          .map((product) => ({
            ...product,
            quantity: cart[product.code]?.quantity || 1,
          }));

        setCartItems(items);
      } catch (error) {
        console.log("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const updateQuantity = (code, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((items) =>
      items.map((item) =>
        item.code === code ? { ...item, quantity: newQuantity } : item
      )
    );

    // Update localStorage
    const cartJSON = localStorage.getItem("cart");
    const cart = cartJSON ? JSON.parse(cartJSON) : {};
    if (cart[code]) {
      cart[code].quantity = newQuantity;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setIsPromoApplied(true);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-700 border-green-200";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Advanced":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = isPromoApplied ? subtotal * 0.1 : 0;
  const shipping = 40;
  const total = subtotal - discount + shipping;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Shopping Cart
              </h1>
              <p className="text-gray-600 mt-1">
                {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
              </p>
            </div>
            <button
              onClick={() => navigate("/product")}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length === 0 ? (
          // Empty Cart State
          <div className="bg-white rounded-lg shadow-sm p-16 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any electronics components to your
              cart yet. Start building your next project!
            </p>
            <button
              onClick={() => navigate("/product")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto"
            >
              <ShoppingBag className="h-5 w-5" />
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cart Items Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Cart Items
                </h2>
                <button
                  onClick={() => {
                    localStorage.removeItem("cart");
                    window.location.reload();
                  }}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear Cart
                </button>
              </div>

              {/* Cart Items List */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0 relative">
                        <img
                          src={
                            item.img || "/placeholder.svg?height=96&width=96"
                          }
                          alt={item.name}
                          className="h-24 w-24 object-cover rounded-lg border"
                        />
                        <button
                          onClick={() => removeItem(item.id)}
                          className="absolute -top-2 -right-2 h-6 w-6 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="h-3 w-3 text-red-600" />
                        </button>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                              {item.description}
                            </p>

                            <div className="flex items-center space-x-3 mb-3">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                                  item.difficulty
                                )}`}
                              >
                                {item.difficulty}
                              </span>
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium">
                                  {item.rating}
                                </span>
                                <span className="text-sm text-gray-500">
                                  ({item.reviews})
                                </span>
                              </div>
                              <span className="text-sm text-gray-500">
                                Code: {item.code}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Quantity and Price Controls */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium text-gray-700">
                              Quantity:
                            </span>
                            <div className="flex items-center border rounded-lg">
                              <button
                                onClick={() =>
                                  updateQuantity(item.code, item.quantity - 1)
                                }
                                disabled={item.quantity <= 1}
                                className="h-8 w-8 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) =>
                                  updateQuantity(
                                    item.id,
                                    Number.parseInt(e.target.value) || 1
                                  )
                                }
                                className="w-16 text-center border-0 focus:ring-0 h-8"
                                min="1"
                              />
                              <button
                                onClick={() =>
                                  updateQuantity(item.code, item.quantity + 1)
                                }
                                className="h-8 w-8 flex items-center justify-center hover:bg-gray-50"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-lg font-bold text-blue-600">
                              {item.price * item.quantity}₹
                            </div>
                            <div className="text-sm text-gray-500">
                              {item.price}₹ each
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recommended Products */}
              <div className="bg-white rounded-lg shadow-sm border p-6 mt-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  You might also like
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      name: "LED Circuit Basics Pack",
                      price: 34.99,
                      image: "/placeholder.svg?height=80&width=80",
                      rating: 4.6,
                    },
                    {
                      name: "Motor Control System Kit",
                      price: 119.99,
                      image: "/placeholder.svg?height=80&width=80",
                      rating: 4.5,
                    },
                  ].map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="h-12 w-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{product.name}</h4>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-blue-600 font-semibold">
                            ${product.price}
                          </span>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs ml-1">
                              {product.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                {/* Promo Code */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold mb-4">Promo Code</h3>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {isPromoApplied && (
                    <div className="mt-2 text-sm text-green-600 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Promo code applied! 10% discount
                    </div>
                  )}
                  <div className="mt-2 text-xs text-gray-500">
                    Try "SAVE10" for 10% off
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Subtotal ({totalItems} items)
                      </span>
                      <span className="font-medium">
                        {subtotal.toFixed(2)}₹
                      </span>
                    </div>

                    {isPromoApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount (10%)</span>
                        <span>-${discount.toFixed(2)}₹</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? (
                          <span className="text-green-600">FREE</span>
                        ) : (
                          `${shipping.toFixed(2)}₹`
                        )}
                      </span>
                    </div>

                    {shipping === 0 && (
                      <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
                        🎉 You qualify for free shipping!
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-blue-600">{total.toFixed(2)}₹</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-6">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                      Proceed to Checkout
                    </button>

                    <div className="text-center">
                      <button
                        className="text-blue-600 hover:underline font-medium"
                        onClick={() => navigate("/product")}
                      >
                        Continue Shopping
                      </button>
                    </div>
                  </div>

                  {/* Security Badge */}
                  <div className="pt-4 border-t mt-6">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                      <ShieldCheck className="h-4 w-4 text-green-500" />
                      <span>Secure Payment by RazerPay</span>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-3">We accept</p>
                    <div className="flex justify-center space-x-2">
                      {["UPI", "Credit/Debit", "Net Banking"].map((method) => (
                        <div
                          key={method}
                          className="px-2 h-6 bg-gray-200 rounded flex items-center justify-center"
                        >
                          <span className="text-xs font-bold text-gray-600">
                            {method}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default CartPage;
