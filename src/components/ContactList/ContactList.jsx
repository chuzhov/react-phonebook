const ContactList = ( {contacts} ) => {
    return (
        <ul>
            {contacts.map(el=><li key={el.id}>{el.name}</li>)}
        </ul>
    )
}

export default ContactList;