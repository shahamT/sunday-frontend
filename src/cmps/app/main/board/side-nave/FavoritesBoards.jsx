
// === Libs

// === Services

// === Actions

// === Hooks / React

// === Child cmps
import { BoardNavBarLink } from "./BoardNavBarLink"

export function FavoritesBoards({ boards, setEditedTitle, editingBoardId, handleRename, editedTitle, setEditingBoardId }) {
  const starredBoards = boards.filter(board => board.isStarred)


  if (starredBoards.length === 0) return <div className="favorites-boards ">No Favorites</div>
  return (
    <section className="favorites-boards">
      {starredBoards.map(board => (
        <BoardNavBarLink board={board}
          key={board._id}
          editedTitle={editedTitle}
          editingBoardId={editingBoardId}
          setEditedTitle={setEditedTitle}
          setEditingBoardId={setEditingBoardId}
          handleRename={handleRename} />
      )
      )}
    </section>
  )

}