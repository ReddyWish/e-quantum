import React from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Paginate from '../../components/Paginate';
import { useParams, useNavigate } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from '../../slices/productsApiSlice'

function ProductListPage(props) {
  const { pageNumber } = useParams();

  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useGetProductsQuery({ pageNumber });

  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation()

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete the product?')) {
      try {
        await deleteProduct(id);
        toast.success('Product deleted.')
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create new product?')) {
      try {
        const res = await createProduct().unwrap();
        console.log(res._id)
        refetch();
        navigate(`/admin/product/${res._id}/edit`)
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <Button className='btn-sm m-3' onClick={createProductHandler}>
            <FaEdit/> Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader/>}
      {loadingDelete && <Loader/>}
      {isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
        <>
          <Table striped hover responsive className='table-sm'>
            <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {data.products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm mx-2'>
                      <FaEdit/>
                    </Button>
                  </LinkContainer>
                  <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                    <FaTrash style={{ color: 'white' }}/>
                  </Button>
                </td>
              </tr>
            ))}
            </tbody>
          </Table>
          <Paginate pages={data.pages} page={data.page} isAdmin={true}/>
        </>
      )}
    </>
  );
}

export default ProductListPage;