import css from "./AddContact.module.css";

const AddContact = ( {onSubmit: handleSubmit} ) => {
    let name = "";
    let number = "";
  //  console.dir(props)
    return (
        <form className={css["form"]} onSubmit={handleSubmit}>
        <label className={css["label"]}>
          <span> Name </span>
          <input
            className={css["input"]}
            name="name"
            type="text"
            required
         //   value={name}
            // onChange={this.handleNameChange}
          />
        </label>
        <label className={css["label"]}>
          <span> Number </span>
          <input
            className={css["input"]}
            type="tel"
            name="number"
         //   value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
         //   onChange={this.handlePhoneNumberChange}
          />
        </label>
        <button
          className={css["btn"]}
          type="submit"
        //  onSubmit={onSubmit}
        >
          Add contact
        </button>
      </form>
    )
}

export default AddContact;