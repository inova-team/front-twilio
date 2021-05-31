import React from 'react';
import {makeStyles, Typography, Grid, Button, Theme, Hidden} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import LocalVideoPreview from './LocalVideoPreview/LocalVideoPreview';
import SettingsMenu from './SettingsMenu/SettingsMenu';
import {Steps} from '../PreJoinScreens';
import ToggleAudioButton from '../../Buttons/ToggleAudioButton/ToggleAudioButton';
import ToggleVideoButton from '../../Buttons/ToggleVideoButton/ToggleVideoButton';
import {useAppState} from '../../../state';
import useChatContext from '../../../hooks/useChatContext/useChatContext';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import {getErrorMessage} from "../../../state/usePasscodeAuth/usePasscodeAuth";


const useStyles = makeStyles((theme: Theme) => ({
  gutterBottom: {
    marginBottom: '1em',
  },
  marginTop: {
    marginTop: '1em',
  },
  deviceButton: {
    width: '100%',
    border: '2px solid #aaa',
    margin: '1em 0',
  },
  localPreviewContainer: {
    paddingRight: '2em',
    [theme.breakpoints.down('sm')]: {
      padding: '0 2.5em',
    },
  },
  joinButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column-reverse',
    width: '100%',
    '& button': {
      margin: '0.5em 0',
    },
    /*[theme.breakpoints.down('sm')]: {

    },*/
  },
  mobileButtonBar: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '1.5em 0 1em',
    },
  },
  mobileButton: {
    padding: '0.8em 0',
    margin: 0,
  },
}));

interface DeviceSelectionScreenProps {
  name: string;
  roomName: string;
  setName: (name: string) => void;
  setRoomName: (roomName: string) => void;
  usrTkn: string;
  setStep: (step: Steps) => void;
}

export default function DeviceSelectionScreen({
                                                name,
                                                roomName,
                                                setName,
                                                setRoomName,
                                                usrTkn
                                              }: DeviceSelectionScreenProps) {
  const classes = useStyles();
  const {getToken, isFetching} = useAppState();
  const {connect: chatConnect} = useChatContext();
  const {connect: videoConnect, isAcquiringLocalTracks, isConnecting, onError} = useVideoContext();
  const disableButtons = isFetching || isAcquiringLocalTracks || isConnecting;

  const handleJoin = () => {
    getToken(name, roomName, usrTkn).then(async res => {
      const json = await res.json();
      if (res.ok) {
        let token = json.token
        setName(json.name)
        setRoomName(json.room_name)
        let endpoint = process.env.REACT_APP_DISCONNECT_PATH || ''

        if (json.client === 'paciente') {
          var current_sec = json.seconds

          window.setTimeout(function () {
            var formData = new FormData()
            formData.append('room_sid', json.room_sid);
            navigator.sendBeacon(endpoint, formData)
          }, json.seconds * 1000);

          var interval = window.setInterval(function () {
            function padZero(n: number) {
              if (n < 10) {
                return '0'.concat(n.toString());
              } else {
                return n.toString();
              }
            }

            function setTimer(seconds: number, timer: Element) {
              (timer as HTMLElement).dataset.seconds = seconds.toString();
              var h = Math.floor(seconds / 3600);
              var m = Math.floor(seconds % 3600 / 60);
              var s = seconds % 60;
              (timer as HTMLElement).innerHTML = '('.concat(padZero(h), ':', padZero(m), ':', padZero(s), ')');
            }
            // console.log(current_sec)
            if (current_sec === 0) {
              clearInterval(interval);
            }
            var timers = document.querySelectorAll('.timer');
            timers.forEach(function (timer) {
              setTimer(current_sec, timer)
            });
            current_sec = current_sec - 1;
          }, 1000);

        }

        videoConnect(token);
        process.env.REACT_APP_DISABLE_TWILIO_CONVERSATIONS !== 'true' && chatConnect(token);

      } else {
        const errorMessage = getErrorMessage(json.error?.message || res.statusText);
        onError(new Error(errorMessage));
      }
    });
  };

  if (isFetching || isConnecting) {
    return (
      <Grid container justify="center" alignItems="center" direction="column" style={{height: '100%'}}>
        <div>
          <CircularProgress variant="indeterminate"/>
        </div>
        <div>
          <Typography variant="body2" style={{fontWeight: 'bold', fontSize: '16px'}}>
            Conectando a la sala
          </Typography>
        </div>
      </Grid>
    );
  }

  return (
    <>
      <Typography variant="h5" className={classes.gutterBottom}>
        Ingresar a la consulta
      </Typography>

      <Grid container justify="center">
        <Grid item md={7} sm={12} xs={12}>
          <div className={classes.localPreviewContainer}>
            <LocalVideoPreview identity={name}/>
          </div>
          <div className={classes.mobileButtonBar}>
            <Hidden mdUp>
              <ToggleAudioButton className={classes.mobileButton} disabled={disableButtons}/>
              <ToggleVideoButton className={classes.mobileButton} disabled={disableButtons}/>
            </Hidden>
            <SettingsMenu mobileButtonClass={classes.mobileButton}/>
          </div>
        </Grid>
        <Grid item md={5} sm={12} xs={12}>
          <Grid container direction="column" justify="space-between" style={{height: '100%'}}>
            <div>
              <Hidden smDown>
                <ToggleAudioButton className={classes.deviceButton} disabled={disableButtons}/>
                <ToggleVideoButton className={classes.deviceButton} disabled={disableButtons}/>
              </Hidden>
            </div>
            <div className={classes.joinButtons}>
              {/*<Button variant="outlined" color="primary" onClick={() => setStep(Steps.roomNameStep)}>
                Cancelar
              </Button>*/}
              <Button
                variant="contained"
                color="primary"
                data-cy-join-now
                onClick={handleJoin}
                disabled={disableButtons}
              >
                Ingresar
              </Button>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
