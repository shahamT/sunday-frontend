// === Libs


// === Services
import { SOCKET_EVENT_BOARD_UPDATE, socketService } from "../../../../services/base/socket.service";

// === Actions
import { getCmdUpdateBoardFromSocket, loadBoard } from "../../../../store/actions/board.actions";

// === Hooks / React
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

// ====== Component ======
// =======================
const SN_STORAGE_KEY = 'sideNavWidth';

export function BoardDetails({ /* prop1, prop2 */ }) {
    // === Consts
    const { boardId } = useParams()
    const { selected, isSelected, select } = useSelected('main-table')
    const dispatch = useDispatch()
    const board = useSelector(storeState => storeState.boardModule.board)
    const { sideNavWidth } = useOutletContext()
    const [vpWidth, setVpWidth] = useState(() => window.innerWidth);


    // === Effects

    //fetch board data
    useEffect(() => {
        loadBoard(boardId)

        const onBoardUpdate = (board) => {
            console.log('GOT from socket', board._id)
            dispatch(getCmdUpdateBoardFromSocket(board))
        }

        socketService.on(SOCKET_EVENT_BOARD_UPDATE, onBoardUpdate)

        return () => {
            socketService.off(SOCKET_EVENT_BOARD_UPDATE, onBoardUpdate)
        }

    }, [boardId])


    // === Functions

    return (
        <section className="BoardDetails">
            <BoardHeader isSelected={isSelected} select={select} />

            <T_Filter />
            {isSelected('main-table') &&  <T_GroupsList />}
            {/* {isSelected('kanban') &&  <K_StatusList />} */}

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