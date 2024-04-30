import React, { useContext } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Box, Modal, Typography } from '@mui/material';
import CondensedOrderItemsTable from './condensed-items-table';
import TouchCheckbox from './touch-checkbox';
import toggles from '../../features/toggles';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-tomorrow";
import { CurrentUserContext } from '../../contexts';
// import "ace-builds/src-noconflict/ext-language_tools";

interface Props {
  rows: any[];
  onSelectionChange: any;
}

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const options: any = {
  year: '2-digit',
  month: '2-digit',
  day: '2-digit'
};

function DetailsControl({order}: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (<>
    <Button
      variant="contained"
      disableElevation
      size="small"
      onClick={handleOpen}
    >
      View Details
    </Button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute' as 'absolute',
        top: '5%',
        left: '12%',
        //transform: 'translate(-50%, -50%)',
        width: '76vw',
        bgcolor: 'background.paper',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxShadow: 24,
        p: 4,
      }}>
        <Box sx={{ mb: 1, display: 'flex' }}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ flex: 1 }}>
            Order #{order.ref} (Code: {order.code})
          </Typography>
          <Button variant="outlined" disableElevation color="error" size="small" onClick={() => setOpen(false)}>
            Close
          </Button>
        </Box>
        <CondensedOrderItemsTable rows={order.items} onSelectionChange={() => {}} station="" />
      </Box>
    </Modal>
  </>)
}

function AdminControl({ order }: any) {
  const currentUser = useContext(CurrentUserContext);
  const [open, setOpen] = React.useState(false);
  const [changes, setChanges] = React.useState(false);
  const [editorContent, setEditorContent] = React.useState(JSON.stringify(order, null, 2));
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    console.log(editorContent)
  };

  // Feature toggle
  if (!toggles.adminFixEnabled) {
    return null;
  }

  // Role-based permission
  //if (!currentUser?.realm_access?.roles?.includes('trg-admin')) {
  //  return null;
  //}

  return (<>
    <Button
      variant="contained"
      disableElevation
      size="small"
      color="warning"
      onClick={handleOpen}
      sx={{ ml: 1 }}
    >
      Admin Fix
    </Button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute' as 'absolute',
        top: '5%',
        left: '12%',
        //transform: 'translate(-50%, -50%)',
        width: '76vw',
        height: '75vh',
        bgcolor: 'background.paper',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxShadow: 24,
        p: 4,
      }}>
        <Box sx={{ mb: 1, display: 'flex' }}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ flex: 1 }}>
            Order #{order.ref}
          </Typography>
          <Typography variant="body2" sx={{m: 1, color: 'green' }}>
            { changes ? 'You have unsaved changes.' : ''}
          </Typography>
          <Button variant="contained" disableElevation size="small" onClick={handleSave}>
            Save
          </Button>
        </Box>
        <Box sx={{ border: '1px solid #ccc' }}>
          <AceEditor
            placeholder="Fix orders here"
            mode="json"
            theme="tomorrow"
            name="admin-fix"
            // onLoad={this.onLoad}
            // onChange={this.onChange}
            width={'100%'}
            height={'calc(75vh - 50px)'}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={editorContent}
            onChange={(value) => { setChanges(true); setEditorContent(value); }}
            setOptions={{
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: false,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 2,
              useWorker: false
            }}/>
          </Box>
      </Box>
    </Modal>
  </>)
}

const columns = [
  { field: 'ref', headerName: 'Ref. No', width: 120 },
  { field: 'code', headerName: 'Code', width: 100 },
  { field: 'status', headerName: 'Status', width: 180 },
  {
    field: 'promisedBy',
    headerName: 'Promised By',
    type: 'date',
    width: 200,
    valueGetter: (params: any) => {
      return new Date(params.value);
    },
    valueFormatter: (params: any) => {
      const now = new Date(); // current date and time
      const tomorrow = new Date();
      tomorrow.setDate(now.getDate() + 1); // set tomorrow's date
      const dateString = `${params.value.toLocaleDateString('en-US', options)}`;
      const dayString = `${days[params.value.getDay()]}`;
      const label = params.value.getTime() <= tomorrow.getTime() ? '🔴 ' : '';
      return `${label}${dateString} (${dayString})`;
    }
  },
  {
    field: 'items',
    headerName: 'Actions',
    width: 300,
    sortable: false,
    renderCell: (params: any) => {
      return (
        <>
          <DetailsControl order={params.row} />
          <AdminControl order={params.row} />
        </>
      )
    }
  }
];

export default function OrdersTable({ rows, onSelectionChange }: Props) {
  return (<>
    <DataGrid
        sx={{height: 'calc(100vh - 64px - 54px)'}}
        rows={rows.map(o => ({ ...o, id: o.id.toString() }))}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 100 },
          },
        }}
        pageSizeOptions={[25, 50, 100]}
        checkboxSelection
        onRowSelectionModelChange={onSelectionChange}
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar, baseCheckbox: TouchCheckbox }}
      />
  </>);
}
