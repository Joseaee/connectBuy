import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CustomSelect from './components/customSelect';
import CustomSearch from './components/customSearch';
import { useFilterStore } from '../../state/filtersStore/filtersStore';
import { useCategories } from '../../hooks/useCategories';
import IconButton from '@mui/material/IconButton';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const DISTANCE_OPTIONS = [
    'All distances',
    'Very close (< 1km)',
    'Close (< 3km)',
    'Medium distance (< 5km)',
    'Far (> 5km)',
];

function SearchBar() {
    const category = useFilterStore((state) => state.category);
    const setCategory = useFilterStore((state) => state.setCategory);

    const store = useFilterStore((state) => state.store);
    const setStore = useFilterStore((state) => state.setStore);

    const distance = useFilterStore((state) => state.distance);
    const setDistance = useFilterStore((state) => state.setDistance);

    const resetFilters = useFilterStore((state) => state.resetFilters);

    const { categories } = useCategories();

    return (
        <AppBar
            style={{
                flexDirection: 'row-reverse',
                backgroundColor: '#fafafa',
                color: 'black',
            }}
            position="static"
            elevation={2}
        >
            <Toolbar>
                <IconButton title="Reset filters" style={{ backgroundColor: '#F2F2F2' }} onClick={resetFilters}>
                    <RestartAltIcon />
                </IconButton>
                <CustomSelect
                    label="Distance"
                    value={distance}
                    options={DISTANCE_OPTIONS}
                    onChange={setDistance}
                    placeholder="Distance"
                />
                <CustomSelect
                    label="Categories"
                    value={category}
                    options={categories}
                    onChange={setCategory}
                    placeholder="Categories"
                />
                <CustomSelect
                    label="Stores"
                    value={store}
                    options={['Amazon', 'eBay', 'AliExpress']}
                    onChange={setStore}
                    placeholder="Stores"
                />
                <CustomSearch />
            </Toolbar>
        </AppBar>
    );
}

export default SearchBar;
