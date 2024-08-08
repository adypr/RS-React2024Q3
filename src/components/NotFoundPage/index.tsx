import React from 'react';
import styles from './NotFound.module.scss';

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles['not-found']}>
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFoundPage;
