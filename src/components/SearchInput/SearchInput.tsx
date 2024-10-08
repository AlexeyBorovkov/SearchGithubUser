
import { debounce } from "lodash";
import { ChangeEvent } from "react";
import { Form } from "react-bootstrap";

interface Props {
  handleChange: (value: string) => void;
}

const SearchInput = ({ handleChange }: Props) => {
  const debouncedHandleChange = debounce(
    (event: ChangeEvent<HTMLInputElement>) => {
      handleChange(event.target.value);
    },
    1000
  );

  return (
    <>
      <Form>
        <Form.Group className="search_input">
          <Form.Label>Github Search</Form.Label>
          <Form.Control
            onChange={debouncedHandleChange}
            type="search"
            placeholder="Search"
          />
        </Form.Group>
      </Form>
    </>
  );
};

export default SearchInput;


