import React, { useContext, useEffect, useState } from 'react';
import { getOrders } from '../../services/manufacturing-api';
import OrdersTable from '../../components/tables/orders-table';
import { Box, Breadcrumbs, Typography } from '@mui/material';
import CircularProgressWithLabel from '../../components/loading/CircularProgress';
import Link from '../../components/link/link';
import { CurrentUserContext } from '../../contexts';


export default function Orders() {
  const currentUser: any = useContext(CurrentUserContext);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]); // eslint-disable-line @typescript-eslint/no-unused-vars

  const handleSelectionChange = (selectionModel: any) => {
    setSelected(selectionModel);
  };

  const loadOrders = async () => {
    let ordersResponse = await getOrders(currentUser?.token);
    setOrders(ordersResponse);
    setLoaded(true);
  };

  useEffect(() => {
    loadOrders();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  /* TODO - revisit this linter rule */

  if (!loaded) {
    return (
      <Box sx={{ position: 'fixed', top: '30%', width: '100vw', textAlign: 'center' }}>
        <CircularProgressWithLabel label={'loading ...'}/>
      </Box>
    );
  }

  return (
    <div className="">
      <Box className="orders-page-header" sx={{padding: 2}}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">All Orders</Typography>
        </Breadcrumbs>
      </Box>
      <OrdersTable rows={orders} onSelectionChange={handleSelectionChange} />

    </div>
  );
}
