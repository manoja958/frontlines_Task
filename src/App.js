import React, { useEffect, useMemo, useState } from 'react';
import CompanyTable from './components/CompanyTable';
import FilterControls from './components/FilterControls';
import { Container, Typography, CircularProgress, Alert, Box } from '@mui/material';

// simple fetch helper
const fetchCompanies = async () => {
  const res = await fetch('/companies.json');
  if (!res.ok) throw new Error('Failed to fetch companies');
  return res.json();
};

// small debounce hook
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

function App() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // filters & sort
  const [filters, setFilters] = useState({ name: '', location: '', industry: '' });
  const debouncedName = useDebounce(filters.name, 300);
  const [sortBy, setSortBy] = useState('name'); // 'name' | 'location' | 'industry'
  const [sortDir, setSortDir] = useState('asc'); // 'asc' | 'desc'

  // pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    setLoading(true);
    fetchCompanies()
      .then((data) => {
        setCompanies(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error(err);
        setError('Error fetching companies. Try again later.');
      })
      .finally(() => setLoading(false));
  }, []);

  // derived unique lists for selects
  const locations = useMemo(() => {
    const setLoc = new Set(companies.map((c) => c.location).filter(Boolean));
    return ['', ...Array.from(setLoc).sort()];
  }, [companies]);

  const industries = useMemo(() => {
    const setInd = new Set(companies.map((c) => c.industry).filter(Boolean));
    return ['', ...Array.from(setInd).sort()];
  }, [companies]);

  // filtering + sorting
  const filtered = useMemo(() => {
    let res = companies.slice();

    // filter by debounced name
    if (debouncedName && debouncedName.trim() !== '') {
      const q = debouncedName.toLowerCase();
      res = res.filter(
        (c) =>
          (c.name && c.name.toLowerCase().includes(q)) ||
          (c.location && c.location.toLowerCase().includes(q)) ||
          (c.industry && c.industry.toLowerCase().includes(q))
      );
    }

    if (filters.location) {
      res = res.filter((c) => c.location === filters.location);
    }
    if (filters.industry) {
      res = res.filter((c) => c.industry === filters.industry);
    }

    // sorting (safe string compare)
    res.sort((a, b) => {
      const A = (a[sortBy] || '').toString().localeCompare((b[sortBy] || '').toString(), undefined, { sensitivity: 'base' });
      return sortDir === 'asc' ? A : -A;
    });

    return res;
  }, [companies, debouncedName, filters.location, filters.industry, sortBy, sortDir]);

  // reset page when filters change
  useEffect(() => {
    setPage(0);
  }, [debouncedName, filters.location, filters.industry, sortBy, sortDir]);

  // pagination slice
  const pageSlice = useMemo(() => {
    const start = page * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, page, rowsPerPage]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

    return (
  <div
    style={{
      minHeight: "100vh",
      padding: "30px 0",
      background: "linear-gradient(135deg, #e3f2fd, #fce4ec)",
    }}
  >
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ mb: 3, fontWeight: "bold" }}
      >
        Companies Directory
      </Typography>

      <FilterControls
        filters={filters}
        setFilters={setFilters}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortDir={sortDir}
        setSortDir={setSortDir}
        locations={locations}
        industries={industries}
      />

      <CompanyTable companies={filtered} />

      {filtered.length === 0 && (
        <Alert sx={{ mt: 2 }} severity="info">
          No companies match your filters.
        </Alert>
      )}
    </Container>
  </div>
);

}

export default App;

// import React, { useEffect, useState } from 'react';
// import CompanyTable from './components/CompanyTable';
// import FilterControls from './components/FilterControls';
// import { Container, Typography, CircularProgress, Alert } from '@mui/material';

// const fetchCompanies = async () => {
//   const res = await fetch('/companies.json');
//   if (!res.ok) {
//     throw new Error('Failed to fetch companies');
//   }
//   return res.json();
// };

// function App() {
//   const [companies, setCompanies] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [filters, setFilters] = useState({ name: '', location: '', industry: '' });
//   const [sort, setSort] = useState('name');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchCompanies()
//       .then((data) => {
//         setCompanies(data);
//         setFiltered(data);
//       })
//       .catch(() => setError('Error fetching companies'))
//       .finally(() => setLoading(false));
//   }, []);

//   useEffect(() => {
//     let result = [...companies];
//     if (filters.name) {
//       result = result.filter((c) =>
//         c.name.toLowerCase().includes(filters.name.toLowerCase())
//       );
//     }
//     if (filters.location) {
//       result = result.filter((c) => c.location === filters.location);
//     }
//     if (filters.industry) {
//       result = result.filter((c) => c.industry === filters.industry);
//     }
//     if (sort) {
//       result.sort((a, b) => a[sort].localeCompare(b[sort]));
//     }
//     setFiltered(result);
//   }, [companies, filters, sort]);

//   if (loading) return <Container><CircularProgress /></Container>;
//   if (error) return <Container><Alert severity="error">{error}</Alert></Container>;

//   return (
//     <Container maxWidth="md" sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Companies Directory
//       </Typography>
//       <FilterControls
//         companies={companies}
//         filters={filters}
//         setFilters={setFilters}
//         sort={sort}
//         setSort={setSort}
//       />
//       <CompanyTable companies={filtered} />
//       {filtered.length === 0 && (
//         <Alert severity="info">No companies found matching your filters.</Alert>
//       )}
//     </Container>
//   );
// }

// export default App;
