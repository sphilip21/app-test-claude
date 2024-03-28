import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";

export const HEADER_COLUMNS: GridColDef[] = [{
  field: 'code',
  headerName: 'Code',
  align: 'left',
  sortable: false
}, {
  field: 'total',
  headerName: 'Total Quantity',
  align: 'left',
  sortable: false,
  valueGetter: (params: any) => `${params?.items?.length}`,
}, {
  field: 'promisedBy',
  headerName: 'Promised By',
  align: 'left',
  sortable: false,
  valueGetter: (params: any) => `${dayjs(params?.promisedBy).format('MMM D, YYYY hh:mm A')}`,
}]