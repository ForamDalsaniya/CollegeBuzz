import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import axios from 'axios';
import { apis } from '../../api/Api';
import { toast } from 'react-toastify';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const showToastMsg = (e) => {
    toast.success(e, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const markApprove = (e,val) => {
    axios.put(`${apis.markarticleapprove}/${val}`).then(
      (res)=>{
        showToastMsg(res.data);
        props.check();
      }
    )
  }

  return (
    <Card sx={{ width: 340, boxShadow:'0 0 10px #43b3ae' }}>
      <CardHeader
      // color='#43b3ae'
        title={<Typography sx={{color: '#43b3ae', fontWeight:'bold'}} fontSize={25}>{props.title}</Typography>}
        // subheader={`posted on: ${props.postedon}`}
      />
      <CardMedia
        component="img"
        height="194"
        // width="340"
        image={props.pic}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" >
         {props.content}
        </Typography>
      </CardContent>
      <CardActions sx={{margin:'auto', justifyContent:'space-between'}}>
        <Typography variant='body2' color="text.secondary">posted by: {props.user}</Typography>
        <Typography variant='body2' color="text.secondary">posted on: {props.postedon}</Typography>
      </CardActions>
      {props.approve === false?
      <CardActions>
        <Button variant='contained' sx={{alignItems:'center',margin:'auto',backgroundColor:'#43b3ae'}} onClick={(e)=>markApprove(e,props.id)}>Mark Approve</Button>
      </CardActions>
      :""
}
    </Card>
  );
}