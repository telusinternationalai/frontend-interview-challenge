import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";

import axios from "axios";
export function ListView() {
  const [pageData, setPageData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPageData(currentPage);
  }, [currentPage]);

  const fetchPageData = (num) => {
    axios
      .get(`http://localhost:3000/persons?page=${num}`)
      .then((res) => {
        setPageData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }}>
              <TableHead>
                <TableRow>
                  <TableCell>ID </TableCell>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pageData.results.map((row) => (
                  <TableRow key={row.name} hover={true}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell align="left">
                      {row.firstName + " " + row.lastName}
                    </TableCell>
                    <TableCell align="leftt">{row.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TableFooter
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                m: 1,
              }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  const previousPage = currentPage - 1;
                  setCurrentPage(previousPage);
                }}
                disabled={currentPage === 1 ? true : false}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  const nextPage = currentPage + 1;
                  setCurrentPage(nextPage);
                }}
                disabled={pageData.hasNextPage ? false : true}
              >
                Next
              </Button>
            </TableFooter>
          </TableContainer>
        </Box>
      )}
    </Container>
  );
}
