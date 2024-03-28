import { DataGrid, GridToolbar } from '@mui/x-data-grid';


interface Props {
  rows: any[];
  onSelectionChange: any;
  station: string;
}

/*
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const options: any = {
  year: '2-digit',
  month: '2-digit',
  day: '2-digit'
};
*/

const columns = (station: string) => {
  // Create the columns
  return [
    {
      field: 'id',
      headerName: 'Item ID',
      width: 80
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 280
    },
    {
      field: 'material',
      headerName: 'Material',
      width: 80
    },
    {
      field: 'quantity',
      headerName: 'Total Qty',
      width: 80
    },
    {
      field: 'stations.cut',
      headerName: 'Cut',
      width: 60,
      valueGetter: (params: any) => {
        return params.row?.stations?.cut || 0
      }
    },
    {
      field: 'stations.load',
      headerName: 'Load',
      width: 60,
      valueGetter: (params: any) => {
        return params.row?.stations?.load || 0
      }
    },
    {
      field: 'stations.make',
      headerName: 'Make',
      width: 60,
      valueGetter: (params: any) => {
        return params.row?.stations?.make || 0
      }
    },
    {
      field: 'stations.trim',
      headerName: 'Trim',
      width: 60,
      valueGetter: (params: any) => {
        return params.row?.stations?.trim || 0
      }
    },
    {
      field: 'stations.ship',
      headerName: 'Ship',
      width: 60,
      valueGetter: (params: any) => {
        return params.row?.stations?.ship || 0
      }
    },
    {
      field: 'nSides',
      headerName: 'No. Sides',
      width: 80,
      valueGetter: (params: any) => {
        return params.row?.dimensions?.nSides
      }
    },
    {
      field: 'width',
      headerName: 'Width',
      width: 80,
      valueGetter: (params: any) => {
        return params.row?.dimensions?.width
      }
    },
    {
      field: 'length',
      headerName: 'Length',
      width: 80,
      valueGetter: (params: any) => {
        return params.row?.dimensions?.length
      }
    },

    {
      field: 'specialInstructions',
      headerName: 'Special Instructions',
      width: 280
    },
  ];
};

export default function CondensedOrderItemsTable({ rows, onSelectionChange, station }: Props) {
  return (<>
    <DataGrid
        sx={{height: '75vh'}}
        rows={rows.map(o => ({ ...o, id: o.id.toString() }))}
        columns={columns(station)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 100 },
          },
        }}
        pageSizeOptions={[25, 50, 100]}
        onRowSelectionModelChange={onSelectionChange}
        slots={{ toolbar: GridToolbar }}
      />
  </>);
}
