import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function CircularProgressWithLabel(
  props: CircularProgressProps & { label: string },
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress size={220} thickness={1.0} color="primary" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          sx={{ fontSize: '1.8rem', fontWeight: 300 }}
        >{props.label}</Typography>
      </Box>
    </Box>
  );
}
