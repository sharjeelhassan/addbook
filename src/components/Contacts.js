import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import fireDb from '../firebase';
import { Grid, Header, Icon, Table, Button, Pagination } from 'semantic-ui-react';

const Contacts = () => {
  let [contactObjects, setContactObjects] = useState({});
  let [currentId, setCurrentId] = useState('');

  useEffect(() => {
    fireDb.child('contacts').on('value', (snapshot) => {
      if (snapshot.val() != null)
        setContactObjects({
          ...snapshot.val(),
        });
      else setContactObjects({});
    });
  }, []);

  const addOrEdit = (obj) => {
    if (currentId == '')
      fireDb.child('contacts').push(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId('');
      });
    else
      fireDb.child(`contacts/${currentId}`).set(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId('');
      });
  };

  const onDelete = (id) => {
    if (window.confirm('Are you sure?'))
      fireDb.child(`contacts/${id}`).remove((err) => {
        if (err) console.log(err);
        else setCurrentId('');
      });
  };

  return (
    <Grid divided='horizontly'>
      <Grid.Row columns={2}>
        <Grid.Column>
          <ContactForm {...{ addOrEdit, currentId, contactObjects }} />
        </Grid.Column>
        <Grid.Column>
          <Header as='h2' icon color='violet' textAlign='center'>
            <Icon name='list alternate outline' color='violet' />
            Contacts
          </Header>

          <Table striped sortable celled fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>First Name</Table.HeaderCell>
                <Table.HeaderCell>Middle Name</Table.HeaderCell>
                <Table.HeaderCell>Last Name</Table.HeaderCell>
                <Table.HeaderCell>Phone</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>DOB</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {Object.keys(contactObjects).map((id) => {
                return (
                  <Table.Row key={id}>
                    <Table.Cell>{contactObjects[id].firstName}</Table.Cell>
                    <Table.Cell>{contactObjects[id].middleName}</Table.Cell>
                    <Table.Cell>{contactObjects[id].lastName}</Table.Cell>
                    <Table.Cell>{contactObjects[id].phoneNumber}</Table.Cell>
                    <Table.Cell>{contactObjects[id].emailAddress}</Table.Cell>
                    <Table.Cell>{contactObjects[id].dateOfBirth}</Table.Cell>
                    <Table.Cell>
                      <Button.Group icon>
                        <Button
                          onClick={() => {
                            setCurrentId(id);
                          }}
                        >
                          <Icon name='edit outline' />
                        </Button>
                        <Button
                          onClick={() => {
                            onDelete(id);
                          }}
                        >
                          <Icon name='trash alternate outline' color='red' />
                        </Button>
                      </Button.Group>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
          <Pagination defaultActivePage={1} totalPages={2} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Contacts;
