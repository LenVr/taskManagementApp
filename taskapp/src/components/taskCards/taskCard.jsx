import styles from "./taskCard.module.css";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useState } from "react";

export default function TaskCard({ task, onEdit, onDelete }) {
    const [showModal, setShowModal] = useState(false);
    const [editTask, setEditTask] = useState({ ...task });

    if (!task) return null;

    const handleEditClick = () => {
        setEditTask({ ...task });
        setShowModal(true);
    };

    const handleChange = (e) => {
        setEditTask({ ...editTask, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        if (onEdit) onEdit(editTask);
        setShowModal(false);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    let dueDateString = "";
    if (task.dueDate) {
        if (typeof task.dueDate === "object" && task.dueDate.seconds) {
            dueDateString = new Date(task.dueDate.seconds * 1000).toLocaleDateString();
        } else {
            dueDateString = task.dueDate;
        }
    }

    return (
        <>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h3>{task.taskTitle}</h3>
                    <div className={styles.actions}>
                        <button
                            className={styles.iconBtn}
                            onClick={handleEditClick}
                            title="Edit"
                            type="button"
                        >
                            <FiEdit />
                        </button>
                        <button
                            className={styles.iconBtn}
                            onClick={() => onDelete && onDelete(task)}
                            title="Delete"
                            type="button"
                        >
                            <FiTrash2 />
                        </button>
                    </div>
                </div>
                <p><strong>Description:</strong> {task.taskDescription}</p>
                <p><strong>Assigned to:</strong> {task.userAssigned}</p>
                <p><strong>Due date:</strong> {dueDateString}</p>
                <p><strong>Urgency:</strong> {task.urgencyLevel}</p>
            </div>

            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h3>Edit Task</h3>
                        <label>
                            Title:
                            <input
                                name="taskTitle"
                                value={editTask.taskTitle}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Description:
                            <input
                                name="taskDescription"
                                value={editTask.taskDescription}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Assigned to:
                            <input
                                name="userAssigned"
                                value={editTask.userAssigned}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Due date:
                            <input
                                name="dueDate"
                                type="date"
                                value={editTask.dueDate}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Urgency:
                            <input
                                name="urgencyLevel"
                                value={editTask.urgencyLevel}
                                onChange={handleChange}
                            />
                        </label>
                        <div className={styles.modalActions}>
                            <button onClick={handleSave} className={styles.saveBtn}>Save</button>
                            <button onClick={handleCancel} className={styles.cancelBtn}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}