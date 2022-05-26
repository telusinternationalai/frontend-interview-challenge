import { Backdrop, CircularProgress, Typography } from "@mui/material";

export function LoadingComponent(props) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.isLoading}
    >
      <Typography variant="h4" sx={{ mr: 2 }}>
        Loading Data
      </Typography>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
