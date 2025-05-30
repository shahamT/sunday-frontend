// === Libs


// === Services
import { SOCKET_EVENT_BOARD_UPDATE, socketService } from "../../../../services/base/socket.service";

// === Actions
import { getCmdUpdateBoardFromSocket, loadBoard } from "../../../../store/actions/board.actions";
import { updateUser } from "../../../../store/actions/user.actions";

// === Hooks / React
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelected } from '../../../../hooks/useSelected.js'
import { useOutletContext } from 'react-router-dom';


// === Imgs

// === Child Components
import { BoardHeader } from "./BoardHeader";
import { TaskPanel } from "./TaskPanel";
import { T_Filter } from "./table-view/T_Filter";
import { TaskDetails } from "./task-details/TaskDetails";
import { T_GroupsList } from "./table-view/T_GroupsList";
import { K_StatusList } from "./kanban-view/K-StatusList";
import { K_Filter } from "./kanban-view/K_Filter";

// ====== Component ======
// =======================
const SN_STORAGE_KEY = 'sideNavWidth';

export function BoardDetails({ /* prop1, prop2 */ }) {
    // === Consts
    const { boardId } = useParams()
    const dispatch = useDispatch()
    const { sideNavWidth } = useOutletContext()
    const [vpWidth, setVpWidth] = useState(() => window.innerWidth);
    const [sumValues, setSumValues] = useState(null);

    const location = useLocation();
    const isKanbanRoute = location.pathname.endsWith('/kanban');

    // === Effects

    //fetch board data
    useEffect(() => {
        loadBoard(boardId)
        updateUser(boardId)

        const onBoardUpdate = (board) => {
            // console.log('GOT from socket', board._id)
            dispatch(getCmdUpdateBoardFromSocket(board))
        }

        socketService.on(SOCKET_EVENT_BOARD_UPDATE, onBoardUpdate)

        return () => {
            socketService.off(SOCKET_EVENT_BOARD_UPDATE, onBoardUpdate)
        }

    }, [boardId])


    // === Functions
    function setForSum(cv, col, totalTasks) {
        setSumValues({cv, col, totalTasks})
    }

    return (
        <section className="BoardDetails">
            <BoardHeader />

            {!isKanbanRoute && 
                <T_Filter/>}
            {sumValues && isKanbanRoute &&
                <K_Filter columnValues={sumValues.cv} column={sumValues.col} totalTasks={sumValues.totalTasks} />}
            
            {!isKanbanRoute &&  <T_GroupsList />}
            {isKanbanRoute &&  <K_StatusList setForSum={setForSum}/>}

            <TaskPanel
                side='right'
                defaultWidth={500}
                minWidth={570}
                maxWidth={vpWidth - sideNavWidth}
            >
                <TaskDetails />
            </TaskPanel>
        </section>
    )
}