import Checkbox from '@mui/material/Checkbox';

export default function TouchCheckbox(props: any) {
  return (
    <Checkbox
      {...props}
      sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
    />
  );
}
