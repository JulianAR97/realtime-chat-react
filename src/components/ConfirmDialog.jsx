import React from 'react'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'

const ConfirmDialog = (props) => {
  const {open, title, handleClose} = props

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleClose} autoFocus>Agree</Button>
      </DialogActions>
    </Dialog>
  )
}

ConfirmDialog.defaultProps = {
  open: false,
  title: 'Are you sure',
  handleClose: () => console.log('Closing dialog')
}

export default ConfirmDialog
