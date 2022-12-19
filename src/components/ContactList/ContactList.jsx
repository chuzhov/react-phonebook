import PropTypes from 'prop-types';
import DeleteContactBtn from "components/DeleteContactBtn/DeleteContactBtn"

const ContactList = ( {contacts, onDelete} ) => {
    return (
        contacts.length ?
            <ul>
                {contacts.map(el=><li key={"li"+el.id}>
                    <p>{el.name}  <span>{el.number}</span>
                        <DeleteContactBtn key={"DCB"+el.id} id={el.id} onDelete={onDelete}/>
                    </p>
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