import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductItem from '../components/ProductItem';

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchProducts = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/product/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, [location.search]);

  const onShowMoreClick = async () => {
    const numberOfProducts = products.length;
    const startIndex = numberOfProducts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/product/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setProducts([...products, ...data]);
  };
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
          Search results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && products.length === 0 && (
            <p className='text-xl text-slate-700'>No Item found!</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              Loading...
            </p>
          )}

          {!loading &&
            products &&
            products.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-green-700 hover:underline p-7 text-center w-full'
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}