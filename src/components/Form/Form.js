import React, { useState ,useEffect} from "react";
import {TextField,Button,Typography,Paper} from '@material-ui/core'
import { useDispatch  } from "react-redux";
import FileBases from 'react-file-base64'
import useStyles from './style'
import { createPost ,updatePost} from "../../actions/posts";
import { useSelector } from "react-redux";
// import {useDispath} 
const Form =({currentId,setCurrentId})=>{
    const classes=useStyles()
    const post=useSelector((state)=>currentId?state.posts.find((p)=>p._id===currentId):null)
    const [postData,setPostData]=useState({
        creator:'',title:'',message:'',tags:'',selectedFile:''
    })
    useEffect(()=>{
        if(post) setPostData(post)
    },[post])
    const dispatch=useDispatch()

    const clear=()=>{
        setCurrentId (null)
        setPostData({
            creator:'',title:'',message:'',tags:'',selectedFile:''
        })
    }
    const handleSubmit=(e)=>{
        console.log(postData);
        e.preventDefault()
        if(currentId){
            dispatch(updatePost(currentId,postData))
        }else{

            dispatch(createPost(postData ))
        }
        clear()
    }
    
    return (
        <Paper className={classes.paper}>
            <form  autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId ? `Updating a post` : `Create a post`}</Typography>
                <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(event)=>setPostData({...postData,creator:event.target.value})}/>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(event)=>setPostData({...postData,title:event.target.value})}/>
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(event)=>setPostData({...postData,message:event.target.value})}/>
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(event)=>setPostData({...postData,tags:event.target.value.split(', ')})}/>
                <div className={classes.fileInput}>
                    <FileBases 
                    type="file"
                    multiple={false}
                    onDone={({base64})=>setPostData({...postData,selectedFile:base64})}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" type="submit" color="primary" >Submit</Button>
                <Button className={classes.buttonSubmit} size="small" variant="contained"  color="secondary" onClick={clear}>Clear</Button>
            </form>

        </Paper>

    )
}

export default Form