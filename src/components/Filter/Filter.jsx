import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from '../redux/phonebookSlice/phonebookSlice';

import css from 'components/Filter/Filter.module.css';
import sprite from '../../img/sprites.svg';

const Filter = () => {
  let query = useSelector(state => state.phonebook.filter);
  const contacts = useSelector(state => state.phonebook.contacts.items);
  const dispatch = useDispatch();

  return (
    contacts.length > 0 && (
      <>
        <label className={css['label']}>
          <span> Find contacts by name: </span>
          <div className={css['filter-input__wrapper']}>
            <input
              className={css['input']}
              name="name"
              type="text"
              value={query}
              onChange={e => dispatch(updateFilter(e.target.value))}
            />
            {query && (
              <button
                type="button"
                className={css['inline-btn']}
                onClick={() => dispatch(updateFilter(''))}
              >
                <svg className={css['svg-icon']} width="20" height="20">
                  <use href={sprite + `#icon-filter_list_off`}></use>
                </svg>
              </button>
            )}
          </div>
        </label>
      </>
    )
  );
};

export default Filter;
