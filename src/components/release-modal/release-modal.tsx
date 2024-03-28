import { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Modal from '../modal/modal';

import './release-modal.scss';
import { AlertsContext, CurrentUserContext } from '../../contexts';
import { releaseItem, releaseMany } from '../../services/manufacturing-api';

interface RowPropsIF {
  items: any
  station: string
  onClose(): void
  onReleaseComplete(): void
}

function ReleaseModal(props: RowPropsIF) {
  const { items, station, onClose, onReleaseComplete } = props;
  const [open, setOpen] = useState(!!items);
  const [disableButton, setDisableButton] = useState(false);
  const { addAlert } = useContext(AlertsContext);
  const currentUser = useContext(CurrentUserContext)
  useEffect(() => {
    const isOpen = !!items
    if (isOpen) {
      setOpen(isOpen)
    }
  }, [items])

  function handleClose(): void {
    setOpen(false)
    onClose()
  }

  const handleRelease = async () => {
    setDisableButton(true)
    if (currentUser?.token) {
      if (items?.length === 1) {
        const item = items[0];
        const stationAmount = item.stations[station]
        const body = {
          refNo: item.order.ref,
          itemId: item.id,
          station: station,
          releaseAmount: stationAmount
        };
        const orderRes = await releaseItem(body, currentUser?.token)
        if (orderRes.error) {
          addAlert(`Issue releasing: ${orderRes.error}`)
        } else {
          addAlert(`${item.id} has released ${stationAmount} from ${station}`)
        }
        setDisableButton(false)
        handleClose()
        onReleaseComplete()
      } else {
        const itemsToRelease = items.map((item: any) => {
          return {
            refNo: item.order.ref,
            itemId: item.id,
            station: station
          };
        })
        const body = {
          items: itemsToRelease
        };
        const orderRes = await releaseMany(body, currentUser?.token)
        if (orderRes.status && orderRes.status !== 200) {
          addAlert(`Issue releasing: ${orderRes.error?.message || orderRes.error}`)
        } else {
          addAlert(`Release has released multiple items from ${station}`)
        }
        setDisableButton(false)
        handleClose()
        onReleaseComplete()
      }
    }
  }

  return (
    <Modal
      open={open}
      handleClose={handleClose}
    >
      <div>
        <div className="release-modal__description">Are you sure you want to release all items from {station}?</div>
        <div className="release-modal__button-container">
          <Button variant="outlined">
            DONT DO IT
          </Button>
          <Button disabled={disableButton} variant="contained" onClick={handleRelease}>
            Release
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ReleaseModal;
