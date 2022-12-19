import PropTypes from 'prop-types';
import DeleteContactBtn from "components/DeleteContactBtn/DeleteContactBtn"
import css from "./ContactList.module.css"

const ContactList = ( {contacts, onDelete} ) => {
    return (
        contacts.length ?
            <ul className={css["list"]}>
                {contacts.map(el=><li key={"li"+el.id} className={css["item"]}>
                    <p>{el.name}  <span className={css["phone-number"]}>{el.number}</span></p>
                    <DeleteContactBtn key={"DCB"+el.id} id={el.id} onDelete={onDelete}/>  
                </li>)}
            </ul>
        :
            <p>There aren't contacts here...</p>
    )   
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        })
    ),
    onDelete: PropTypes.func.isRequired,
}

export default ContactList;