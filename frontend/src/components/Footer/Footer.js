import { Typography } from '@mui/material';

import { FOOTER_STYLES } from './Footer.styles';

const FOOTER_YEAR = new Date().getFullYear();

function Footer() {
  return (
    <Typography sx={FOOTER_STYLES}>
      ©{FOOTER_YEAR} Movies Universe. All Rights Reserved
    </Typography>
  );
}

export default Footer;
