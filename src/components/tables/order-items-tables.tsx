import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import TouchCheckbox from './touch-checkbox';


interface Props {
  rows: any[];
  onSelectionChange: any;
  onSortChange: any;
  onFilterChange: any;
  station: string;
}

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const options: any = {
  year: '2-digit',
  month: '2-digit',
  day: '2-digit'
};

const columns = (station: string) => {
  // Create the columns
  return [
    {
      field: 'id',
      headerName: 'Item ID',
      width: 100
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 280
    },
    {
      field: 'ref',
      headerName: 'Ref. No',
      width: 80,
      valueGetter: (params: any) => {
        return params.row?.order?.ref
      }
    },
    {
      field: 'code',
      headerName: 'Code',
      width: 70,
      valueGetter: (params: any) => {
        return params.row?.order?.code
      }
    },
    {
      field: 'promisedBy',
      headerName: 'Promised By',
      type: 'date',
      width: 150,
      valueGetter: (params: any) => {
        return new Date(params.row?.order?.promisedBy);
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
      field: 'material',
      headerName: 'Material',
      width: 120
    },
    {
      field: 'profile',
      headerName: 'Profile',
      width: 80
    },
    {
      field: 'cutMethod',
      headerName: 'Cut Method',
      width: 140,
      valueGetter: (params: any) => {
        if (params.row?.workflow?.cutMethod === "1") {
          return "Saw"
        }
        else if (params.row?.workflow?.cutMethod === "2") {
          return "Punch"
        }
        else  {
          return `Unknown [${params.row?.workflow?.cutMethod}]`
        }
      }
    },
    {
      field: 'd2d',
      headerName: 'D2D',
      width: 70,
      valueGetter: (params: any) => {
        return params.row?.dimensions.dart2dart ? 'Y' : 'N';
      }
    },
    {
      field: 'quantity',
      headerName: 'Total Qty',
      width: 90
    },

    {
      field: 'stationQty',
      headerName: 'Station Qty',
      width: 90,
      valueGetter: (params: any) => {
        return params.row?.stations[station];
      }
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 180,
      valueGetter: (params: any) => {
        return params.row?.order?.status
      }
    },
  ];
};

export default function OrderItemsTable({
  rows,  station,
  onSelectionChange, onSortChange, onFilterChange
}: Props) {
  return (<>
    <DataGrid
        sx={{height: 'calc(100vh - 64px - 50px)'}}
        rows={rows.map(o => ({ ...o, id: o.id.toString() }))}
        columns={columns(station)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 100 },
          },
        }}
        pageSizeOptions={[25, 50, 100]}
        checkboxSelection
        onRowSelectionModelChange={onSelectionChange}
        onSortModelChange={onSortChange}
        onFilterModelChange={onFilterChange}
        slots={{ toolbar: GridToolbar, baseCheckbox: TouchCheckbox }}
      />
  </>);
}
