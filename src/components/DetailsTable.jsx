import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useState,useEffect } from 'react';
import { Form } from 'react-bootstrap';

export const DetailsTable = ({ skills, setSkills, searchTerm, dropdown }) => {

  const [errors, setErrors] = useState({}); 

  const validateRow = (index) => {
    let errorMessages = {};

    if (!skills[index].name) {
      errorMessages.name = "Skill Name is Required";
    }

    const rating = skills[index].rating;
    if (!rating || isNaN(rating) || rating < 0 || rating > 10) {
      errorMessages.rating = "Rating to be between 0 and 10";
    }

    return errorMessages;
  };

  const handleUpdate = (index) => {
    const rowErrors = validateRow(index);
    
    if (Object.keys(rowErrors).length > 0) {
      setErrors({ ...errors, [index]: rowErrors });
    } else {
      const updatedSkills = [...skills];
      updatedSkills[index].isEditing = false;
      setSkills(updatedSkills);
      setErrors({ ...errors, [index]: {} });
    }
  };

  const filteredSkills = searchTerm && dropdown ? skills.filter(skill =>
    dropdown === 'skill'
      ? skill.name.toLowerCase().includes(searchTerm.toLowerCase())
      : skill.rating.toString().includes(searchTerm)
  ): skills ;

  const addSkill = () => {
    setSkills([...skills, { name: '', rating: '', isEditing: true }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setSkills(updatedSkills);
  };

  return (
    <>
      <Table bordered hover size="lg" responsive >
        <thead>
          <tr>
            <th style={{width:'150px'}}>Skill</th>
            <th style={{width:'150px'}}>Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredSkills.map((skill, index) => (
            <tr key={index}>
              <td style={{width:'150px'}}>
                {skill.isEditing ? (
                  <>
                  <Form.Control 
                    type="text" 
                    value={skill.name} 
                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                    required
                  />
                  {errors[index]?.name && <span className="error" style={{color:'red'}}>{errors[index].name}</span>}
                  </>
                ) : skill.name}
              </td>
              <td style={{width:'150px'}}>
                {skill.isEditing ? (
                  <>
                  <Form.Control
                    type="number" 
                    value={skill.rating} 
                    min={0}
                    max={10}
                    onChange={(e) => handleInputChange(index, 'rating', e.target.value)} 
                    required
                  />
                  {errors[index]?.rating && <span className="error" style={{color:'red'}}>{errors[index].rating}</span>}
                  </>
                ) : skill.rating}
              </td>
              <td style={{paddingTop:'12px'}}>
                {skill.isEditing ? (
                  <Button 
                    variant='primary' 
                    size="sm" 
                    className='me-1' 
                    onClick={() => handleUpdate(index, 'isEditing', false)}  
                    style={{width:'65px'}}
                    >
                    Update
                </Button>
                ) : (
                  <Button 
                  onClick={() => handleInputChange(index, 'isEditing', true)} 
                  size="sm" 
                  className='me-1' 
                  style={{width:'65px'}}
                  >
                    Edit
                </Button>
                )}
                <Button 
                  variant='danger' 
                  size="sm" 
                  onClick={() => setSkills(skills.filter((_, i) => i !== index))}
                  >Delete
                </Button>
              </td>
            </tr>
          ))}
          {skills.length ===0 && <tr>
                    <td colSpan={4} style={{textAlign:'center'}}>No records</td></tr>
                }
        </tbody>
        </Table>
      <Button variant="primary" onClick={addSkill}>Add Skill</Button>
    </>
  );
};