import React from "react";
import './Footer.css'
import TaskFilter from "./Task-filter";


const Footer = (props) => {
    return <footer class="footer">
    <span class="todo-count">1 items left</span>

    <TaskFilter/>
    <button class="clear-completed">Clear completed</button>
        </footer>
}

export default Footer