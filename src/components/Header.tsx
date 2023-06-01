import React from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Header = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };
  return (
    <AppBar position="static" sx={{ mb: "1rem" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            sx={{
              mr: 2,
              fontWeight: 700,
              color: "inherit",
              flexGrow: 1,
            }}
          >
            <Link to="/">App</Link>
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Button
              onClick={() => changeLanguage("ru")}
              sx={{ color: "white" }}
            >
              ru
            </Button>
            <Button
              onClick={() => changeLanguage("en")}
              sx={{ color: "white" }}
            >
              en
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
