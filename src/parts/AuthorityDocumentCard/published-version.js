import React from "react";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const PublishedVersion = ({ data }) => {
  return (
    <Card style={{ width: "100%" }} variant="outlined">
      <CardContent>
        <Typography
          style={{ fontWeight: "bold" }}
          color="textSecondary"
          gutterBottom
        >
          Published Version
        </Typography>
        <Grid container>
          <Grid item xs={3} sm={3}>
            <Box display="flex" alignItems="center">
              <Typography style={{ fontWeight: "bold" }}>
                Type:
              </Typography>
              <Typography style={{ marginLeft: 8 }}>
                {data.document_type ? data.document_type : 'unknown' }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3} sm={3}>
            <Box display="flex" alignItems="center">
              <Typography style={{ fontWeight: "bold" }}>
                Availability:
              </Typography>
              <Typography style={{ marginLeft: 8 }}>
                {data.availability ? data.availability : 'unknown'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography style={{ fontWeight: "bold" }}>
                Language:
              </Typography>
              <Typography style={{ marginLeft: 8 }}>
                {data.language ? data.language : 'unknown'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box display="flex" my={2} width="fit-content">
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Typography style={{ marginBottom: 8, fontWeight: "Bold", height: 30, display: 'flex', alignItems: 'center' }}>
              Website Publisher or Periodical Title:
            </Typography>
            <Typography style={{ marginBottom: 8, fontWeight: "Bold", height: 30, display: 'flex', alignItems: 'center' }}>
              Volume or Issue:
            </Typography>
            <Typography style={{ marginBottom: 8, fontWeight: "Bold", height: 30, display: 'flex', alignItems: 'center' }}>
              Published Date:
            </Typography>
          </Box>
          <Box display="flex" ml={1} flexDirection="column" alignItems="flex-start">
            <Typography style={{ marginBottom: 8, fontWeight: 400, height: 30, display: 'flex', alignItems: 'center' }}>
              {data.calculated_publisher_title ? data.calculated_publisher_title : 'unknown'}
            </Typography>
            <Typography style={{ marginBottom: 8, fontWeight: 400, height: 30, display: 'flex', alignItems: 'center' }}>
              { (data.volume || data.vomlume_issue )? data.vomlume_issue + data.vomlume_issue : 'unknown' }
            </Typography>
            <Typography style={{ marginBottom: 8, fontWeight: 400, height: 30, display: 'flex', alignItems: 'center' }}>
              {data.published_date ? data.published_date : 'unknown'}
            </Typography>
          </Box>
        </Box>
        <Card style={{ width: "100%" }} variant="outlined">
          <CardContent>
            <Typography
              style={{ fontWeight: "bold" }}
              color="textSecondary"
              gutterBottom
            >
              Locator Information
            </Typography>
            <Grid container>
              <Grid item xs={6} sm={3}>
                <Box display="flex" alignItems="center">
                  <Typography style={{ fontWeight: "bold" }}>
                    ISBN:
                  </Typography>
                  <Typography style={{ marginLeft: 8 }}>
                    {data.isbn ? data.isbn : 'unknown'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={8}>
                <Box display="flex" width="fit-content">
                  <Box display="flex" flexDirection="column" alignItems="flex-end">
                    <Typography style={{ marginBottom: 8, fontWeight: "Bold", height: 30, display: 'flex', alignItems: 'center' }}>
                      UUID:
                    </Typography>
                    <Typography style={{ marginBottom: 8, fontWeight: "Bold", height: 30, display: 'flex', alignItems: 'center' }}>
                      Search Info:
                    </Typography>
                  </Box>
                  <Box display="flex" ml={1} flexDirection="column" alignItems="flex-start">
                    <Typography style={{ marginBottom: 8, fontWeight: 400, height: 30, display: 'flex', alignItems: 'center' }}>
                      {data.uuid ? data.uuid : 'unknown'}
                    </Typography>
                    <Typography style={{ marginBottom: 8, fontWeight: 400, height: 30, display: 'flex', alignItems: 'center' }}>
                      {data.search_information ? data.search_information : 'unknown'}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Box display="flex" flexDirection="column" alignItems="flex-end" mt={1} width="fit-content">
              <Box display="flex" alignItems="center">
                {
                  data.url && <Typography style={{ fontWeight: "bold" }}>URL:</Typography>
                }
                {
                  data.url && <Typography style={{ marginLeft: '5px' }}>{data.url ? data.url : 'unknown'}</Typography>
                }
                
              </Box>
              <Box display="flex" alignItems="center">
                {
                  data.doi &&
                  <Typography style={{ fontWeight: "bold" }}>
                    DOI:
                  </Typography>
                }
                {
                  data.doi &&
                  <Typography style={{ marginLeft: '5px' }}>{ data.doi ? data.doi : 'unknown' }</Typography>
                }
              </Box>
            </Box>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default PublishedVersion;
