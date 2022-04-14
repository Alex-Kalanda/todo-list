import React from 'react';
import styles from './TodoPage.module.css';
import Header from '../../layout/Header/Header';
import { useParams } from 'react-router-dom';
import useTodoData from '../../hooks/useTodoData';
import { Preloader } from '../../components_common';
import PageContent from './components/PageContent';

const TodoPage = () => {
  const { id = '0' } = useParams();
  const todo = useTodoData({ id });

  return (
    <>
      <Header />
      <div className={styles.container}>
        <aside className={styles.aside} />
        {todo ? <PageContent {...todo} /> : <Preloader />}
      </div>
    </>
  );
};

export default TodoPage;
