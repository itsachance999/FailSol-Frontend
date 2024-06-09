import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, Grid, Typography } from "@mui/material";

export default function ExplorerInput() {
  return (
    <Box my={4}>
      <Typography variant="h6" color={"azure"}>
        Explorer Failed Transaction
      </Typography>
      <Grid container>
        <Grid item md={8} sm={12}>
          <Box
            sx={{
              p: 1.2,
              bgcolor: "#ffffff4d",
              backdropFilter: "blur(20px)",
              //   width: "100%",
              borderRadius: 3,
              border: "1px solid #00c59a",
              mt: 1,
            }}
          >
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",

                // width: "100%",
                // m:1.2
              }}
            >
              <IconButton sx={{ p: "6px" }} aria-label="menu">
                <MenuIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Google Maps"
                inputProps={{ "aria-label": "search google maps" }}
              />
              <Button
                color="primary"
                variant="contained"
                type="button"
                sx={{
                  width: "36px !important",
                  height: "fit-content !important",
                }}
                aria-label="search"
              >
                <SearchIcon />
              </Button>
              {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <DirectionsIcon />
      </IconButton> */}
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
