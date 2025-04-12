import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
    value: string;
    onChange: (value: string) => void;
    options: string[];
    placeholder: string;
    label?: string;
}

const StyledSelect = styled(Select)(() => ({
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    height: '40px',
    padding: '0 10px',
    fontSize: '0.95rem',
    color: '#333',
    '& .MuiSelect-select': {
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
    },
    '& fieldset': {
        border: 'none',
    },
}));

function CustomSelect({ value, onChange, options, placeholder }: Props) {

    const handleChange = (event: SelectChangeEvent<unknown>) => {
        onChange(event.target.value as string);
    };

    return (
        <FormControl sx={{  mx: 2.5, minWidth: 140 }} size="small">
            <StyledSelect
                value={value}
                onChange={handleChange}
                displayEmpty
            >
                <MenuItem disabled value="">
                    <em>{placeholder}</em>
                </MenuItem>
                {options.map((option, idx) => (
                    <MenuItem key={idx} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </StyledSelect>
        </FormControl>
    );
}

export default CustomSelect;
