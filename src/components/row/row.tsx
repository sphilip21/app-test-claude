import { Fragment, useState } from 'react';
import { 
  Collapse, 
  IconButton,
  TableCell,  
  TableRow, 
} from '@mui/material';

import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { GridColDef } from '@mui/x-data-grid';

import './row.scss';

interface RowPropsIF {
  row: any
  headerColumns: GridColDef[]
}

function Row(props: RowPropsIF) {
  const { row, headerColumns } = props;
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        {headerColumns.map((column) => 
          <TableCell key={column.field} component="th" scope="row">
            {/* Column name must be the key value on the data */}
            {column?.valueGetter ? column.valueGetter(row) : row[column.field]}
          </TableCell>
        )}
      </TableRow>
      <TableRow className="row">
        <TableCell className="row__collapse-table-cell" colSpan={6}>
          <Collapse className="row__collapse-container" in={open} timeout="auto" unmountOnExit>
            <div className="row__collapse-container">
              Coming Soon!
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

export default Row;