import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import { useState } from "react";
import { User } from "../UserList/interfaces";

const UserInfo = ({ login, followers, following, avatar_url, public_repos }: User) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={avatar_url} />
      <Card.Body>
        <Card.Title>{login}</Card.Title>
        <Button variant="primary" onClick={handleShowModal}>
          Show details
        </Button>
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          keyboard={true} 
        >
          <Modal.Header closeButton>
            <Modal.Title>Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
              <li>Репозитории: {public_repos}</li>
              <li>Подписчики: {followers}</li>
              <li>Подписки: {following}</li>
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default UserInfo;


