
import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Breadcrumbs,
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Grid
} from '@mui/material';
// import { HEADER_COLUMNS } from './utilities/table-header-columns';
// import { CollapsibleTable } from '../../components';
import { CurrentUserContext } from '../../contexts';
import { StationsDataIF } from '../../interfaces';
import { getOrders, putOrder } from '../../services/manufacturing-api';
import OrderItemsTable from '../../components/tables/order-items-tables';
import StationSelectMenu from '../../components/station-select-button/station-select-button';
import stations from '../../features/stations';
import { blue } from '../../utils/colors';
import Link from '../../components/link/link';
import CircularProgressWithLabel from '../../components/loading/CircularProgress';
import FunctionalButtonsFob from '../../components/functional-buttons/fob';
import { generateCutLists } from '../../features/cut-lists';
import { generateBarcodes } from '../../features/barcodes';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CodeIcon from '@mui/icons-material/Code';
import StartIcon from '@mui/icons-material/Start';
import BarcodesModal from '../../components/barcodes/barcodes-modal';
import ReleaseModal from '../../components/release-modal/release-modal';
import CutListsModal from '../../components/cut-lists/cut-lists-modal';
import { getMockOrder } from '../../utils/mock-data';


function Stations() {
  const { step } = useParams();
  const currentUser = useContext(CurrentUserContext);
  const [data, setData] = useState<StationsDataIF[] | null>(null)
  const [barcodesData, setBarcodesData] = useState<any[]>([])
  const [loaded, setLoaded] = useState<boolean>(false); // used to indicate first load
  const [selected, setSelected] = useState<any[]>([]); // the currently selected table items
  const [selectedReleaseItem, setSelectedReleaseItem] = useState<any>();
  const [selectedCutItems, setSelectedCutItems] = useState<any>();

  const fetchData = useCallback(async () => {
    if (currentUser?.token) {
      const orderRes = await getOrders(currentUser?.token, step)
      setData(orderRes)
      setLoaded(true)
    }
  }, [currentUser, step])

  const handleSelectionChange = (selectionModel: any) => {
    setSelected(selectionModel);
  };

  const handleSortChange = (sortModel: any) => {
    // console.log('Sort model: ', sortModel)
    // if (sortModel.length < 1) {
    //   return;
    // }
    // const field = sortModel[0].field;
    // const direction = sortModel[0].sort == 'asc' ? 1 : -1;
  };

  const handleFilterChange = (filterModel: any) => {
    // console.log('Filter model: ', filterModel)
    // setSelected(filtrModel);
  };

  const flattenItems = (ordersData: any[]) => {
    const selectedItems : any = [];
    if (ordersData && ordersData.length > 0) {
      ordersData.forEach((order) => {
        order.items.forEach((item: any) => {
          if (selected.includes(item.id)) {
            const orderBackReference = JSON.parse(JSON.stringify(order));
            delete orderBackReference.items;
            selectedItems.push({...item, order: orderBackReference})
          }
        })
      });
    }
    return selectedItems;
  };

  useEffect(() => {
    if (currentUser) {
      fetchData()
    }
  }, [currentUser, fetchData])

  if (!step) {
    return (
      <Container maxWidth="xl">
        <h1>Stations</h1>
        <p>Please select a station</p>
        <Grid container spacing={2}>
          {stations.map((station) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={station.id}>
            <Link to={`/stations/${station.id}`}  sx={{ textDecoration: 'none' }}>
              <Card variant="outlined" sx={{
                paddingTop: 4,
                paddingBottom: 4,
                textAlign: 'center',
                border: '1px solid #777',
                transition: 'all ease-in-out .3s',
                '&:hover': {
                  border: '1px solid dodgerblue'
                },
                '&:active': {
                  border: '1px solid dodgerblue',
                  background: blue[500],
                  color: '#fff'
                }
              }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {station.label}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    )

  }

  // Loading display if no data
  if (!loaded && data === null) {
    return (
      <Box sx={{ position: 'fixed', top: '30%', width: '100vw', textAlign: 'center' }}>
        <CircularProgressWithLabel label={'loading ...'}/>
      </Box>
    );
  }

  // Converts orders data to array of items
  const items : any = [];
  if (data && data.length > 0) {
    data?.forEach((order) => {
      order.items.forEach((item) => {
        if (item.stations[step] > 0) {
          const orderBackReference = JSON.parse(JSON.stringify(order));
          delete orderBackReference.items;
          items.push({...item, order: orderBackReference})
        }
      })
    });
  }

  let actions: any = [
    {
      icon: <StartIcon />,
      name: 'Release',
      handler: () => {
        const selectedItems : any = flattenItems(data || []);
        setSelectedReleaseItem(selectedItems);
      }
    },
  ];

  if (step === 'preproduction' || step === 'cut') {
    actions.push({
      icon: <QrCode2Icon />,
      name: 'Barcodes',
      handler: () => {
        const selectedItems : any = flattenItems(data || []);
        const barcodes = generateBarcodes(selectedItems);
        console.log('barcodes', barcodes);
        setBarcodesData(barcodes);
      }
    });
    actions.push({
      icon: <ListAltIcon />,
      name: 'CutLists',
      handler: () => {
        const selectedItems : any = flattenItems(data || []);
        console.log('cut-list items:', selectedItems);
        // generateCutLists(selectedItems);
        setSelectedCutItems(selectedItems);
      }
    });
  }

  if (step === 'preproduction' && ['luke', 'josh', 'leah'].includes(`${currentUser?.username}`)) {
    actions.push({
      icon: <CodeIcon />,
      name: 'DEV Create Order',
      handler: () => {
        // do put request to create test order
        if (currentUser?.token) {
          const mockOrder = getMockOrder();
          putOrder(mockOrder, currentUser?.token);
        }
      }
    });
  }

  return (
    <div className="">
      <Box sx={{ mt: 1, mb: 1, ml: 1}}>
      <Breadcrumbs separator="›" aria-label="breadcrumb" >
        <Typography>Stations</Typography>
        <StationSelectMenu currentStation={step.toLowerCase()} />
      </Breadcrumbs>
      </Box>
      {/*<CollapsibleTable data={data} headerColumns={HEADER_COLUMNS}/>*/}
      <FunctionalButtonsFob actions={actions} />
      <OrderItemsTable
        rows={items}
        station={step}
        onSelectionChange={handleSelectionChange}
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange} />
      <CutListsModal
        data={selectedCutItems}
        onGenerate={generateCutLists}
        onClose={() => setSelectedCutItems(null)}
      />
      <BarcodesModal data={barcodesData} />
      <ReleaseModal
        items={selectedReleaseItem}
        station={step}
        onClose={() => setSelectedReleaseItem(undefined)}
        onReleaseComplete={fetchData}
      />
    </div>
  );
}

export default Stations;
