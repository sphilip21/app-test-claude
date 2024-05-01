import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Typography } from '@mui/material';

const CLOCK_COLOR = '#2ae9aa';

export default function Clock() {
  const [now, setNow] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs());
    }, 1000)
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Typography
        variant="body1"
        noWrap
        component="span"
        sx={{
          fontWeight: 600,
          fontSize: '1.1rem',
          color: CLOCK_COLOR,
          mr: 4,
          paddingTop: 1,
          display: { xs: 'none', sm: 'none', md: 'inline' }
        }}
      >
        {now.format('ddd MMM D, YYYY hh:mm A')}
      </Typography>
      <Typography
        variant="body1"
        noWrap
        component="span"
        sx={{
          fontWeight: 600,
          fontSize: '1.1rem',
          color: CLOCK_COLOR,
          mr: 4,
          paddingTop: 1,
          display: { xs: 'none', sm: 'inline', md: 'none' }
        }}
      >
        {now.format(' hh:mm A')}
      </Typography>
    </>
  );
}
