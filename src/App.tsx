import { useState, useEffect } from "react";
import { Box, Fab, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LoadingButton from "@mui/lab/LoadingButton";

import { useDispatch, useSelector } from "react-redux";
import { getProducts, addTodo, updateTodo, toggleTodo, deleteTodo } from "./redux/action";
import { productsListState, IProduct, ITodo } from "./redux/reducer";
import { AppState } from "./redux/store";

const useStyles = makeStyles({
  cont: {
    backgroundColor: "#e0f2f1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
});

function App() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [task, setTask] = useState<string>("");
  const [newTask, setNewTask] = useState<string>("");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const products: productsListState = useSelector((state: AppState) => state.productsList);
  const { loading, err, productsList } = products;

  const todos = useSelector((state: AppState) => state.todos);

  return (
    // <div>
    //   <label> New Todo</label> <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
    //   <button
    //     type="submit"
    //     onClick={() => {
    //       dispatch(addTodo(task));
    //       setTask("");
    //     }}>
    //     add
    //   </button>
    //   {todos &&
    //     todos.map((todo, index) => {
    //       return (
    //         <div key={todo.id}>
    //           <label>{index + 1}</label>
    //           <input type="text" placeholder={todo.task} onChange={(e) => setNewTask(e.target.value)} />
    //           <button type="submit" onClick={() => dispatch(updateTodo(todo.id, newTask))}>
    //             edit
    //           </button>
    //           <button type="submit" onClick={() => dispatch(toggleTodo(todo.id))}>
    //             done
    //           </button>
    //           <button type="submit" onClick={() => dispatch(deleteTodo(todo.id))}>
    //             delete
    //           </button>
    //         </div>
    //       );
    //     })}
    // </div>
    <Box className={classes.cont}>
      <div>
        <TextField label="New Todo" value={task} variant="outlined" onChange={(e) => setTask(e.target.value)} />
        <Fab sx={{ ml: 1 }} color="primary" aria-label="add">
          <AddIcon
            onClick={() => {
              dispatch(addTodo(task));
              setTask("");
            }}
          />
        </Fab>
      </div>
      {todos &&
        todos.map((todo: ITodo) => {
          return (
            <span key={todo.id}>
              <TextField label={todo.task} variant="outlined" onChange={(e) => setNewTask(e.target.value)} />
              <Fab sx={{ ml: 1 }} color="info" aria-label="edit">
                <EditIcon
                  onClick={() => {
                    dispatch(updateTodo(todo.id, newTask));
                  }}
                />
              </Fab>
              <Fab sx={{ ml: 1 }} color="success" aria-label="done">
                <DoneIcon
                  onClick={() => {
                    dispatch(toggleTodo(todo.id));
                  }}
                />
              </Fab>
              <Fab sx={{ ml: 1 }} color="error" aria-label="delete">
                <DeleteOutlineIcon
                  onClick={() => {
                    dispatch(deleteTodo(todo.id));
                  }}
                />
              </Fab>
            </span>
          );
        })}
      {loading ? (
        <LoadingButton loading loadingIndicator="Loading..." variant="outlined">
          Fetch data
        </LoadingButton>
      ) : err ? (
        console.log(err)
      ) : (
        productsList &&
        productsList.map((product: IProduct) => {
          console.log(typeof product.createdAt);
          return <div key={product._id}>{product.name}</div>;
        })
      )}
    </Box>
  );
}

export default App;
