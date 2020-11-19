import css from 'styled-jsx/css';

const styles = css`
  p {
    margin: 0;
  }
  .documents {
    width: 100%;
    display: flex;
    border: 1px solid #999999;
  }
  .document-tree {
    width: 50%;
    border-right: 1px solid #999999;
  }
  .tree-label {
    margin: 0;
    padding: 5px;
    border-bottom: 1px solid #999999;
    display: flex;
    justify-content: space-between;
    font-family: 'Roboto';
    color: rgba(0, 0, 0, 0.85);
  }
  .selected-list {
    width: 50%;
    box-sizing: border-box;
  }
  ul.selected-documents-list {
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  }
  li.selected-item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
    border-bottom: 1px solid #999999;
    box-sizing: border-box;
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
