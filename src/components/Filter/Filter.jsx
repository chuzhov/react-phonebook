import PropTypes from 'prop-types';
import css from 'components/Filter/Filter.module.css';
import sprite from '../../img/sprites.svg';

const Filter = ({ searchString, getName }) => {
  const onChangeHandler = event => {
    if (event.target.value !== searchString) getName(event.target.value);
  };

  return (
    <>
      <label className={css['label']}>
        <span> Find contacts by name: </span>
        <div className={css['filter-input__wrapper']}>
          <input
            className={css['input']}
            name="name"
            type="text"
            value={searchString}
            onChange={onChangeHandler}
          />
          {searchString && (
            <button
              type="button"
              className={css['inline-btn']}
              onClick={() => getName('')}
            >
              <svg className={css['svg-icon']} width="20" height="20">
                <use href={sprite + `#icon-filter_list_off`}></use>
              </svg>
            </button>
          )}
        </div>
      </label>
    </>
  );
};

Filter.propTypes = {
  searchString: PropTypes.string.isRequired,
  getName: PropTypes.func.isRequired,
};

export default Filter;
