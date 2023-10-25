import { nanoid } from 'nanoid';
import { StyledContactList, StyledButton } from './StyledContactList';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <StyledContactList>
      {contacts.map(contact => (
        <li key={nanoid()}>
          {contact.name}: {contact.number}
          <StyledButton onClick={() => onDeleteContact(contact.id)}>
            Delete
          </StyledButton>
        </li>
      ))}
    </StyledContactList>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
