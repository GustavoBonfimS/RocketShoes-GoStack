import React, { useEffect, useState } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';
import api from '../../services/api';
import { formatPrice } from '../../util/format';

function Home({ addToCart }) {
  const [products, setProducts] = useState([]);

  function handleAddProduct(product) {
    addToCart(product);
  }

  useEffect(() => {
    async function getProducts() {
      const { data } = await api.get('/products');
      const formatedProducts = data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));
      setProducts(formatedProducts);
    }
    getProducts();
  }, []);
  return (
    <ProductList>
      {products.map(product => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>T{product.title}</strong>
          <span>{product.priceFormatted}</span>

          <button type="button" onClick={() => handleAddProduct(product)}>
            <div>
              <MdAddShoppingCart size={16} color="#fff" /> 3
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}

Home.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(null, mapDispatchToProps)(Home);
