import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Checkbox, Input, InputNumber, Modal, Rate, Select, Switch } from 'antd';
import React, { useState, useEffect } from 'react';

const ModalToAddTodo = ({openModalToAdd, setOpenModalToAdd, addTodo}) => {
    const initialState={
        taskName:"",
        taskDetail:"",
        updatedOn: new Date().toLocaleDateString()
    }
    const [newTodoDetails, setNewTodoDetails]= useState(initialState)

    const resetTodo = () =>{
        setNewTodoDetails(initialState)
    }

    const {importance=0, canBeCounted=false, count=0, repeatOn=[], canBeRepeated=false, repeatAfter=0, done=false,pinned=false} = newTodoDetails

    const daysOfWeek = [
        { label: "Sun", value: "Sunday" },
        { label: "Mon", value: "Monday" },
        { label: "Tue", value: "Tuesday" },
        { label: "Wed", value: "Wednesday" },
        { label: "Thu", value: "Thursday" },
        { label: "Fri", value: "Friday" },
        { label: "Sat", value: "Saturday" }
      ];

    const handleCountSelected = (slider) =>{
        let updatedTodoDetails = {...newTodoDetails}

        if(slider){
            //Add the params
            updatedTodoDetails["importance"]=5
            updatedTodoDetails["canBeCounted"]=true
            updatedTodoDetails["count"]=0
            updatedTodoDetails["repeatOn"]=Object.values(daysOfWeek)
        }
        else{
            // Remove params
            delete updatedTodoDetails["importance"]
            delete updatedTodoDetails["canBeCounted"]
            delete updatedTodoDetails["count"]
            delete updatedTodoDetails["repeatOn"]
        }

        // Remove params
        delete updatedTodoDetails["canBeRepeated"]
        delete updatedTodoDetails["repeatAfter"]
        delete updatedTodoDetails["done"]
        delete updatedTodoDetails["pinned"]

        console.log(updatedTodoDetails)

        setNewTodoDetails({...updatedTodoDetails})
    }

    const handleRepeatSelected = (slider) =>{
        let updatedTodoDetails = {...newTodoDetails}

        if(slider){
            //Add the params
            updatedTodoDetails["importance"]=1
            updatedTodoDetails["canBeRepeated"]=true
            updatedTodoDetails["repeatAfter"]=0
            updatedTodoDetails["done"]=false
            updatedTodoDetails["pinned"]=false
        }else{
            delete updatedTodoDetails["importance"]
            delete updatedTodoDetails["canBeRepeated"]
            delete updatedTodoDetails["repeatAfter"]
            delete updatedTodoDetails["done"]
            delete updatedTodoDetails["pinned"]
        }
        // Remove params
        delete updatedTodoDetails["canBeCounted"]
        delete updatedTodoDetails["count"]
        delete updatedTodoDetails["repeatOn"]

        

        setNewTodoDetails({...updatedTodoDetails})
    }
    
    return ( 
        <Modal 
            title={"Add ToDo"}
            centered
            open={openModalToAdd}
            onOk={() => setOpenModalToAdd(false)}
            onCancel={() => setOpenModalToAdd(false)}
            afterClose={()=>resetTodo()}
            width={600}
            footer={[
                <Button key="cancel" onClick={()=>{setOpenModalToAdd(false)}} shape='circle'>
                    <CloseOutlined />
                </Button>,
                <Button key="submit" onClick={()=>{addTodo(newTodoDetails) ;setOpenModalToAdd(false)}} shape='circle' disabled={!(newTodoDetails.taskName.length && (canBeCounted || canBeRepeated))}>
                    <UploadOutlined />
                </Button>
            ]}
        > 
            Title <Input value={newTodoDetails.taskName} onChange={(e)=> setNewTodoDetails({...newTodoDetails, taskName:e.target.value})} />
            Description <Input value={newTodoDetails.taskDetail} onChange={(e)=> setNewTodoDetails({...newTodoDetails, taskDetail:e.target.value})} />
            Keep Count: <Switch defaultChecked={false} value={canBeCounted} onChange={(checked)=>handleCountSelected(checked)}/>
            Once / Repeat: <Switch defaultChecked={false} value={canBeRepeated} onChange={(checked)=>handleRepeatSelected(checked)}/>
            {importance && <><br/>Importance: <Rate disabled={canBeCounted} value={importance} onChange={(value)=>{setNewTodoDetails({...newTodoDetails, importance:value})}}/></> || <></>}
            {canBeRepeated && <><br/>Repeat After: <InputNumber value={repeatAfter} min={0} max={366} onChange={(value)=>{setNewTodoDetails({...newTodoDetails, repeatAfter:value})}}/></> || <></>}
            {canBeRepeated && <><br/>Done: <Checkbox defaultChecked={done} checked={done} onChange={(e)=>{setNewTodoDetails({...newTodoDetails, done:e.target.checked})}}/></> || <></>}
            {canBeRepeated && <><br/>Pinned: <Checkbox defaultChecked={pinned} checked={pinned} onChange={(e)=>{setNewTodoDetails({...newTodoDetails, pinned:e.target.checked})}}/></> || <></>}
            {canBeCounted && <>
                <br/>
                Repeat On:
                <Select 
                    mode="multiple"
                    allowClear={false}
                    style={{ width: '100%' }}
                    placeholder="Please select days"
                    defaultValue={repeatOn}
                    value={repeatOn}
                    onChange={(value)=>setNewTodoDetails({...newTodoDetails, repeatOn:value.length ? value:repeatOn})}
                    options={daysOfWeek}
                />
            </> || <></>}
        </Modal>
    );
}
 
export default ModalToAddTodo;