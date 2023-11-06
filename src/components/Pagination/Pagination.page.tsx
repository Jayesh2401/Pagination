import React, { useEffect, useState } from "react";
import CommonPagination from "./Pagination.component";

const PaginationDemo: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [secondPage, setsecondPage] = useState(1);
  const [thirdPage, setthirdPage] = useState(1);
  const [data, setData] = useState<UserData>();
  const [loading, setLoading] = useState(false);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSecondpage = (newPage: number) => {
    setsecondPage(newPage);
  };

  const handleThirdpage = (newPage: number) => {
    setthirdPage(newPage);
  };

  interface UserData {
    id: number;
    first_name: string;
  }

  useEffect(() => {
    const apiUrl = `https://reqres.in/api/users/${currentPage}`;
    setLoading(true);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [currentPage]);

  // https://reqres.in/api/users?page=2
  return (
    <div>
      <h1>Current Page results: {currentPage}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          <li style={{ fontSize: "20px", fontWeight: "bold" }}>
            {data?.first_name}
          </li>
        </ul>
      )}

      <h1>Normal pagination</h1>
      <CommonPagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        pageSize={5}
        totalCount={100}
        startCount={4}
        inline={false}
        increaseSibling={false}
        shape="rounded"
      />

      <h1>Dots and alignement variation pagination</h1>
      <CommonPagination
        currentPage={thirdPage}
        onPageChange={handleThirdpage}
        pageSize={4}
        totalCount={100}
        startCount={4}
        inline={false}
        increaseSibling={true}
        shape="rounded"
      />

      <h1>inline pagination</h1>
      <div>
        <CommonPagination
          currentPage={secondPage}
          onPageChange={handleSecondpage}
          pageSize={10}
          totalCount={100}
          startCount={5}
          shape="squared"
          inline={true}
          className="inline-class"
        />
      </div>
    </div>
  );
};

export default PaginationDemo;
