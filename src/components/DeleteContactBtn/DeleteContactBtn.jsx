import css from "./DeleteContactBtn.module.css"

const Button = ({ id, onDelete }) => {  
    return <button id={id} className={css["del-btn"]} onClick={onDelete}>
        Delete
  </button>
}

export default Button;