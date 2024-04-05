import React, { useEffect, useState } from 'react';
import { FormControlLabel, Checkbox, FormGroup } from '@mui/material';

interface CheckboxButtonsProps {
    items: string[];
    checked: string[];
    onChange: (items: string[]) => void;
    clear?: boolean;
}

const CheckboxButtons: React.FC<CheckboxButtonsProps> = ({ items, checked, onChange, clear = false }) => {
    const [isChecked, setIsChecked] = useState<boolean[]>([]);

    useEffect(() => {
        // Initialize isChecked state based on checked prop
        if (checked && checked.length > 0) {
            const initialCheckedState = items.map(item => checked.includes(item));
            setIsChecked(initialCheckedState);
        }
    }, [items, checked]);

    useEffect(() => {
        // Reset isChecked state when clear prop changes
        if (clear) {
            const initialCheckedState = items.map(() => false);
            setIsChecked(initialCheckedState);
        }
    }, [clear, items]);

    const handleCheckboxChange = (index: number) => {
        const updatedChecked = [...isChecked];
        updatedChecked[index] = !isChecked[index];
        setIsChecked(updatedChecked);
        onChange(items.filter((_, i) => updatedChecked[i]));
    };

    return (
        <FormGroup>
            {items.map((item, index) => (
                <FormControlLabel
                    key={index}
                    control={
                        <Checkbox
                            checked={isChecked[index] || false}
                            onChange={() => handleCheckboxChange(index)}
                        />
                    }
                    label={item}
                />
            ))}
        </FormGroup>
    );
};

export default CheckboxButtons;
