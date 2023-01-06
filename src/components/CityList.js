import React from 'react';
import './citylist.css'
import {removeCity} from "../redux/citySlice";
import {DeleteIcon} from '@chakra-ui/icons';
import { useDispatch } from "react-redux";

const CityList = (props) => {   
    const dispatch = useDispatch();

    const deleteHandler = () => {
        dispatch(removeCity(props.id))
    }

    return(        
        <div className='citytab'>
           {props.name}            
        <DeleteIcon className="icon" boxSize={4} onClick={deleteHandler}   />      
        </div>
    )
}

export default CityList;