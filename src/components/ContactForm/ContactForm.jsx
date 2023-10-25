import { Component } from 'react';
import { nanoid } from 'nanoid';
import { StyledContactForm, StyledButton } from './StyledContactForm';
import PropTypes from 'prop-types';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleOnSubmit = e => {
    e.preventDefault();

    const { name, number } = this.state;
    const { handleAddContacts } = this.props;

    const isNameExists = this.props.contacts.some(
      contact => contact.name === name
    );

    if (isNameExists) {
      alert(`${name} is already in contacts`);
      return;
    }

    handleAddContacts({ id: nanoid(), name, number });
    this.setState({ name: '', number: '' });
  };

  handleOnInputChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    const { name, number } = this.state;
    return (
      <>
        <StyledContactForm onSubmit={this.handleOnSubmit}>
          <label htmlFor="nameContact">Name</label>
          <input
            type="text"
            name="name"
            id="nameContact"
            value={name}
            required
            placeholder="Enter name"
            onChange={this.handleOnInputChange}
          />

          <label htmlFor="phoneContact">Phone</label>
          <input
            type="tel"
            name="number"
            id="phoneContact"
            value={number}
            required
            placeholder="Enter phone"
            onChange={this.handleOnInputChange}
          />

          <StyledButton type="submit">Add contact</StyledButton>
        </StyledContactForm>
      </>
    );
  }
}

export default ContactForm;

ContactForm.propTypes = {
  handleAddContacts: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};
