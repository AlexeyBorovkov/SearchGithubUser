import { useEffect, useState } from "react";
import SearchInput from "./components/SearchInput/SearchInput";
import { searchUsers } from "./api/api";
import { User } from "./components/UserList/interfaces";
import UserList from "./components/UserList/UserList";
import ReactPaginate from "react-paginate";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchUser () {
      if (searchQuery) {
        try {
          const result = await searchUsers(
            searchQuery,
            "followers",
            "desc",
            pageSize,
            pageNumber
          );
          console.log("Результат поиска:", result);
          if (result.items && result.items.length > 0) {
            console.log("Входим в условие с result.items:", result.items);
            setUsers(result.items);
            setTotalPages(Math.ceil(result.total_count / pageSize));
          } else {
            console.log("Нет пользователей");
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchUser ();
  }, [searchQuery, pageNumber, pageSize]);

  const handleSearch = (value: string): void => {
    setSearchQuery(value);
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    setPageNumber(selectedItem.selected + 1);
  };

  return (
    <>
      <SearchInput handleChange={handleSearch} />
      {users.length ? (
        <>
          <UserList users={users} />
          <div className="container">
            <ReactPaginate
              pageCount={totalPages}
              onPageChange={handlePageChange}
              containerClassName="pagination"
              activeClassName="active"
            />
            <Form.Select size="sm"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="36">36</option>
            </Form.Select>
          </div>
        </>
      ) : (
        `Список пользователей пуст`
      )}
    </>
  );
}

export default App;