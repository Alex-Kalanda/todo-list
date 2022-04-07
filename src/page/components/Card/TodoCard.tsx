import React from 'react';
import { TodoCardProps } from './TodoCard.props';
import styles from './TodoCard.module.css';
import cn from 'classnames';
import { TodoStatus } from '../../../enums/enums';
import { DeleteTodoButton } from '../../../components_common';

const TodoCard = (props: TodoCardProps): JSX.Element => {
  const { id, title, description, status, onDelete } = props;

  const cardStyles = cn(styles.card, {
    [styles.completed]: status === TodoStatus.completed,
    [styles.inProgress]: status === TodoStatus.inProgress,
    [styles.planned]: status === TodoStatus.planned,
  });

  return (
    <div className={cardStyles}>
      <DeleteTodoButton
        className={styles.deleteButton}
        onClick={() => {
          onDelete(id);
        }}
      />
      <div>Title: {title}</div>
      <div>Description: {description}</div>
    </div>
  );
};

export default TodoCard;
