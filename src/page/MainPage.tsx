import React, { useEffect, useState } from 'react';
import EmptyCard from './components/EmptyCard/EmptyCard';
import styles from './MainPage.module.css';
import { TodoResponse, TodoCardProps, TodoData } from './components/Card/TodoCard.props';
import TodoCard from './components/Card/TodoCard';
import axios, { AxiosResponse } from 'axios';
import { CreateTodoButtonNew, Preloader } from '../components_common';
import Modal from '../components_common/Modal/Modal';
import { FieldValues } from 'react-hook-form';
import FormEditTodo from './components/form/FormEditTodo';
import FormCreateTodo from './components/form/FormCreateTodo';

const MainPage = () => {
  const [todos, setTodos] = useState<TodoCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalActive, setModalActive] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [editTodo, setEditTodo] = useState({ id: '', title: '', description: '', status: '' });

  const getTodos = () => {
    axios
      .get(`${process.env.REACT_APP_TODO_ENDPOINT}`)
      .then((response: AxiosResponse) => {
        if (response.data) {
          setTodos(response.data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getTodos();
  }, []);

  const handlerOnDelete = (id: string) => {
    axios({
      url: process.env.REACT_APP_TODO_ENDPOINT,
      method: 'delete',
      params: {
        'Content-Type': 'application/json',
      },
      data: { id: id },
    })
      .then((resp) => {
        setTodos(resp.data);
      })
      .catch((error) => {
        throw error;
      });
  };

  const handlerOnOpenEditModal = (todo: TodoData) => {
    setEditTodo(todo);
    setEditMode(true);
    setModalActive(true);
  };

  const handlerOnUpdate = (data: FieldValues) => {
    console.log(data);
    axios({
      url: process.env.REACT_APP_TODO_ENDPOINT,
      method: 'patch',
      params: {
        'Content-Type': 'application/json',
      },
      data: {
        id: editTodo?.id,
        ...data,
      },
    })
      .then((resp) => {
        if (resp.statusText === 'OK') {
          getTodos();
        }
        setEditMode(false);
        setModalActive(false);
      })
      .catch((error) => {
        throw error;
      });
  };

  const handlerOnSubmit = (data: FieldValues) => {
    console.log(data);
    axios({
      url: process.env.REACT_APP_TODO_ENDPOINT,
      method: 'post',
      params: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
      data: data,
    })
      .then((resp) => {
        setTodos([...todos, resp.data]);
        setModalActive(false);
      })
      .catch((error) => {
        throw error;
      });
  };

  const handleOnCloseModal = () => {
    setModalActive(false);
    setEditMode(false);
  };

  const todoList = todos.map((todo: TodoResponse) => {
    return <TodoCard key={todo.id} onDelete={handlerOnDelete} onOpenEditModal={handlerOnOpenEditModal} {...todo} />;
  });

  const content = (
    <main className={styles.page}>
      {todos.length === 0 ? <EmptyCard /> : todoList}
      <CreateTodoButtonNew
        className={styles.page__button}
        onClick={() => {
          setModalActive(true);
        }}
      />
      <Modal isActive={isModalActive} setActive={setModalActive}>
        {isEditMode ? (
          <FormEditTodo editValues={editTodo} onUpdate={handlerOnUpdate} onClose={handleOnCloseModal} />
        ) : (
          <FormCreateTodo onSubmit={handlerOnSubmit} onClose={handleOnCloseModal} />
        )}
      </Modal>
    </main>
  );

  return isLoading ? <Preloader /> : content;
};

export default MainPage;
