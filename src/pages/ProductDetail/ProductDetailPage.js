import React from "react";
import ProductDetails from "../../features/ProductList/ProductDetails";
import Navbar from "../../features/Navbar/Navbar";

function ProductDetailPage() {
  return (
    <div>
      <Navbar>
        <ProductDetails></ProductDetails>
      </Navbar>
    </div>
  );
}

export default ProductDetailPage;
