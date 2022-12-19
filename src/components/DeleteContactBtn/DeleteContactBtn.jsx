import PropTypes from 'prop-types';
import css from "./DeleteContactBtn.module.css"

const DeleteContactBtn = ({ id, onDelete }) => {  
    return <button id={id} className={css["del-btn"]} onClick={onDelete}>
        Delete
  </button>
}

DeleteContactBtn.propTypes = {
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default DeleteContactBtn;