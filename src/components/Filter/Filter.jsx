import { Component } from 'react';
import PropTypes from 'prop-types';
import css from 'components/Filter/Filter.module.css';

class Filter extends Component {
  state = { name: '' };

  onChangeHandler = event => {
    const value = event.target.value;
    if (value !== this.state.name) {
      this.setState({ name: value });
      this.props.getName(value);
    }
  };

  render() {
    return (
      <label className={css['label']}>
        <span> Find contacts by name: </span>
        <input
          className={css['input']}
          name="name"
          type="text"
          value={this.state.name}
          onChange={this.onChangeHandler}
        />
      </label>
    );
  }
}

Filter.propTypes = {
  getName: PropTypes.func.isRequired,
};

export default Filter;
