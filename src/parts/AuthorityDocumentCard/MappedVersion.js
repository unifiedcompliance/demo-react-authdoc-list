import React from "react";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";

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

const MappedVersion = ({ data }) => {
  const memberName = (role) => {
    if (data.Members && data.Members['@set']) {
      for (const mem of data.Members['@set']) {
        if (role === mem.role) {
          return mem.person_name;
        }
      }
    }
    return 'unknown';
  }

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

  const memberOrganization = (role) => {
    if (data.Members && data.Members['@set']) {
      for (const mem of data.Members['@set']) {
        if (role === mem.role) {
          return mem.organization_name;
        }
      }
    }
    return 'unknown';
  }

  const roles = ['mapper', 'reviewer', 'approver'];

  return (
    <Card style={{ width: "100%" }} variant="outlined">
      <CardContent>
        <Typography
          style={{ fontWeight: "bold" }}
          color="textSecondary"
          gutterBottom
        >
          Mapped Version
        </Typography>
        <Grid container style={{marginBottom: 8}}>
          <Grid item xs={6} sm={6}>
            <Box display="flex" alignItems="center">
              <Typography style={{ fontWeight: "bold" }}>
                Reference Controls:&nbsp;
              </Typography>
              <Typography style={{ marginLeft: 5 }}>
                {data.reference_control ? data.reference_control : 'unknown'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Box display="flex" alignItems="center">
              <Typography style={{ fontWeight: "bold" }}>
                Release Date:&nbsp;
              </Typography>
              <Typography style={{ marginLeft: 5 }}>
                {data.release_date ? dateFormat(data.release_date) : 'unknown'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        {
          data.Members && roles.map((role, idx) => (
            <Grid key={idx} container style={{marginBottom: 5}}>
              <Grid item xs={6} sm={6}>
                <Grid container alignItems="center">
                  <Grid item xs={4} sm={4}>
                    <Typography
                      style={{ fontWeight: "bold", textAlign: 'right', textTransform: 'capitalize' }}
                    >
                      {role}:
                    </Typography>
                  </Grid>
                  <Grid item xs={8} sm={8}>
                    <Typography style={{ marginLeft: 5 }}>
                      { memberName(role) }
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Box display="flex" alignItems="center">
                  <Typography style={{ fontWeight: "bold" }}>
                    Organization:&nbsp;
                  </Typography>
                  <Typography style={{ marginLeft: 5 }}>
                    { memberOrganization(role) }
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          ))
        }
        <Grid container style={{marginBottom: 8}}>
          <Grid item xs={2} sm={2}>
            <Typography style={{ fontWeight: "Bold", textAlign: 'right' }}>
              URL:
            </Typography>
          </Grid>
          <Grid item xs={8} sm={8}>
            <Typography style={{ marginLeft: 5 }}>
              {data.url ? data.url : 'unknown'}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MappedVersion;
