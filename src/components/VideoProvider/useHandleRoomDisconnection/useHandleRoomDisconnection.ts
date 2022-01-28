import {Room, TwilioError} from 'twilio-video';
import {useEffect} from 'react';

import {Callback} from '../../../types';

export default function useHandleRoomDisconnection(
  room: Room | null,
  onError: Callback,
  removeLocalAudioTrack: () => void,
  removeLocalVideoTrack: () => void,
  isSharingScreen: boolean,
  toggleScreenShare: () => void
) {
  useEffect(() => {
    if (room) {
      let room_sid = room.sid
      // let endpoint = process.env.REACT_APP_DISCONNECT_PATH || ''
      let endpoint = 'https://tinkkuweb.uc.r.appspot.com//llamadas/disconnect' || ''
      const onDisconnected = (_: Room, error: TwilioError) => {
        if (error) {
          onError(error);
        }

        removeLocalAudioTrack();
        removeLocalVideoTrack();
        if (isSharingScreen) {
          toggleScreenShare();
        }

        let formData = new FormData()
        formData.append('room_sid', room_sid);
        navigator.sendBeacon(endpoint, formData)

      };

      window.addEventListener('beforeunload', function () {
        let formData = new FormData()
        formData.append('room_sid', room_sid);
        navigator.sendBeacon(endpoint, formData)
      });
      room.on('disconnected', onDisconnected);
      return () => {
        room.off('disconnected', onDisconnected);
      };
    }
  }, [room, onError, removeLocalAudioTrack, removeLocalVideoTrack, isSharingScreen, toggleScreenShare]);
}
