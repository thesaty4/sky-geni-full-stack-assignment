import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { IconButton, Link, Stack } from "@mui/material";

const SocialLinks = () => {
  return (
    <Stack direction="row" spacing={1}>
      <IconButton
        component={Link}
        href="https://www.linkedin.com/in/thesaty4/"
        target="_blank"
        rel="noopener"
        color="inherit"
      >
        <LinkedInIcon />
      </IconButton>

      <IconButton
        component={Link}
        href="https://satya-mishra-portfolio.netlify.app/"
        target="_blank"
        rel="noopener"
        color="inherit"
      >
        <LanguageIcon />
      </IconButton>

      <IconButton
        component={Link}
        href="https://github.com/thesaty4"
        target="_blank"
        rel="noopener"
        color="inherit"
      >
        <GitHubIcon />
      </IconButton>
    </Stack>
  );
};

export default SocialLinks;
