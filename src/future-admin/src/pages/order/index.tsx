// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Anothers Imports
import React, { useState } from 'react'
import TableOrder from 'src/views/tables/TableOrder'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

export default function Products() {
  const [value, setValue] = useState<string>('none')

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h5'>Bảng hoá đơn</Typography>
          <FormControl>
            <InputLabel id='demo-simple-select-label'>Filter</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={value}
              label='Filter'
              onChange={handleChange}
            >
              <MenuItem value={'none'}>All</MenuItem>
              <MenuItem value={'date'}>Hôm nay</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableOrder value={value} />
        </Card>
      </Grid>
    </Grid>
  )
}
