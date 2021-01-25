import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Pagination } from 'react-bootstrap';

const Paginate = ({
  pages,
  page,
  isAdmin = false,
  keyword = '',
  category = false,
  id = ''
}) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map(i => (
          <LinkContainer
            key={i + 1}
            to={
              !isAdmin
                ? !category
                  ? keyword
                    ? `/shop/search/${keyword}/page/${i + 1}`
                    : `/shop/page/${i + 1}`
                  : `/shop/category/${id}/page/${i + 1}`
                : `/admin/productlist/page/${i + 1}`
            }
          >
            <Pagination.Item active={i + 1 === page}>{i + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
