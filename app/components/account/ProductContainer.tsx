


const ProductContainer = () =>{
    return (
        <div className="flex p-4 border border-gray-300 rounded bg-white w-96 h-44">
            {/* Product Description */}
            <div className="ml-4 ">
                <h2 className="text-xl font-bold">Product Name</h2>
                <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu
                    sapien vel est blandit bibendum eu vel metus. Sed nec facilisis elit.
                </p>
                <p className="text-gray-800 font-bold mt-2">$19.99</p>
            </div>

            {/* Product Image */}
            <div className="flex-shrink-0">
                <img
                    src="" // Replace with the actual image URL
                    alt="Product"
                    className="w-32 h-32 object-cover rounded"
                />
            </div>
        </div>
    );
}

export default ProductContainer;