import css from 'styled-jsx/css';

const styles = css`
  p {
    margin: 0;
  }
  .documents {
    display: flex;
  }
  .spinner-overlay {
    position: fixed;
    top: 0;
    left: 0;
    background: #666666;
    opacity: 0.6;
    width: 100vw;
    height: 100%;
    min-height: 100vh;
    z-index: 9;
  }
  .spinner-wrapper {
    position: absolute;
    top: 50vh;
    left: 50vw;
    z-index: 99;
  }
`;

export default styles;
