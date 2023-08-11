import React from 'react';
import { Col, Row, Card } from 'antd';
import { useGetProductsQuery } from '../api/productApi'; // Thay đổi đường dẫn đúng
import { Link } from 'react-router-dom';

const { Meta } = Card;

const ProductPage = () => {
  const { data: productData, isLoading, isError } = useGetProductsQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading products.</p>;
  }

  return (
    <div>

      <Row>
        <Col span={18} push={6}>
          <Row gutter={[16, 16]}>
            {productData.map((product) => (
              <Col key={product.id} span={6}>
                <Link to={`/product/${product.id}`}>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt={product.name} src={product.image} />}
                >
                  <Meta title={product.name} description={product.desc} />
                </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
        <Col span={6} pull={18}>
          col-6 col-pull-18
        </Col>
      </Row>
    </div>
  );
};

export default ProductPage;
