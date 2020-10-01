import React, { FC } from 'react';
import styled from 'styled-components';
import { List } from '@material-ui/core';
import { IProduct } from '../api/products';
import Price from '../../../components/checkout/Price';
import ChooseButton from '../../../components/checkout/ChooseButton';
import { Card, CardSection } from '../../../components/checkout/Card';

interface IProps {
  products: IProduct[];
  selectedProduct?: IProduct | null;
  onSelection: (product: IProduct) => void;
}

const ProductsList = styled(List)``;

const Product = styled(Card)`
  height: 450px !important;
`;

const ProductImage = styled.img`
  width: 100%;
  max-height: 200px;
`;

const ProductCategory = styled(CardSection)`
  color: #b4b4b4 !important;
  font-size: 12px;
  font-weight: 300;
  height: 20px;
`;

const ProductName = styled(CardSection)`
  font-size: 18px;
  font-weight: 600;
  height: 50px;
`;

const ProductPrice = styled(CardSection)`
  margin-top: 15px;
  font-size: 11px;
  font-weight: 400;
  flex-direction: column;
  height: 60px;
`;

const ValueFrom = styled(CardSection)``;

const ListProducts: FC<IProps> = ({
  products,
  selectedProduct,
  onSelection,
}: IProps) => {
  const handleClick = (product: IProduct) => () => {
    onSelection(product);
  };

  return (
    <ProductsList>
      {products.map((product) => {
        const isSelected = product.id === selectedProduct?.id;
        return (
          <Product
            button
            onClick={handleClick(product)}
            key={product.id}
            selected={isSelected}
          >
            <ProductImage src={product.imageUrl} alt={product.name} />
            <ProductCategory>{product.category}</ProductCategory>
            <ProductName>{product.name}</ProductName>
            <ProductPrice>
              <ValueFrom> A partir de</ValueFrom>
              <Price value={product.price} />
            </ProductPrice>
            <ChooseButton isSelected={isSelected}>
              {isSelected ? 'Selecionado' : 'Selectionar'}
            </ChooseButton>
          </Product>
        );
      })}
    </ProductsList>
  );
};

export default ListProducts;