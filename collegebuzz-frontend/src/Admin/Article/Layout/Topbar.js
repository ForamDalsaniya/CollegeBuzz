import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ArticleAdmin from '../Article';
import { apis } from '../../../api/Api';
import PostArticle2 from '../../../Student/Article/PostArticle2';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{backgroundColor:'#3b3c36'}}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Topbar() {
  const [value, setValue] = React.useState(0);
  const [open,setOpen] = React.useState(true)
  const handleOpen = () => {
      setOpen(false)
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
// #3b3c36
  return (
    <Box sx={{ width: '100%',marginTop:8, bgcolor:'#121212' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider',bgcolor:'#121212',width:'100%' }} position={"fixed"} >
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
            sx={{
                '.css-k7y545-MuiButtonBase-root-MuiTab-root.Mui-selected':{
                    color:'#43b3ae'
                }
            }}
        >
          <Tab label="All Article" {...a11yProps(0)} sx={{color:'white'}}/>
          <Tab label="Approved Articles" {...a11yProps(1)} sx={{color:'white'}}/>
          <Tab label="Not Approved Articles" {...a11yProps(2)}sx={{color:'white'}} />
          <Tab label="Post Article" {...a11yProps(3)}sx={{color:'white'}} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ArticleAdmin url={apis.allarticle}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ArticleAdmin url={apis.approvedarticle} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ArticleAdmin url={apis.notapprovedarticle} button="true"/>
      </TabPanel>
      {open}
      <TabPanel value={value} index={3}>
        <PostArticle2 close={handleOpen}/>
      </TabPanel>
    </Box>
  );
}
