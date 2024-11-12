import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useData } from '../providers';

export function FilterInput({ setFilterField, filterName }) {
  const { reset } = useData();
  const [value, setValue] = useState('');

  const handleValue = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    setFilterField(newValue);
  };

  useEffect(() => {
    if (reset) {
      setValue('');
    }
  }, [reset]);

  return (
    <FilterInputContainer>
      <FilterLabel>{filterName}</FilterLabel>
      <FilterInputField
        placeholder={filterName}
        value={value}
        onChange={handleValue}
      />
    </FilterInputContainer>
  );
}

const FilterInputContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

const FilterLabel = styled.div`
  min-width: 70px; /* Default width for larger screens */
  margin-right: 20px;
  color: #83bf46;
  font-size: 20px; /* Default font size for larger screens */
  font-weight: bold;

  @media (max-width: 600px) {
    min-width: 50px; /* Adjust width for smaller screens */
  }

  @media (max-width: 450px) {
    font-size: 16px; /* Smaller font size for very small screens */
  }
`;

const FilterInputField = styled.input`
  padding: 10px 15px;
  background: none;
  border: none;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.1);
  outline: none;
  color: #fff;
  width: 500px;
  font-size: 18px;

  &::placeholder {
    font-size: 18px;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 600px) {
    width: 100%;
  }

  @media (max-width: 450px) {
    font-size: 14px;

    &::placeholder {
      font-size: 14px;
    }
  }
`;
