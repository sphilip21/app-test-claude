
import {
  Table,
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
} from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import Row from '../row/row';

import './collapsible-table.scss';

export interface HeaderColumnsIF {
  name: string
  displayName: string
  align: "center" | "right" | "left" | "inherit" | "justify" | undefined
  sortable: boolean
}

interface CollapsibleTableProps {
  data: any
  headerColumns: GridColDef[]
}

function CollapsibleTable(props: CollapsibleTableProps) {
  const {
    data,
    headerColumns
  } = props

  return (
    <TableContainer className="collapsible-table">
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            {headerColumns.map((column) => (
              <TableCell key={column.field} align={column.align}>{column.headerName}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: any) => (
            <Row key={row.id} headerColumns={headerColumns} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CollapsibleTable;