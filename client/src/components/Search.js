import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = e => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/shop/search/${keyword}`);
    } else {
      history.push('/shop');
    }
  };
  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search Products"
      ></Form.Control>
      <Button type="submit" varaint="outliner-success" className="p-2">
        Search
      </Button>
    </Form>
  );
};

export default Search;
