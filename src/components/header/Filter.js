import styled from 'styled-components';
import { FilterInput } from './FilterInput';
import { useData } from '../providers';
import { FilterGroup } from './FilterGroup';
import { useState, useCallback, useMemo } from 'react';
import debounce from 'lodash.debounce';
import { ResetButton } from './ResetButton';

export function Filter() {
  const { updateFilters } = useData();
  const filterOptions = {
    gender: ['Male', 'Female', 'Genderless', 'Unknown'],
    status: ['Alive', 'Dead', 'Unknown']
  };
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => setIsFilterOpen((prev) => !prev);

  const debouncedUpdateFilters = useMemo(() => debounce(updateFilters, 500), [
    updateFilters
  ]);

  const handleFilterChange = useCallback(
    (field) => (value) => debouncedUpdateFilters(field, value),
    [debouncedUpdateFilters]
  );

  return (
    <FilterContainer>
      <FilterHeader onClick={toggleFilter} isOpen={isFilterOpen}>
        <span>Filters »</span>
      </FilterHeader>
      <FilterFields isOpen={isFilterOpen}>
        <FilterInput
          setFilterField={handleFilterChange('name')}
          filterName="Name"
        />
        <FilterGroup
          setFilterField={handleFilterChange('status')}
          filterArray={filterOptions.status}
          label="Status"
        />
        <FilterInput
          setFilterField={handleFilterChange('species')}
          filterName="Species"
        />
        <FilterInput
          setFilterField={handleFilterChange('type')}
          filterName="Type"
        />
        <FilterGroup
          setFilterField={handleFilterChange('gender')}
          filterArray={filterOptions.gender}
          label="Gender"
        />
        <ResetButton />
      </FilterFields>
    </FilterContainer>
  );
}

const FilterContainer = styled.div`
  width: 100%;
  padding: 20px;
  background: linear-gradient(to bottom, transparent, #263750);
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  min-width: 250px;
`;

const FilterFields = styled.div`
  overflow: hidden;
  max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')};
  transition: max-height 0.3s ease;
`;

const FilterHeader = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 24px;
  color: ${({ isOpen }) => (isOpen ? '#83bf46' : '#fff')};
  font-weight: bold;
  cursor: pointer;

  & span {
    transition: color 0.3s;
  }

  & span:hover {
    color: #83bf46;
  }

  @media (max-width: 450px) {
    font-size: 20px;
  }
`;
