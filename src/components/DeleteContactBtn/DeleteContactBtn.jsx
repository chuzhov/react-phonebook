import PropTypes from 'prop-types';
import css from './DeleteContactBtn.module.css';
import sprite from '../../img/sprites.svg';

const DeleteContactBtn = ({ id, onDelete }) => {
  return (
    <button id={id} className={css['del-btn']} onClick={onDelete}>
      <svg className={css['svg-icon']} width="20" height="20">
        <use href={sprite + `#icon-delete`}></use>
      </svg>
    </button>
  );
};

DeleteContactBtn.propTypes = {
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteContactBtn;
