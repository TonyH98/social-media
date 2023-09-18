import { useParams } from "react-router-dom";
import {getNotifications} from "../../Store/userActions";
import { useDispatch , useSelector } from "react-redux";
import { useState, useEffect} from "react";


function Notifications(){

const {id} = useParams()

const dispatch = useDispatch();

const note = useSelector((state) => state.note.note)

useEffect(() => {

dispatch(getNotifications(id))

}, [dispatch])



    return(
        null
    )
}

export default Notifications