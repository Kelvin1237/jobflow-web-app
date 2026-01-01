import styled from "styled-components";

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%;
    }
     /*FOR THE LOGO COMPONENT */
  .navLogo {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin: 0 auto;
    justify-content: center;
    margin-bottom: 2rem;
  }
  .logoH1 {
    margin-bottom: 0;
    font-size: 1.75rem;
    color: var(--primary-600);
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-600);
    }
    margin-bottom: 0rem;
  }

  /**/
  }
`;
export default Wrapper;
