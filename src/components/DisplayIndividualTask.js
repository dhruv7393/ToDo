import React, { useState, useEffect } from 'react';
import { Card, Col, Button, Divider, Input, InputNumber, Select } from 'antd';
import { EditOutlined, CheckOutlined, PushpinOutlined, DeleteOutlined, StarOutlined, PlusCircleOutlined, MinusCircleOutlined,CloseCircleOutlined,  UploadOutlined , TwitterOutlined} from '@ant-design/icons';


const DisplayIndividualTask = ({todoToBeDisplayed, cardWidth, checkedItems, index, changeCount, handleDone, handlePinned, changeImportance, updatedRepeatDays, updatedRepeat, updatedTaskDetail, handleDelete}) => {

    const [todo, setTodo] = useState({})


    const [editTaskDeatil, setEditTaskDetail] = useState(false)
    const [taskDetailUpdated, setTaskDeatilUpdated] = useState("")

    const [editRepeat, setEditRepeat]= useState(false)
    const [repeatUpdated, setRepeatUpdated] = useState(0)

    const [editRepeatDays, setEditRepeatDays]= useState(false)
    const [repeatUpdatedDays, setRepeatUpdatedDays] = useState([])

    const daysOfWeek = [
        { label: "Sun", value: "Sunday" },
        { label: "Mon", value: "Monday" },
        { label: "Tue", value: "Tuesday" },
        { label: "Wed", value: "Wednesday" },
        { label: "Thu", value: "Thursday" },
        { label: "Fri", value: "Friday" },
        { label: "Sat", value: "Saturday" }
      ];


    useEffect(()=>{
        setTodo(todoToBeDisplayed)
    }, [todoToBeDisplayed])

    let isCountable = Object.keys(todo).includes("canBeCounted")
    const {_id="0", taskName="", taskDetail="", importance=0, canBeCounted=false, count=0, canBeRepeated=false, repeatAfter=0, repeatOn=[], done=false, pinned=false} = todo

    let toBeDisplayed =  (checkedItems["Countable"] ? canBeCounted : true) &&  (checkedItems["Repetable"] ? canBeRepeated : true) && (checkedItems["Pinned"] ? pinned : true) && (checkedItems["Done"] ? done : true)
    
    

    return toBeDisplayed && ( 
        <>
                                <Col span={cardWidth} key={_id}>
                                        <Card 
                                        key={"card"+_id}
                                            title={taskName} bordered={true}
                                            style={{marginTop:10}}
                                            extra={isCountable && (<>
                                                <MinusCircleOutlined key="subtract" onClick={()=>changeCount(index, -1)} style={{color:count<0?'#ff4d4f':'#1677ff'}}/>
                                                <Button type="text" style={{color:count<0?'#ff4d4f':'#1677ff'}}>{Math.abs(count)}</Button> 
                                                <PlusCircleOutlined key="add" onClick={()=>changeCount(index, 1)} style={{color:count<0?'#ff4d4f':'#1677ff'}}/>
                                                </>)
                                                || (<></>)}
                                            actions={[
                                                <Button key="done" onClick={()=>handleDone(index)} disabled={isCountable} type={done || isCountable ? "primary":"text"} shape='circle'>
                                                    <CheckOutlined />
                                                </Button>,
                                                <Button key="pinned" onClick={()=>handlePinned(index)} disabled={isCountable} type={pinned || isCountable ? "primary":"text"} shape='circle'>
                                                    <PushpinOutlined />
                                                </Button>,
                                                <Button key="star" onClick={()=>changeImportance(index, importance+1)} disabled={isCountable} type='text' shape='circle'>
                                                    {importance} <StarOutlined />
                                                </Button>,
                                                !editRepeat && !editRepeatDays && <Button key="Repeat" onClick={()=>{
                                                    if(isCountable){
                                                        setEditRepeatDays(true); setRepeatUpdatedDays(repeatOn)
                                                    }else{
                                                        setEditRepeat(true); setRepeatUpdated(repeatAfter)
                                                    }
                                                    
                                                    }}  type='text' shape='circle'>
                                                   {repeatAfter ? repeatAfter :""} <TwitterOutlined />
                                                </Button>||
                                                editRepeatDays && <>
                                                    <Button key="close" onClick={()=>{
                                                        setRepeatUpdatedDays(repeatOn)
                                                        setEditRepeatDays(false)
                                                    }} type='text' shape='circle'>
                                                        <CloseCircleOutlined />
                                                    </Button>
                                                    <Button key="upload" onClick={()=>{
                                                        updatedRepeatDays(index, repeatUpdatedDays)
                                                        setEditRepeatDays(false)
                                                    }} type='text' shape='circle'>
                                                        <UploadOutlined />
                                                    </Button>
                                                </>
                                                ||<>
                                                    <InputNumber defaultValue={repeatUpdated} onChange={(value)=> setRepeatUpdated(value)} min={0} max={366}/>
                                                    <Button key="close" onClick={()=>{
                                                        setRepeatUpdated(repeatAfter)
                                                        setEditRepeat(false)
                                                    }} type='text' shape='circle'>
                                                        <CloseCircleOutlined />
                                                    </Button>
                                                    <Button key="upload" onClick={()=>{
                                                        updatedRepeat(index, repeatUpdated)
                                                        setEditRepeat(false)
                                                    }} type='text' shape='circle'>
                                                        <UploadOutlined />
                                                    </Button>
                                                </>,
                                                editTaskDeatil &&  <>
                                                    <Button key="close" onClick={()=>{
                                                        setTaskDeatilUpdated(taskDetail)
                                                        setEditTaskDetail(false)
                                                    }} type='text' shape='circle'>
                                                        <CloseCircleOutlined />
                                                    </Button>
                                                    <Button key="upload" onClick={()=>{
                                                        updatedTaskDetail(index, taskDetailUpdated)
                                                        setEditTaskDetail(false)
                                                    }} type='text' shape='circle'>
                                                        <UploadOutlined />
                                                    </Button>
                                                </> ||
                                                <Button key="edit" onClick={()=>{setEditTaskDetail(true) ;setTaskDeatilUpdated(taskDetail)}} type='text' shape='circle'>
                                                   <EditOutlined />
                                                </Button>,
                                                <Button key="delete" onClick={()=>handleDelete(index)} disabled={isCountable || !done || canBeRepeated} type='text' shape='circle'>
                                                    <DeleteOutlined />
                                                </Button>
                                            ]}
                                        >
                                            {editTaskDeatil ? <Input value={taskDetailUpdated} onChange={(e)=> setTaskDeatilUpdated(e.target.value)}/> :taskDetail }
                                            {isCountable && editRepeatDays &&<>
                                            <Divider />
                                                <Select 
                                                    mode="multiple"
                                                    allowClear={false}
                                                    style={{ width: '100%' }}
                                                    placeholder="Please select days"
                                                    defaultValue={repeatUpdatedDays}
                                                    onChange={(value)=>{setRepeatUpdatedDays(value)}}
                                                    options={daysOfWeek}
                                                />
                                            </> || <></>}
                                        </Card>
                                    </Col>
                            </>
     )||(<></>);
}
 
export default DisplayIndividualTask;