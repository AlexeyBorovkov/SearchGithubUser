import { Col, Container, Row, Form } from "react-bootstrap";
import UserInfo from "../UserInfo/UserInfo";
import { User } from "./interfaces";
import React, { useState } from "react";

type Props = {
  users: User[];
};

const UserList = ({ users }: Props) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSortOrderChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortOrder(event.target.value as "asc" | "desc");
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.public_repos - b.public_repos;
    } else {
      return b.public_repos - a.public_repos;
    }
  });

  return (
    <Container>
      <Row className="g-4">
        <Col xs={12}>
          <Form.Select size="sm" value={sortOrder} onChange={handleSortOrderChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Form.Select>
        </Col>
        {sortedUsers.map((user) => (
          <Col xs={4} key={user.id}>
            <UserInfo {...user} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UserList;
