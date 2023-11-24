import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

export default function Register() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      Fname: data.get("Fname"),
      Lname: data.get("Lname"),
      Age: data.get("Age"),
      Gender: data.get("Gender"),
      Email: data.get("Email"),
      Password: data.get("Password"),
    };
    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          alert("สมัครสมาชิกสำเร็จ");
          window.location = "/login";
        } else {
          alert("สมัครสมาชิกไม่สำเร็จ");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            สมัครสมาชิก
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="Fname"
                  required
                  fullWidth
                  id="Fname"
                  label="ชื่อ"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Lname"
                  label="นามสกุล"
                  name="Lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="Age"
                  required
                  fullWidth
                  id="Age"
                  label="อายุ"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Gender"
                  label="เพศ"
                  name="Gender"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Email"
                  label="อีเมล"
                  name="Email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Password"
                  label="รหัสผ่าน"
                  type="password"
                  id="Password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              สมัครสมาชิก
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
