import React from 'react'
import useStyles from './style'
import { Card,CardActions,CardContent,CardMedia,Button,Typography } from '@material-ui/core'
import ThumUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import {useDispatch} from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts'

function Post({post,setCurrentId}) {
    const classes=useStyles( )
    const dispatch=useDispatch()
  return (
    <Card className={classes.card}>
  <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
  <div className={classes.overlay}>
    <Typography variant='h6'>{post.creator}</Typography>
    <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
  </div>
  <div className={classes.overlay2}>
    <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
      <MoreHorizIcon fontSize='medium' />
    </Button>
  </div>
  <div className={classes.details}>
    <Typography variant='body2' color='black'>
      {post.tags.map((tag) => `#${tag}`)}
    </Typography>
  </div>
  <Typography className={classes.title} variant='h5' gutterBottom color='textSecondary'>
    {post.title}
  </Typography>
  <CardContent>
    <Typography className={classes.title} variant='small' gutterBottom color='textSecondary'>
      {post.message}
    </Typography>
  </CardContent>
  <CardActions className={classes.cardActions}>
    <Button size="small" color="primary" onClick={()=>dispatch(likePost(post._id))}>
      <ThumUpAltIcon fontSize='small'/>
      &nbsp;   Like &nbsp; {post.likeCount}
    </Button>
    <Button size="small" color="primary" onClick={()=>dispatch(deletePost(post._id))}>
      <DeleteIcon fontSize='small' />
      Delete
    </Button>
  </CardActions>
</Card>

  )
}

export default Post
