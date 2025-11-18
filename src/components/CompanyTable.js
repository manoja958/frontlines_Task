import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  TablePagination,
  Box,
  Typography
} from '@mui/material';

function CompanyTable({ companies = [], totalCount = 0, page = 0, rowsPerPage = 5, onPageChange, onRowsPerPageChange }) {
  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="subtitle2">Name</Typography></TableCell>
              <TableCell><Typography variant="subtitle2">Location</Typography></TableCell>
              <TableCell><Typography variant="subtitle2">Industry</Typography></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {companies.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.location}</TableCell>
                <TableCell>{c.industry}</TableCell>
              </TableRow>
            ))}

            {companies.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No companies to display.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="flex-end">
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Box>
    </Paper>
  );
}

export default CompanyTable;

// import React from 'react';
// import { Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

// function CompanyTable({ companies }) {
//   return (
//     <Paper>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Name</TableCell>
//             <TableCell>Location</TableCell>
//             <TableCell>Industry</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {companies.map((c) => (
//             <TableRow key={c.id}>
//               <TableCell>{c.name}</TableCell>
//               <TableCell>{c.location}</TableCell>
//               <TableCell>{c.industry}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Paper>
//   );
// }

// export default CompanyTable;
