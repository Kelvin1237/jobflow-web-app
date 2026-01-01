import styled from "styled-components";

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  align-items: center;
  .logo {
    display: flex;
    margin: 0 auto;
    margin-bottom: 1.38rem;
    align-items: center;
    gap: 1.5rem;
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
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-600);
  }
  h4 {
    text-align: center;
    margin-bottom: 1.38rem;
  }
  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
  }
  .btn {
    margin-top: 1rem;
    font-weight: 700;
  }
  .member-btn {
    color: var(--primary-600);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
  }
`;
export default Wrapper;
