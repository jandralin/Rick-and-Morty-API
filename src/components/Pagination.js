import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useData } from './providers';

export function Pagination() {
  const [pages, setPages] = useState([]);
  const { info, activePage, setActivePage, updateFilters } = useData();

  const pageClickHandler = (index) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateFilters('page', index + 1);
    setActivePage(index + 1);
  };

  useEffect(() => {
    const createdPages = Array.from({ length: info.pages }, (_, i) => i + 1);
    setPages(createdPages);
  }, [info]);

  if (pages.length <= 1) return null;

  return (
    <StyledPagination>
      {pages[activePage - 2] && (
        <>
          {activePage - 2 !== 0 && (
            <>
              <Page onClick={() => pageClickHandler(0)}>« First</Page>
              <Ellipsis>...</Ellipsis>
            </>
          )}

          <Page onClick={() => pageClickHandler(activePage - 2)}>
            {activePage - 1}
          </Page>
        </>
      )}

      <Page active>{activePage}</Page>

      {pages[activePage] && (
        <>
          <Page onClick={() => pageClickHandler(activePage)}>
            {activePage + 1}
          </Page>

          {activePage !== pages.length - 1 && (
            <>
              <Ellipsis>...</Ellipsis>
              <Page onClick={() => pageClickHandler(pages.length - 1)}>
                Last »
              </Page>
            </>
          )}
        </>
      )}
    </StyledPagination>
  );
}

const StyledPagination = styled.div`
  width: 100%;
  text-align: center;
`;

const Page = styled.span`
  color: #fff;
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  transition: color 0.2s;
  color: ${({ active }) => (active ? '#83bf46' : '#fff')};

  &:hover {
    color: #83bf46;
  }
`;

const Ellipsis = styled(Page)`
  cursor: default;

  &:hover {
    color: #fff;
  }
`;
