import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './AddContact.module.css';

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
          <span> Name </span>
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
        </label>
        <label className={css['label']}>
          <span> Number </span>
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
        </label>
        <button className={css['btn']} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

AddContact.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AddContact;
