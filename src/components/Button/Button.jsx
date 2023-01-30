import propTypes from 'prop-types';
import s from './Button.module.css';

export const Button = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className={s.button}>
      {' '}
      Load more{' '}
    </button>
  );
};

Button.propTypes = {
  onClick: propTypes.func.isRequired,
};
