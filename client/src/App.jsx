import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Search from './pages/Search';
import Footer from './components/Footer';
import Users from './pages/Users';
import User from './pages/User';
import Carts from './pages/Carts';
import Checkout from './pages/Checkout';
import AdminRoute from './components/AdminRoute';
import Products from './pages/Products';
import CreateProduct from './pages/CreateProduct';
import UpdateProduct from './pages/UpdateProduct';
import Product from './pages/Product';

export default function App() {
  return (
    <BrowserRouter>
      <div
      style={{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        minHeight:'100vh'
      }}
      >
        <div>
        <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/search' element={<Search />} />
        <Route path='/product/:productId' element={<Product />} />

        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-product' element={<CreateProduct />} />
          <Route
            path='/update-product/:productId'
            element={<UpdateProduct />}
          />
          <Route path='/carts' element={<Carts />
          }
          />
          <Route path='/checkout' element={<Checkout />
          }
          />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path='/admin/products' element={<Products />} />
          <Route path='/admin/users' element={<Users />} />
          <Route path='/admin/user/:userId' element={<User />} />
        </Route>
      </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}