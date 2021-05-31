import React, { FormEvent } from 'react';

// const useStyles = makeStyles((theme: Theme) => ({
//   gutterBottom: {
//     marginBottom: '1em',
//   },
//   inputContainer: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     margin: '1.5em 0 3.5em',
//     '& div:not(:last-child)': {
//       marginRight: '1em',
//     },
//     [theme.breakpoints.down('sm')]: {
//       margin: '1.5em 0 2em',
//     },
//   },
//   textFieldContainer: {
//     width: '100%',
//   },
//   continueButton: {
//     [theme.breakpoints.down('sm')]: {
//       width: '100%',
//     },
//   },
// }));

interface RoomNameScreenProps {
  name: string;
  roomName: string;
  setName: (name: string) => void;
  setRoomName: (roomName: string) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function RoomNameScreen({ }: RoomNameScreenProps) {
  // const classes = useStyles();
  // const { user } = useAppState();

  // const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setName(event.target.value);
  // };
  //
  // const handleRoomNameChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setRoomName(event.target.value);
  // };
  //
  // const hasUsername = !window.location.search.includes('customIdentity=true') && user?.displayName;

  return (
    <>
      {/*<Typography variant="h5" className={classes.gutterBottom}>
        Ingresar
      </Typography>
      <Typography variant="body1">
        {hasUsername
          ? "Ingresa el nombre de la sala a utilizar."
          : "Ingresa tus datos y los de la sala a utilizar."}
      </Typography>
      <form onSubmit={handleSubmit}>
        <div className={classes.inputContainer}>
          {!hasUsername && (
            <div className={classes.textFieldContainer}>
              <InputLabel shrink htmlFor="input-user-name">
                Nombre
              </InputLabel>
              <TextField
                id="input-user-name"
                variant="outlined"
                fullWidth
                size="small"
                value={name}
                onChange={handleNameChange}
              />
            </div>
          )}
          <div className={classes.textFieldContainer}>
            <InputLabel shrink htmlFor="input-room-name">
              Sala
            </InputLabel>
            <TextField
              autoCapitalize="false"
              id="input-room-name"
              variant="outlined"
              fullWidth
              size="small"
              value={roomName}
              onChange={handleRoomNameChange}
            />
          </div>
        </div>
        <Grid container justify="flex-end">
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={!name || !roomName}
            className={classes.continueButton}
          >
            Ingresar
          </Button>
        </Grid>
      </form>*/}
    </>
  );
}
