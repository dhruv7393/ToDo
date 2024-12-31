import React, { useState, useEffect } from "react";
import {
  Grid,
  Row,
  Button,
  notification,
  List,
  Typography,
  Drawer,
  Checkbox,
  Switch,
  Badge,
} from "antd";
import { MenuOutlined, PlusOutlined } from "@ant-design/icons";
import DisplayIndividualTask from "./DisplayIndividualTask";
import ModalToAddTodo from "./ModalToAddTodo";
import axios from "axios";

const todosFromMock = require("../mock/todos.json");
const vaccationFromMock = require("../mock/vaccation.json");

const { useBreakpoint } = Grid;
const { Text } = Typography;

const useMock = false;

const ShowTasks = () => {
  const [openModalToAdd, setOpenModalToAdd] = useState(false);

  const [onVaccationDetails, setOnVaccationDetails] = useState({
    onVaccation: false,
    vaccationDays: 0,
    startedFrom: new Date().toLocaleDateString(),
    updatedOn: new Date().toLocaleDateString(),
  });
  const [todos, setTodos] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  const [visible, setVisible] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const menuItems = [
    { id: 1, label: "Countable" },
    { id: 2, label: "Done" },
    { id: 3, label: "Pinned" },
    { id: 4, label: "Repetable" },
  ];

  const printError = (error) => console.log("Error:", error);

  const handleCheckboxChange = (id) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Toggle the checked state
    }));
  };

  const openNotification = (header, message, error = false) => {
    let content = {
      message: header,
      description: message,
      placement: "topLeft",
    };
    error ? api.error(content) : api.info(content);
  };

  const sortData = (todosForSort) => {
    return todosForSort.sort((a, b) => {
      // Step 1: Sort by "count" (consider absent "count" as 0)
      const countA = a.count !== undefined ? a.count : -1;
      const countB = b.count !== undefined ? b.count : -1;
      if (countA !== countB) {
        return countA - countB;
      }

      // Step 2: Sort by "done" key: false before true
      if (a.done !== b.done) {
        return a.done - b.done;
      }

      // Step 3: Sort by "pinned" key: true before false
      if (a.pinned !== b.pinned) {
        return b.pinned - a.pinned;
      }

      // Step 4: Sort by "canBeRepeated" key: true before false
      if (a.canBeRepeated !== b.canBeRepeated) {
        return b.canBeRepeated - a.canBeRepeated;
      }

      // Step 5: Sort by "importance" in descending order
      if (a.importance !== b.importance) {
        return b.importance - a.importance;
      }

      return 0; // Maintain original order if all criteria are the same
    });
  };

  const handleVaccationSelected = (value) => {
    let data = JSON.stringify({
      ...onVaccationDetails,
      ...{
        onVaccation: value,
        updatedOn: new Date().toLocaleDateString(),
      },
    });
    let config = {
      method: "patch",
      url:
        process.env.REACT_APP_BACKEND_URL +
        "vaccation/" +
        onVaccationDetails["_id"],
      headers: {
        "content-type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then((response) => {
        openNotification(
          "Hello Dhruv!",
          `Vaccation has been ${value ? "enabled" : "disabled"}`
        );
        setOnVaccationDetails(JSON.parse(data));
      })
      .catch((error) => {
        openNotification("Hello Dhruv!", `Vaccation could not be modified`);
      });
  };

  const addTodo = (newTodo) => {
    let arrayWithoutDeletedTodo = [...todos];

    if (
      Object.keys(newTodo).includes("repeatOn") &&
      newTodo["repeatOn"].every((item) => typeof item === "object")
    ) {
      newTodo["repeatOn"] = Object.values(newTodo["repeatOn"]).map(
        (day) => day.value
      );
    }

    if (Object.keys(newTodo).includes("repeatAfter")) {
      newTodo["canBeRepeated"] = newTodo["repeatAfter"] > 0 ? true : false;
    }

    let data = JSON.stringify({ ...newTodo });
    let config = {
      method: "post",
      url: process.env.REACT_APP_BACKEND_URL + "copythat",
      headers: {
        "content-type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function ({ data }) {
        openNotification(newTodo["taskName"], `It has been added`);
        setTodos([...sortData([...arrayWithoutDeletedTodo, data])]);
      })
      .catch(function (error) {
        printError(error);
        openNotification(newTodo["taskName"], `Could not be added`, true);
      });
  };

  const handleDelete = (index) => {
    let arrayWithoutDeletedTodo = [...todos];
    let config = {
      method: "delete",
      url:
        process.env.REACT_APP_BACKEND_URL +
        "copythat/" +
        arrayWithoutDeletedTodo[index]["_id"],
      headers: {},
    };

    axios(config)
      .then(function (response) {
        openNotification(
          arrayWithoutDeletedTodo[index]["taskName"],
          `It has been deleted`
        );
        arrayWithoutDeletedTodo.splice(index, 1);
        setTodos(sortData(arrayWithoutDeletedTodo));
      })
      .catch(function (error) {
        printError(error);
        openNotification(
          arrayWithoutDeletedTodo[index]["taskName"],
          `Could not be deleted`,
          true
        );
      });
  };

  const updateTodo = (
    index,
    updatedValue,
    method,
    successMessage,
    errorMessage
  ) => {
    let arrayWithoutDeletedTodo = [...todos];
    let removedTodo = arrayWithoutDeletedTodo.splice(index, 1);

    let data = JSON.stringify(updatedValue);

    var config = {
      method: method,
      url:
        process.env.REACT_APP_BACKEND_URL + "copythat/" + updatedValue["_id"],
      headers: {
        "content-type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        openNotification(updatedValue["taskName"], successMessage);
        setTodos([...sortData([...arrayWithoutDeletedTodo, updatedValue])]);
      })
      .catch(function (error) {
        printError(error);
        openNotification(updatedValue["taskName"], errorMessage, true);
      });
  };

  const updatedTaskDetail = (index, value) => {
    let todoToBeModified = todos[index];
    todoToBeModified.taskDetail = value;
    updateTodo(
      index,
      todoToBeModified,
      "patch",
      `Detail set to - ${value}`,
      `Could not update details`
    );
  };

  const changeCount = (index, value) => {
    let todoToBeModified = todos[index];
    todoToBeModified.count = todoToBeModified.count + value;
    todoToBeModified.canBeRepeated = value > 0;
    updateTodo(
      index,
      todoToBeModified,
      "patch",
      `Count has been updated to ${todoToBeModified.count}`,
      `Could not update count`
    );
  };

  const updatedRepeatDays = (index, value) => {
    let todoToBeModified = todos[index];
    todoToBeModified.repeatOn = value.length
      ? value
      : todoToBeModified.repeatOn;

    if (!value.length) {
      openNotification(
        todoToBeModified.taskName,
        `At least should be repeated for a day`,
        true
      );
    } else {
      updateTodo(
        index,
        todoToBeModified,
        "patch",
        `Will be counted on ${todoToBeModified.repeatOn}`,
        `Could not update counting days`
      );
    }
  };

  const updatedRepeat = (index, value) => {
    let todoToBeModified = todos[index];
    todoToBeModified.repeatAfter = value;
    todoToBeModified.canBeRepeated = value > 0;
    updateTodo(
      index,
      todoToBeModified,
      "patch",
      value == 0
        ? "Get it done!!!"
        : `Task will be repeated after ${value} days`,
      `Could not marked for once / repetition`
    );
  };

  const changeImportance = (index, value) => {
    let todoToBeModified = todos[index];
    todoToBeModified.importance = value > 5 ? 1 : value < 1 ? 1 : value;
    updateTodo(
      index,
      todoToBeModified,
      "patch",
      `Importance set to ${todoToBeModified.importance}`,
      `Could not update importance`
    );
  };

  const handleDone = (index) => {
    let todoToBeModified = todos[index];
    todoToBeModified.done = !todoToBeModified.done;
    updateTodo(
      index,
      todoToBeModified,
      "patch",
      `It has been marked as done`,
      `Could not be marked as done`
    );
  };

  const handlePinned = (index) => {
    let todoToBeModified = todos[index];
    todoToBeModified.pinned = !todoToBeModified.pinned;
    updateTodo(
      index,
      todoToBeModified,
      "patch",
      `It has been pinned`,
      `Could not be pinned`
    );
  };

  useEffect(() => {
    if (useMock) {
      let sortedToDos = [...sortData(todosFromMock)];
      setTodos([...sortedToDos]);
      setOnVaccationDetails({ ...vaccationFromMock });
    } else {
      let config = {
        method: "get",
        url: process.env.REACT_APP_BACKEND_URL + "vaccation",
        headers: {},
      };
      axios
        .request(config)
        .then(({ data }) => {
          setOnVaccationDetails({ ...data[0] });
        })
        .catch((err) => {
          printError(err);
          openNotification(
            "Vaccation details",
            `Failed to load vaccation details`,
            true
          );
        });

      config = {
        method: "get",
        url: process.env.REACT_APP_BACKEND_URL + "copythat",
        headers: {},
      };
      axios
        .request(config)
        .then(({ data }) => {
          setTodos([...sortData([...data])]);
        })
        .catch((err) => {
          printError(err);
          openNotification(
            "Cannot load ToDos",
            `Please check error logs`,
            true
          );
        });
    }
  }, []);

  const screens = useBreakpoint();

  const cardWidth = screens["xs"] ? 24 : screens["xl"] ? 8 : 12;
  const cardPerRow = 24 / cardWidth;

  return (
    <div style={{ padding: "24px", backgroundColor: "#f0f2f5" }}>
      <Row justify="start" align="middle" style={{ padding: "10px" }}>
        <Button
          type="primary"
          icon={<MenuOutlined />}
          onClick={() => setVisible(true)}
          shape="circle"
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpenModalToAdd(true)}
          shape="circle"
          style={{ marginLeft: "10px" }}
        />
      </Row>
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setVisible(false)}
        visible={visible}
      >
        Vaccation since {onVaccationDetails.startedFrom}:{" "}
        <Switch
          defaultChecked={onVaccationDetails.onVaccation}
          value={onVaccationDetails.onVaccation}
          onChange={(checked) => handleVaccationSelected(checked)}
        />{" "}
        <Badge count={onVaccationDetails.vaccationDays} />
        <List
          dataSource={menuItems}
          renderItem={(item) => (
            <List.Item>
              <Checkbox
                checked={!!checkedItems[item.label]}
                onChange={() => handleCheckboxChange(item.label)}
              >
                <Text delete={checkedItems[item.id]}>{item.label}</Text>
              </Checkbox>
            </List.Item>
          )}
        />
      </Drawer>
      {contextHolder}
      <ModalToAddTodo
        openModalToAdd={openModalToAdd}
        setOpenModalToAdd={setOpenModalToAdd}
        addTodo={addTodo}
      />
      <Row gutter={16}>
        {(todos.length &&
          todos.map((todo, index) => {
            console.log(Object.keys(checkedItems).length);
            let doDisplay =
              (!(
                !Object.keys(checkedItems).length &&
                Object.keys(todo).includes("canBeRepeated") &&
                todo.canBeRepeated &&
                todo.done
              ) &&
                !(
                  !Object.keys(checkedItems).length &&
                  Object.keys(todo).includes("count") &&
                  todo.count > 7
                ) &&
                !(
                  !Object.keys(checkedItems).length &&
                  Object.keys(todo).includes("canBeRepeated") &&
                  !todo.canBeRepeated &&
                  todo.done
                )) ||
              false;
            if (doDisplay) {
              return (
                <DisplayIndividualTask
                  todoToBeDisplayed={todo}
                  cardWidth={cardWidth}
                  checkedItems={checkedItems}
                  index={index}
                  changeCount={changeCount}
                  handleDone={handleDone}
                  handlePinned={handlePinned}
                  changeImportance={changeImportance}
                  updatedRepeatDays={updatedRepeatDays}
                  updatedRepeat={updatedRepeat}
                  updatedTaskDetail={updatedTaskDetail}
                  handleDelete={handleDelete}
                />
              );
            }
            return <></>;
          })) || <></>}
      </Row>
    </div>
  );
};

export default ShowTasks;
