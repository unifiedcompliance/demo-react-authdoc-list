import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchGeographyHierarchyStart,
  fetchSMHierarchyStart
} from '../../store/actions/documentList';

import { HIERARCHY_GEOGRAPHY, HIERARCHY_SUBJECT_MATTER } from '../../store/constant';

import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Divider, Typography, CircularProgress, Dialog } from '@material-ui/core';
import SearchBar from "material-ui-search-bar";
import Hierarchy from "../../components/Hierarchy";
import AuthorityDocumentCard from '../../parts/AuthorityDocumentCard';
import styles from './styles';

const useStyles = makeStyles(
  {
    hierarchyOptionRoot: {
      width: '160px',
      marginLeft: '8px',
      '&$selected': {
        color: '#ffffff',
        backgroundColor: '#3f51b5'
      }
    },
    selected: {}
  }
)

const AuthorityDocuments = () => {
  const classes = useStyles();
  const [searchKey, setSearchKey] = useState('');
  const [searchVal, setSearchVal] = useState('');
  const [isFiltering, setIsFiltering] = useState(false);
  const [hierarchy, setHierarchy] = useState(HIERARCHY_GEOGRAPHY);
  const [openCardDlg, setOpenCardDlg] = useState(false);
  const [cardDocId, setCardDocId] = useState();
  const dispatch = useDispatch();

  const {
    geographyTreeList,
    isLoadingStatus,
  } = useSelector((state) => state.documentList);
  
  const handleHierarchy = async (newHierarchy) => {
    setHierarchy(newHierarchy);
    switch (newHierarchy) {
      case HIERARCHY_GEOGRAPHY:
        dispatch(fetchGeographyHierarchyStart({ isFiltering }));
        break;
      case HIERARCHY_SUBJECT_MATTER:
        dispatch(fetchSMHierarchyStart({ isFiltering }));
        break;
      default:
        break;
    }
  };

  const handleSearch = () => {
    setSearchKey(searchVal);
    searchKey === '' ? setIsFiltering(false) : setIsFiltering(true);
  }

  const onShowDocumentCard = (docId) => {
    setCardDocId(docId);
    setOpenCardDlg(true);
  }

  useEffect(() => {
    dispatch(fetchGeographyHierarchyStart({ isFiltering }));
  }, [dispatch, isFiltering]);

  return (
    <>
      <Box width='100%' mt={8} display="flex" p={2} boxSizing="border-box">
        <SearchBar
          placeholder="Search Authority Documents"
          size="small"
          type="search"
          variant="outlined"
          style={{ flexGrow: 1 }}
          onChange={(val) => setSearchVal(val)}
          onRequestSearch={() => handleSearch()}
        />
      </Box>
      <Divider />
      <Box display='flex' alignItems="center" p={2} py={1}>
        <Typography variant="h5" style={{marginRight: '20px', color: 'rgba(0,0,0,0.87)'}} >Or show hierarchy by</Typography>
        <div>
          <Button variant="contained" color={hierarchy === HIERARCHY_GEOGRAPHY ? 'primary' : 'default'} classes={{root: classes.hierarchyOptionRoot}} onClick={() => handleHierarchy(HIERARCHY_GEOGRAPHY)}>GEOGRAPHY</Button>
          <Button variant="contained" color={hierarchy === HIERARCHY_SUBJECT_MATTER ? 'primary' : 'default'} classes={{root: classes.hierarchyOptionRoot}} onClick={() => handleHierarchy(HIERARCHY_SUBJECT_MATTER)}>SUBJECT MATTER</Button>
        </div>
      </Box>
      <div className="documents">
        <Hierarchy
            viewType="double"
            treeLabel="Categories and Authority Documents"
            selectedTreeLabel="Selected Authority Documents"
            filterKey={searchKey}
            treeItems={geographyTreeList}
            handleInfoItem={onShowDocumentCard}
        />
      </div>
      {
        openCardDlg &&
        <Dialog
          style={{maxWidth: '100%'}}
          aria-labelledby="customized-dialog-title"
          onClose={() => setOpenCardDlg(false)}
          open={openCardDlg}
          fullWidth={true}
          maxWidth="xl"
        >
          <AuthorityDocumentCard onClose={() => setOpenCardDlg(false)} cardDocId={cardDocId} />
        </Dialog>
      }
      
      {
        isLoadingStatus && 
        <>
          <div className="spinner-overlay">
            <div className="spinner-wrapper">
              <CircularProgress size={80} />
            </div>
          </div>
        </>
      }
      <style jsx>{styles}</style>
    </>
  )
}

export default AuthorityDocuments;
