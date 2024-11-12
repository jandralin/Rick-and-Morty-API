import styled from 'styled-components';
import { useData } from '../providers';

export function ResetButton() {
  const { triggerReset } = useData();

  return (
    <ResetButtonContainer onClick={triggerReset}>
      Reset Filters
    </ResetButtonContainer>
  );
}

const ResetButtonContainer = styled.button`
  width: 200px;
  margin-left: 0px; /* Default value for larger screens */
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #83bf46;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;

  &:hover {
    background-color: #6da73c;
  }

  @media (max-width: 800px) {
    margin-left: calc(50% - 100px);
  }

  @media (max-width: 450px) {
    font-size: 16px;
  }
`;
