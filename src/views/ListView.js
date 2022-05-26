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

  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { LoadingComponent } from "../components/LoadingComponent";
import { ErrorComponent } from "../components/ErrorComponent";
export function ListView() {
  const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchPageData(currentPage);
  }, [currentPage]);

  const fetchPageData = (num) => {
    axios
      .get(`http://localhost:3000/persons?page=${num}`)
      .then((res) => {
        if (res.data.errors) {
          setFetchError(res.data.errors[0]);
        } else {
          setPageData(res.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setFetchError(err.message);
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <Container>
      {fetchError ? (
        <ErrorComponent error={fetchError} setError={setFetchError} />
      ) : null}

      {isLoading ? <LoadingComponent isLoading={isLoading} /> : null}

      {pageData ? (
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
                {pageData.results.map((row, i) => (
                  <TableRow key={i} hover={true}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell align="left">
                      {row.firstName + " " + row.lastName}
                    </TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box
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
            </Box>
          </TableContainer>
         
        </Box>
      ) : <Box sx={{pt: 10}}>Could Not Load Data</Box>}
    </Container>
  );
}
