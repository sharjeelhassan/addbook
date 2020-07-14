import React, { useState, useEffect } from 'react';
import { Grid, Icon, Header, Form, Segment, Button } from 'semantic-ui-react';

const ContactForm = (props) => {
  const initialFieldValues = {
    firstName: '',
    middleName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
    dateOfBirth: '',
  };

  let [values, setValues] = useState(initialFieldValues);

  useEffect(() => {
    if (props.currentId == '')
      setValues({
        ...initialFieldValues,
      });
    else
      setValues({
        ...props.contactObjects[props.currentId],
      });
  }, [props.currentId, props.contactObjects]);

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addOrEdit(values);
  };

  return (
    <Grid className='app' textAlign='center' verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' icon color='violet' textAlign='center'>
          <Icon name='address book' color='violet' />
          Manage Contacts
        </Header>
        <Form size='large' onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              type='text'
              name='firstName'
              icon='user'
              iconPosition='left'
              placeholder='First Name'
              value={values.firstName}
              onChange={handleInputChange}
            />
            <Form.Input
              fluid
              type='text'
              name='middleName'
              icon='user'
              iconPosition='left'
              placeholder='Middle Name'
              value={values.middleName}
              onChange={handleInputChange}
            />
            <Form.Input
              fluid
              type='text'
              name='lastName'
              icon='user'
              iconPosition='left'
              placeholder='Last Name'
              value={values.lastName}
              onChange={handleInputChange}
            />
            <Form.Input
              fluid
              type='email'
              name='emailAddress'
              icon='mail'
              iconPosition='left'
              placeholder='Email Address'
              value={values.emailAddress}
              onChange={handleInputChange}
            />
            <Form.Input
              fluid
              type='number'
              name='phoneNumber'
              icon='phone'
              iconPosition='left'
              placeholder='Phone Number'
              value={values.phoneNumber}
              onChange={handleInputChange}
            />
            <Form.Input
              fluid
              type='date'
              name='dateOfBirth'
              icon='calendar alternate'
              iconPosition='left'
              placeholder='Date Of Birth'
              value={values.dateOfBirth}
              onChange={handleInputChange}
            />
            <Button color='violet' fluid size='large'>
              {props.currentId == '' ? 'Save' : 'Update'}
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default ContactForm;
