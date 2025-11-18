import React from 'react';
import {
  Box,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';

import SwapVertIcon from '@mui/icons-material/SwapVert'; 
// ✅ Removed SortByAlphaIcon – not used, causing error

function FilterControls({
  companies,
  filters,
  setFilters,
  sortBy,
  setSortBy,
  sortDir,
  setSortDir,
  locations,
  industries,
}) {
  const onNameChange = (e) => setFilters((f) => ({ ...f, name: e.target.value }));
  const onLocationChange = (e) => setFilters((f) => ({ ...f, location: e.target.value }));
  const onIndustryChange = (e) => setFilters((f) => ({ ...f, industry: e.target.value }));

  return (
    <Box sx={{ mb: 2 }}>
      <Grid container spacing={2} alignItems="center">
        
        {/* Search */}
        <Grid item xs={12} sm={5}>
          <TextField
            label="Search name / location / industry"
            value={filters.name}
            onChange={onNameChange}
            fullWidth
            variant="outlined"
          />
        </Grid>

        {/* Location */}
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Location</InputLabel>
            <Select value={filters.location} label="Location" onChange={onLocationChange}>
              {locations.map((loc) => (
                <MenuItem key={loc || '__all__'} value={loc}>
                  {loc || 'All'}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Industry */}
        <Grid item xs={12} sm={2}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Industry</InputLabel>
            <Select value={filters.industry} label="Industry" onChange={onIndustryChange}>
              {industries.map((ind) => (
                <MenuItem key={ind || '__all__'} value={ind}>
                  {ind || 'All'}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Sorting Controls */}
        <Grid item xs={12} sm={2} container justifyContent="flex-end" spacing={1}>
          <Grid item>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Sort</InputLabel>
              <Select
                value={sortBy}
                label="Sort"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="location">Location</MenuItem>
                <MenuItem value="industry">Industry</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item>
            <Tooltip title={`Order: ${sortDir === 'asc' ? 'Ascending' : 'Descending'}`}>
              <IconButton
                onClick={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
                size="large"
              >
                <SwapVertIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>

      </Grid>
    </Box>
  );
}

export default FilterControls;


// import React from 'react';
// import { Box, TextField, MenuItem, FormControl, InputLabel, Select, Grid } from '@mui/material';

// function FilterControls({ companies, filters, setFilters, sort, setSort }) {
//   const locations = Array.from(new Set(companies.map((c) => c.location)));
//   const industries = Array.from(new Set(companies.map((c) => c.industry)));

//   return (
//     <Box sx={{ mb: 2 }}>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={4}>
//           <TextField
//             label="Search Name"
//             value={filters.name}
//             onChange={(e) => setFilters((f) => ({ ...f, name: e.target.value }))}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12} sm={3}>
//           <FormControl fullWidth>
//             <InputLabel>Location</InputLabel>
//             <Select
//               value={filters.location}
//               label="Location"
//               onChange={(e) => setFilters((f) => ({ ...f, location: e.target.value }))}
//             >
//               <MenuItem value="">All</MenuItem>
//               {locations.map((loc) => (
//                 <MenuItem key={loc} value={loc}>{loc}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={3}>
//           <FormControl fullWidth>
//             <InputLabel>Industry</InputLabel>
//             <Select
//               value={filters.industry}
//               label="Industry"
//               onChange={(e) => setFilters((f) => ({ ...f, industry: e.target.value }))}
//             >
//               <MenuItem value="">All</MenuItem>
//               {industries.map((ind) => (
//                 <MenuItem key={ind} value={ind}>{ind}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={2}>
//           <FormControl fullWidth>
//             <InputLabel>Sort By</InputLabel>
//             <Select
//               value={sort}
//               label="Sort By"
//               onChange={(e) => setSort(e.target.value)}
//             >
//               <MenuItem value="name">Name</MenuItem>
//               <MenuItem value="location">Location</MenuItem>
//               <MenuItem value="industry">Industry</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

// export default FilterControls;
