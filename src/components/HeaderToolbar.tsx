import {PureComponent} from 'preact/compat';

import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import Brightness3Icon from '@mui/icons-material/Brightness3'
import Brightness7Icon from '@mui/icons-material/Brightness7'


type HeaderToolbarProps = {
  isDarkTheme: boolean;
  useStateCallback: (value: boolean) => void;
};

class HeaderToolbar extends PureComponent<HeaderToolbarProps> {
  render() {
    return (
      <header>
        <Container maxWidth="md">
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              py: 3,
              borderRadius: 1,
              mt: 2,
              maxWidth: 'md',
              color: 'primary.contrastText',
              bgcolor: 'primary.main',
            }}
          >
            <Typography variant="h4" sx={{fontWeight: 'bold', textAlign: 'center'}}>
              QR-Code Generator
            </Typography>

            <Tooltip title={this.props.isDarkTheme ? 'Light Theme' : 'Dark Theme'}>
              <IconButton
                color="inherit"
                aria-label="Theme"
                onClick={() => this.props.useStateCallback(!this.props.isDarkTheme)}
              >
                {this.props.isDarkTheme ? <Brightness7Icon /> : <Brightness3Icon />}
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Container>
      </header>
    );
  }
}

export default HeaderToolbar;
