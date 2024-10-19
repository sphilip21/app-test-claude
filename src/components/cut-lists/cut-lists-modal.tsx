import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, TextField, Tooltip, Typography } from '@mui/material';
import Modal from '../modal/modal';
import { roundDownToNearestEigth } from '../../utils/math-helpers';


export default function CutListsModal({ data, onGenerate, onClose }: any) {
  const [open, setOpen] = useState(false);
  const [profiles, setProfiles] = useState<any>({});


  const handleClose = () => {
    setOpen(false);
    onClose();
  }

  /*
  const handleProfileD2DChange = (e: any) => {
    setProfiles((prev: any) => ({
      ...prev,
      [e.target.name]: {
        ...prev[e.target.name],
        d2dCutOffset: e.target.value
      }
    }));
  }
  */

  const handleProfileChange = (e: any) => {
    setProfiles((prev: any) => ({
      ...prev,
      [e.target.name]: {
        ...prev[e.target.name],
        cutOffset: e.target.value
      }
    }));
  }

  const handleGenerateCutLists = () => {
    const items = JSON.parse(JSON.stringify(data));
    items.forEach((item: any) => {
      if (!item.workflow?.cutMethod) {
        return;
      }
      const oldOffset = Number(item.workflow.cutOffset);
      const adjustment = Number(profiles[item.profile].cutOffset);
      item.workflow.cutOffset = roundDownToNearestEigth(oldOffset + adjustment).toFixed(3);
      // item.workflow.d2dCutOffset = roundDownToNearestEigth(profiles[item.profile].d2dCutOffset).toFixed(3);
    })
    onGenerate(items);
  }


  useEffect(() => {
    if (data && data.length > 0) {
      setOpen(true);
      
      // Update profiles
      const result: any = {};
      data.forEach((item: any) => {
        if (!result[item.profile]) {
          result[item.profile] = {
            profile: item.profile,
            material: item.material,
            cutMethod: item.workflow?.cutMethod || '1',
            cutOffset: item.workflow?.cutOffset || 0.0,
            d2dCutOffset: item.workflow?.d2dCutOffset || 0.0,
            magnet: item.workflow?.magnetId || undefined,
            magnetNo: item.workflow?.magMchNo || undefined,
            loadOffset: item.workflow?.loadOffset || 0.0,
            d2dLoadOffset: item.workflow?.d2dLoadOffset || 0.0
          };
        }
      });
      setProfiles(result);
    }
  }, [data])


  if (!data || data.length < 1) {
    return null;
  }




  return (
    <Modal open={open} handleClose={handleClose}>
      Use this form to make any additional adjustments to offsets.
      <hr />
      <div style={{ maxHeight: '600px', overflow: 'scroll' }}>
        <Grid container>
        {
          [{
            label: 'Profile',
            width: 2
          }, {
            label: 'Cut Method',
            width: 2
          }, {
            label: 'D2D Offset (in.)',
            width: 2,
            help: 'Offset for D2D cuts only'
          }, {
            label: 'Additional Offset (in.)',
            width: 2,
            help: 'Additional offset for all cuts'
          }].map(h => (
            <Grid key={h.label} item xs={h.width || 1}>
              <Tooltip title={h.help || h.label} placement='top'>
                <Typography variant="h6" sx={{fontSize: '1.2rem', fontWeight: '600'}}>
                  {h.label}
                </Typography>
              </Tooltip>
            </Grid>
        ))}
        </Grid>
        {Object.values(profiles).map((i: any) => (
          <Grid key={i.profile} container>
            <Grid item xs={2}>
              <Typography variant="body1">
                {i.profile} ({i.material})
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1">
                {i.cutMethod === '1' ? 'Saw' : 'Punch'}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              {i.d2dCutOffset.toFixed(4)}
            </Grid>
            {/*
            <Grid item xs={2}>
              <TextField
                sx={{ m: 1, ml: 0 }}
                name={i.profile}
                variant='outlined'
                size="small"
                type="number"
                onChange={handleProfileD2DChange}
              ></TextField>
            </Grid>
            */}
            <Grid item xs={2}>
              <TextField
                sx={{ m: 1, ml: 0 }}
                name={i.profile}
                variant='outlined'
                size="small"
                type="number"
                onChange={handleProfileChange}
              ></TextField>
            </Grid>
          </Grid>
        ))}
        </div>
      <hr />
      <Box sx={{ textAlign: 'right' }}>
      <Button variant="outlined" color="error" onClick={handleClose}>Cancel</Button>
      <Button sx={{ml: 2}}variant="contained" onClick={handleGenerateCutLists}>Generate Cut Lists</Button>
      </Box>
    </Modal>
  );
}
