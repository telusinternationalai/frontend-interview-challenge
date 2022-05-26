import { useEffect, useState } from "react";
import { Box, Container } from "@material-ui/core";
import axios from "axios";
export default function ListView() {
  const [pageData, setPageData] = useState([]);

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = (num = 1) => {
    axios
      .get(`http://localhost:3000/persons?page=${1}`)
      .then((res) => {

        setPageData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
//   useEffect(() => {
//     console.log(pageData.results[0].id);
//   }, [pageData]);

  return (
    <Container>
    <Box>Listview</Box>

    </Container>
  );
}
