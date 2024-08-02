import React, { useEffect, useState } from "react";
import User from ".././components/User";
import Pagination from ".././components/Pagination";

const TableUsers = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchUsers = async (page) => {
      const response = await fetch(
        `https://randomuser.me/api/?page=${page}&results=10`
      );
      const data = await response.json();
      const users = data.results.map((user) => ({
        id: user.login.uuid,
        name: `${user.name.title} ${user.name.first} ${user.name.last}`,
        last: user.name.last,
        username: user.login.username,
        thumbnail: user.picture.thumbnail,
      }));
      setUsers(users);
      setTotalPages(10); // For 100 users, 10 pages
    };

    fetchUsers(currentPage);
  }, [currentPage]);

  return (
    <div className="App">
      <User users={users} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
export default TableUsers;
