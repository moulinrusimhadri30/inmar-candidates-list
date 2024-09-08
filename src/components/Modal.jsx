import React from 'react';
import { Form, Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { DetailsTable } from './DetailsTable';
import { useState } from 'react';

export const ModalCard = (props) => {
  const {profile:{url},skillset,setSkillset} = props

  const [skills,setSkills] = useState([])

  const [searchValue,setSearchValue] = useState()
  const [dropdown,setDropdown] = useState('skill')

  const applyHandler = () => {
    setSkillset(skills)
    props.onHide()
  }
  
  return (
    <Modal size="lg" {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header>
        <Modal.Title style={{margin:'auto'}}>User Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <Row>
            <Col xs lg={3}>
              <Image src={url} fluid/>
            </Col>
            <Col>
              <Container>
                <Row>      
                  <Col>
                      <Form.Control 
                        placeholder="Search" 
                        onChange={(e)=>setSearchValue(e.target.value)} 
                      />
                  </Col>
                  <Col>
                      <Form.Select onChange={(e)=>setDropdown(e.target.value)}>
                          <option value="skill">Skill</option>
                          <option value="rating">Rating</option>
                      </Form.Select>
                  </Col>
                </Row>
                <Row className='mt-3'>
                  <DetailsTable 
                    profile={props.profile} 
                    applyHandler={applyHandler} 
                    skills={skills} 
                    setSkills={setSkills} 
                    searchTerm={searchValue}
                    dropdown={dropdown}
                    {...props}
                  />
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='success' onClick={applyHandler}>Apply</Button>
        <Button variant='danger' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}