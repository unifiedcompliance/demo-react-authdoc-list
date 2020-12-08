import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAuthorityDocumentStart
} from '../../store/actions/document';

import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";

import PublishedVersion from "./published-version";
import MappedVersion from "./MappedVersion";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  list: {
    flexGrow: 1,
    position: "relative",
    overflow: "auto",
    maxHeight: 96,
    border: "1px solid #ccc",
  },
  bigList: {
    position: "relative",
    overflow: "auto",
    maxHeight: 480,
    border: "1px solid #ccc",
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const CustomizedDialogs = ( { cardDocId, onClose } ) => {
  const dispatch = useDispatch();

  const {
    authorityDocument
  } = useSelector((state) => state.document);

  useEffect(() => {
    dispatch(fetchAuthorityDocumentStart({ cardDocId }))
  }, []);

  const dateFormat = (value) => {
    if (!value || value === 'unknown') {
      return 'unknown';
    }

    let d = new Date(value);

    if (Number.isNaN(d.getMonth())) {
      let arr = value.split(/[- :]/);
      d = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
    }

    return d.toLocaleDateString('en-US');
  };

  const classes = useStyles();
  return (
    <>
      <DialogTitle id="customized-dialog-title" onClose={onClose}>
        Authority Document Card ({cardDocId})
      </DialogTitle>
      <DialogContent dividers>
        <div>
          <Box display="flex" alignItems="center" mt={2} mb={2} mx={3}>
            <Typography style={{ fontWeight: "bold" }}>
              Official Name: 
            </Typography>
            <Typography style={{ marginLeft: 16 }}>
              {authorityDocument.official_name}
            </Typography>
          </Box>
          <Grid container spacing={4} style={{ marginBottom: 0 }}>
            <Grid item xs={12} sm={6}>
              <Box display="flex">
                <Typography style={{ marginRight: 8, fontWeight: "Bold" }}>
                  Common Names:
                </Typography>
                <List className={classes.list} dense style={{minHeight: '128px'}}>
                  { authorityDocument.CommonNames && authorityDocument.CommonNames['@set'].map((cm) => (
                      <ListItem key={cm.id}>
                        <Typography style={{fontWeight: 400}}>{cm.name}</Typography>
                      </ListItem>
                    ))
                  }
                </List>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex">
                <Box display="flex" flexDirection="column" alignItems="flex-end">
                  <Typography
                    style={{ marginBottom: 8, fontWeight: "Bold", height: 30, display: 'flex', alignItems: 'center' }}
                  >
                    Type:
                  </Typography>
                  <Typography
                    style={{ marginBottom: 8, fontWeight: "Bold", height: 30, display: 'flex', alignItems: 'center' }}
                  >
                    Pages:
                  </Typography>
                  <Typography
                    style={{ fontWeight: "Bold", height: 30, display: 'flex', alignItems: 'center' }}
                  >
                    Effective Date:
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  ml={1}
                  flexDirection="column"
                  alignItems="flex-start"
                >
                  <Typography style={{ marginBottom: 8, fontWeight: 400, height: 30, display: 'flex', alignItems: 'center' }}>
                    {authorityDocument.type ? authorityDocument.type : 'unknown'}
                  </Typography>
                  <Typography style={{ marginBottom: 8, fontWeight: 400, height: 30, display: 'flex', alignItems: 'center' }}>
                    {authorityDocument.pages ? authorityDocument.pages : 'unknown'}
                  </Typography>
                  <Typography style={{ fontWeight: 400, height: 30, display: 'flex', alignItems: 'center' }}>
                    { authorityDocument.effective_date ? dateFormat(authorityDocument.effective_date) : 'unknown' }
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Divider />
          <Grid container spacing={4} style={{ marginTop: 0 }}>
            <Grid item xs={12} sm={6}>
              <Typography style={{ fontWeight: "bold" }}>
                Authors:
              </Typography>
              <List className={classes.list} dense style={{ minHeight: 144 }}>
                { authorityDocument.Authors && authorityDocument.Authors['@set'].map((item) => (
                    <ListItem key={item.id}>
                      <Typography style={{fontWeight: 400}}>{item.author_editor_name ? item.author_editor_name : 'unknown'}</Typography>
                    </ListItem>
                  ))
                }
              </List>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography style={{ fontWeight: "bold" }}>
                Editors:
              </Typography>
              <List className={classes.list} dense style={{ minHeight: 144 }}>
                { authorityDocument.Editors && authorityDocument.Editors['@set'].map((item) => (
                    <ListItem key={item.id}>
                      <Typography style={{fontWeight: 400}}>{item.author_editor_name ? item.author_editor_name : 'unknown'}</Typography>
                    </ListItem>
                  ))
                }
              </List>
            </Grid>
            <Grid item xs={12}>
              <List className={classes.bigList}>{
                authorityDocument.ADIdentifiers && authorityDocument.ADIdentifiers['@set'].map((item, idx) => (
                  <ListItem key={idx}>
                    <PublishedVersion data={item} />
                  </ListItem>
                ))
              }
              </List>
            </Grid>
            <Grid item xs={12}>
              <List className={classes.bigList}>{
                authorityDocument.ADMappings && authorityDocument.ADMappings['@set'].map((item, idx) => (
                  <ListItem key={idx}>
                    <MappedVersion data={item} />
                  </ListItem>
                ))
              }
              </List>
            </Grid>
          </Grid>
        </div>
      </DialogContent>
    </>
  );
}

export default CustomizedDialogs;