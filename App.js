import React, { useState } from 'react';
import Layout from './components/Layout/Layout';

export default function App() {
  const [page, setPage] = useState('landing');

  const changePage = page => {
    return setPage(page);
  }

  return (
    <Layout
      page={page}
      changePage={changePage}
    />
  );
}