import './ConfirmDelete.scss'

import { closeGlobalModal } from "../../../../store/actions/app.actions"
import { useSelector } from 'react-redux'

export function ConfirmDelete({ entity, action, entityName = '', isLoadingSelect }) {
    const isLoading = useSelector(isLoadingSelect || (() => false));

    function onConfirm() {
        action(entity)
            .then(() => {
                closeGlobalModal()
            })
    }

    return (
        <section className="ConfirmDelete">

            <h3 className="title">
                Are you sure you wish to delete
                {entityName ? <span className='entity'><br />{entityName}?</span> : '?'}
            </h3>

            <div className="btns-container">

                <div
                    className="cancel-btn clickable clear size-40"
                    onClick={closeGlobalModal}
                >Cancel</div>

                <div
                    className={`confirm-btn clickable filled negative size-40 ${isLoading ? 'loading' : ''}`}
                    onClick={onConfirm}
                >Delete</div>

            </div>
        </section>
    )
}


// usage example:

//  function onDeleteToy() {
//         openGlobalModal(<ConfirmDelete
//             entity={toy}
//             action={removeToy}
//             entityName={toy.name}
//             isLoadingSelect={storeState => storeState.toyModule.isToyActionLoading}
//         />)
//     }