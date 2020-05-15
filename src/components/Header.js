import React, { useEffect } from "react";
import { withRouter } from "react-router";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Popper from '@material-ui/core/Popper';
import Badge from "@material-ui/core/Badge"
import NotificationsIcon from "@material-ui/icons/Notifications";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import { createMuiTheme, makeStyles, ThemeProvider  } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Divider from '@material-ui/core/Divider';
const moment = require('moment');

var  wateringCount = 0, intruderCount = 0, oldwC = 0, oldiC = 0, latestWateringDate = "", latestIntruderDate = "";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink
  },
});

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

const Header = ({ location }) => {
  const [badgeContent, setSeconds] = React.useState(0);
  
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
    
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickAway = (event) => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const interval = 
    setTimeout(() => {
      setInterval(() => {
        if(intruderCount != parseInt(document.getElementById('Sensor.intruderCount').textContent)){
          intruderCount = parseInt(document.getElementById('Sensor.intruderCount').textContent) ? parseInt(document.getElementById('Sensor.intruderCount').textContent) : 0;
          latestIntruderDate = moment().format('YYYY, MMM, DD, HH:mm');
        }
        if(parseInt(document.getElementById('Sensor.wateringCount').textContent)){
          wateringCount = parseInt(document.getElementById('Sensor.wateringCount').textContent) ? parseInt(document.getElementById('Sensor.wateringCount').textContent) : 0;
          latestWateringDate = moment().format('YYYY, MMM, DD, HH:mm');
        }
        setSeconds(badgeContent => intruderCount + wateringCount);
      }, 1000);
    }, 10000);
    return () => null;
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            My Dashboard
          </Typography>
          <ClickAwayListener onClickAway={handleClickAway}>
          {(wateringCount || intruderCount)
            ? <IconButton
                aria-describedby={id}
                onClick={handleClick}
                style={{position: "absolute", right: 14}}
              >
                <Badge badgeContent={badgeContent} color="secondary">
                  <NotificationsActiveIcon/>
                </Badge>
              </IconButton>
            : <IconButton
                aria-describedby={id}
                onClick={handleClick}
                style={{position: "absolute", right: 14}}
                >
                <Badge badgeContent={badgeContent} color="secondary">
                  <NotificationsIcon/>
                </Badge>
              </IconButton>
          }
          </ClickAwayListener>
          <Popper
            variant="popper"
            placement="bottom-end"
            disablePortal={true}
            modifiers={{
              flip: {
                enabled: false,
              },
              preventOverflow: {
                enabled: true,
                boundariesElement: 'window',
              },
            }}
            id={id}
            open={open}
            anchorEl={anchorEl}
          >
            {(wateringCount || intruderCount)
              ? 
                <Paper>
                  {wateringCount 
                    ? <div className={classes.typography}>
                        <Typography variant="body1">
                          Watering Notification.
                        </Typography>
                        <Typography variant="body2">
                          You have {wateringCount} watering count since the last 1 hour ago.
                        </Typography>
                        <Typography variant ="caption">
                          <Typography variant="colorTextSecondary">
                            {latestWateringDate}
                          </Typography>
                        </Typography>
                      </div>
                    : <div/>
                  }
                  {(wateringCount && intruderCount) ? <Divider/> : <div/>}
                  {intruderCount
                    ? <div className={classes.typography}>
                        <Typography variant="body1">
                          Intruder Notification.
                        </Typography>
                        <Typography variant="body2">
                          You have {intruderCount} intruder count since the last 1 hour ago.
                        </Typography>
                        <Typography variant ="caption">
                          <Typography variant="colorTextSecondary">
                            {latestIntruderDate}
                          </Typography>
                        </Typography>
                      </div>
                    : <div/>
                  }
                </Paper>
              : <Paper>
                  <Typography className={classes.typography} variant="body1">
                    You have no new notification.
                  </Typography>
                </Paper>
            }
          </Popper> 
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )};
export default withRouter(Header);
