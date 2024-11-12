import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useData } from '../providers';

export function FilterGroup({ setFilterField, filterArray, label }) {
  const { reset } = useData();
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    if (reset) {
      setSelectedValue('');
    }
  }, [reset]);

  const handleChange = (value) => {
    setSelectedValue(value);
    setFilterField(value);
  };

  return (
    <FilterGroupContainer>
      <FilterLabel>{label}</FilterLabel>
      <FilterGroupFields>
        {filterArray.map((radio) => (
          <FilterOption key={radio}>
            <FilterRadio
              type="radio"
              name={label}
              value={radio}
              checked={selectedValue === radio}
              onChange={() => handleChange(radio)}
            />
            <span>{radio}</span>
          </FilterOption>
        ))}{' '}
      </FilterGroupFields>
    </FilterGroupContainer>
  );
}

const FilterGroupContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: top;
`;

const FilterLabel = styled.div`
  width: 70px;
  margin-right: 20px;
  color: #83bf46;
  font-size: 20px;
  font-weight: bold;

  @media (max-width: 450px) {
    font-size: 16px;
  }
`;

const FilterGroupFields = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const FilterOption = styled.label`
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 16px;
  margin-right: 40px;
  margin-bottom: 0px;

  @media (max-width: 800px) {
    margin-bottom: 8px;
  }
`;

const FilterRadio = styled.input`
  width: 20px;
  height: 20px;
  background: none;
  border: 2px solid rgb(131, 191, 70);
  border-radius: 4px;
  margin-right: 10px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:checked {
    background-color: rgba(131, 191, 70, 0.5);
    border-color: #83bf46;
  }
`;
