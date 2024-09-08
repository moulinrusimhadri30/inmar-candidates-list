import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import { ModalCard } from "./Modal";
import { Table } from "react-bootstrap";
import { Rating } from '@smastrom/react-rating'

const CardBox = ({ profile }) => {
  const { url, id } = profile;
  const [modalShow, setModalShow] = useState(false);
  const [skillset, setSkillset] = useState([]);

  const editHandler = (id) => {
    setModalShow(true);
  };
  return (
    <Card style={{ width: "19rem",borderRadius:'20px' }} className="text-center">
      <Card.Img
        variant="top"
        src={url}
        style={{ minWidth: "18rem", minHeight: "18rem", borderRadius:'20px 20px 0 0' }}
      />
      <Card.Body>
        <Button variant="primary" onClick={() => editHandler(id)} >
          Edit Profile
        </Button>
        <Card.Title>
            <Table responsive className="mt-2" size="sm">
              {skillset[0]?.name && skillset.map((skill) => (
                <tr  key={skill.sno}>
                  <td style={{textAlign:'left'}}>{skill.name}</td>
                  <td style={{width:'150px'}}> 
                    <Rating 
                      style={{ maxWidth: 250 }} 
                      value={parseInt(skill.rating)/2} 
                      readOnly
                      items={5}
                      />
                  </td>
                </tr>     
              ))}
            </Table>
        </Card.Title>
      </Card.Body>
      <ModalCard
        show={modalShow}
        onHide={() => setModalShow(false)}
        profile={profile}
        skillset={skillset}
        setSkillset={setSkillset}
      />
    </Card>
  );
};

export default CardBox;
