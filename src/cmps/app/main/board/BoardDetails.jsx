// === Libs


// === Services
import { SOCKET_EVENT_BOARD_UPDATE, socketService } from "../../../../services/base/socket.service";

// === Actions
import { getCmdUpdateBoardFromSocket, loadBoard } from "../../../../store/actions/board.actions";

// === Hooks / React
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelected } from '../../../../hooks/useSelected.js'


// === Imgs

// === Child Components
import { BoardHeader } from "./BoardHeader";
import { TaskPanel } from "./TaskPanel";
import { T_Filter } from "./table-view/T_Filter";
import { TaskDetails } from "./task-details/TaskDetails";
import { T_GroupsList } from "./table-view/T_GroupsList";

// ====== Component ======
// =======================

export function BoardDetails({ /* prop1, prop2 */ }) {
    // === Consts
    const { boardId } = useParams()
    const { selected, isSelected, select } = useSelected('main-table')
    const dispatch = useDispatch()
    const board = useSelector(storeState => storeState.boardModule.board)

    // === Effects
    useEffect(() => {
        loadBoard(boardId)

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

    // if (!data) return <div>Loading...</div>
    return (
        <section className="BoardDetails">
            <BoardHeader isSelected={isSelected} select={select} />
            <T_Filter/>
            <T_GroupsList/>

            <TaskPanel
                side='right'
                defaultWidth={500}
                minWidth={200}
                maxWidth={700}
            >
                <TaskDetails />
            </TaskPanel>
        </section>
    )
}