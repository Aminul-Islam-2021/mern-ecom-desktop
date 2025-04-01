import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../../store/features/products/productApi";
import { setKeyword } from "../../store/features/products/filterSlice";
import { debounce } from "lodash";

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { keyword } = useSelector((state) => state.filters);
  const { data: products, isFetching } = useGetProductsQuery(
    query ? { keyword: query, limit: 10 } : {},
    { skip: !query }
  );
  const debouncedSearch = useCallback(
    debounce((input) => {
      dispatch(setKeyword(input));
      setQuery(input);
      setShowSuggestions(true);
    }, 300),
    [dispatch]
  );

  useEffect(() => {
    setQuery(keyword);
  }, [keyword]);

  useEffect(() => {
    if (products?.product?.length) {
      const matched = products.product.filter(
        (p) =>
          p.title.toLowerCase().startsWith(query.toLowerCase()) ||
          p.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())) // Match tags
      );
      setFilteredProducts(matched);
    } else {
      setFilteredProducts([]);
    }
  }, [products, query]);
  const handleChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?keyword=${query}`);
      setShowSuggestions(false);
    }
  };

  const handleSelectProduct = (productId, productData) => {
    navigate(`/products/${productId}`, { state: { products: productData } });
    setQuery("");
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (!filteredProducts.length) return;
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) =>
        prev < filteredProducts.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredProducts.length - 1
      );
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      handleSelectProduct(filteredProducts[selectedIndex]._id);
    }
  };

  return (
    <>
      <div className="w-full flex items-center border border-gray-300 rounded-md p-2 mt-3 lg:mt-0 lg:mr-24 lg:flex-grow">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-36 lg:w-72 pl-6 flex-grow outline-none"
          placeholder="Search..."
        />
        <button
          onClick={handleSearch}
          className="px-2 border border-gray-300 rounded-md cursor-pointer"
        >
          Search
        </button>
        {showSuggestions && query && (
          <ul className="absolute w-[80%] md:w-[40%] bg-white text-gray-700 shadow-lg rounded-lg top-24 md:top-16 overflow-hidden">
            {isFetching ? (
              <li className="flex items-center justify-center p-4"></li>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <li
                  key={product._id}
                  className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 transition-all ${
                    selectedIndex === index ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleSelectProduct(product._id, product)}
                >
                  <img
                    src={product.images[0].secure_url}
                    alt={product.title}
                    className="w-10 h-10 rounded-md object-cover mr-3"
                  />
                  <span
                    dangerouslySetInnerHTML={{
                      __html: product.title.replace(
                        new RegExp(`^(${query})`, "gi"),
                        (match) => `<b class="text-blue-500">${match}</b>`
                      ),
                    }}
                    className="text-gray-700 pr-12"
                  />
                  <p className="font-semibold text-md">TK: {product.price}</p>
                </li>
              ))
            ) : (
              <li className="p-4 text-gray-500 text-center">
                No products found
              </li>
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default SearchBar;
