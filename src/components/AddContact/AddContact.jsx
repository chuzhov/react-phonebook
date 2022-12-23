import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './AddContact.module.css';
import sprite from '../../img/sprites.svg';

class AddContact extends Component {
  state = {
    name: '',
    number: '',
  };

  onChangeHandler = event => {
    this.setState(() => {
      return { [event.target.name]: event.target.value };
    });
  };
  onSubmitHandler = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.name, this.state.number);
    this.setState(() => {
      return { name: '', number: '' };
    });
  };

  render() {
    return (
      <form className={css['form']} onSubmit={this.onSubmitHandler}>
        <label className={css['label']}>
          <span> Name: </span>
          <div className={css['input-wrapper']}>
            <input
              className={css['input']}
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.onChangeHandler}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
            {this.state.name && (
              <button
                type="button"
                className={css['inline-btn']}
                onClick={() => this.setState({ name: '' })}
              >
                <svg className={css['svg-icon']} width="20" height="20">
                  <use href={sprite + `#icon-close`}></use>
                </svg>
              </button>
            )}
          </div>
        </label>
        <label className={css['label']}>
          <span> Number: </span>
          <div className={css['input-wrapper']}>
            <input
              className={css['input']}
              type="tel"
              name="number"
              value={this.state.number}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={this.onChangeHandler}
            />
            {this.state.number && (
              <button
                type="button"
                className={css['inline-btn']}
                onClick={() => this.setState({ number: '' })}
              >
                <svg className={css['svg-icon']} width="20" height="20">
                  <use href={sprite + `#icon-close`}></use>
                </svg>
              </button>
            )}
          </div>
        </label>

        <button className={css['btn']} type="submit">
          <svg className={css['svg-icon']} width="24" height="24">
            <use href={sprite + `#icon-person_add`}></use>
          </svg>
        </button>
      </form>
    );
  }
}

AddContact.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AddContact;
