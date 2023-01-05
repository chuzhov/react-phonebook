import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { toggleIsFavorite } from 'components/redux/phonebookSlice/phonebookSlice';

import css from './StarBtn.module.css';
import sprite from '../../img/sprites.svg';

const StarBtn = ({ id, isFavorite }) => {
  const dispatch = useDispatch();

  return (
    <button
      type="button"
      className={css['favorite-button']}
      onClick={e => dispatch(toggleIsFavorite(id))}
    >
      <svg
        className={isFavorite ? css['svg-icon is-starred'] : css['svg-icon']}
        width="20"
        height="20"
      >
        <use href={sprite + `#icon-star`}></use>
      </svg>
    </button>
  );
};
export default StarBtn;

StarBtn.propTypes = {
  id: PropTypes.string.isRequired,
  isStarred: PropTypes.bool.isRequired,
};
