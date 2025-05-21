// === Libs


// === Services

// === Actions
import { useEffect } from "react"
import { addColumn, loadBoard } from "../../../../../store/actions/board.actions"

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function ColTypePicker({ onCloseModal }) {
    // === Consts

    // === Effects

    // === Functions
    function onAddColumn(type) {
        addColumn(type)
        onCloseModal()
    }

    return (
        <section className="ColTypePicker">
            <div
                className="status-btn clickable clear size-32"
                onClick={() => onAddColumn('status')}
            >
                <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><rect width="20" height="20" rx="3.636" fill="var(--color-done-green)"></rect><g filter="url(#filter0_d_43912_44076)" fill="#fff"><rect x="5.227" y="5.453" width="9.318" height="2.727" rx=".455"></rect><rect x="5.227" y="8.635" width="9.318" height="2.727" rx=".455"></rect><rect x="5.227" y="11.816" width="9.318" height="2.727" rx=".455"></rect></g><defs><filter id="filter0_d_43912_44076" x="3.408" y="4.544" width="12.955" height="12.727" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood result="BackgroundImageFix" floodOpacity="0"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy=".909"></feOffset><feGaussianBlur stdDeviation=".909"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.200691 0"></feColorMatrix><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_43912_44076"></feBlend><feBlend in="SourceGraphic" in2="effect1_dropShadow_43912_44076" result="shape"></feBlend></filter></defs></svg>
                <span>Status</span></div>
            
            <div
                className="dropdown-btn clickable clear size-32"
                onClick={() => onAddColumn('dropdown')}

            >
                <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><rect width="20" height="20" rx="3.636" fill="var(--color-done-green)"></rect><g filter="url(#filter0_d_43912_44063)"><path d="M4.99893 7.39258C4.49686 7.39258 4.08984 7.79959 4.08984 8.30167V11.3649C4.08984 11.867 4.49686 12.274 4.99894 12.274H14.9989C15.501 12.274 15.908 11.867 15.908 11.3649V8.30167C15.908 7.79959 15.501 7.39258 14.9989 7.39258H4.99893ZM12.8792 10.8184C12.9419 10.8796 13.0225 10.91 13.1032 10.91C13.1873 10.91 13.271 10.877 13.3345 10.8113L14.4514 9.65377C14.5768 9.52343 14.5753 9.31451 14.4475 9.1866C14.3195 9.05935 14.1146 9.06089 13.9887 9.19056L13.0961 10.1161L12.1381 9.18351C12.009 9.05758 11.8032 9.06155 11.6798 9.19408C11.5561 9.32595 11.5604 9.53488 11.6901 9.66081L12.8792 10.8184Z" fill="#fff" fillRule="evenodd" clipRule="evenodd"></path></g><defs><filter id="filter0_d_43912_44063" x="2.272" y="6.483" width="15.455" height="8.518" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood result="BackgroundImageFix" floodOpacity="0"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy=".909"></feOffset><feGaussianBlur stdDeviation=".909"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"></feColorMatrix><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_43912_44063"></feBlend><feBlend in="SourceGraphic" in2="effect1_dropShadow_43912_44063" result="shape"></feBlend></filter></defs></svg>
                <span>Dropdown</span></div>
           
            <div
                className="text-btn clickable clear size-32"
                onClick={() => onAddColumn('text')}

            >
                <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><rect width="20" height="20" rx="3.636" fill="var(--color-egg_yolk)"></rect><g filter="url(#filter0_d_43912_44061)"><path d="M14.999 5.83684C14.999 5.43411 14.8391 5.04788 14.5543 4.76311C14.2695 4.47834 13.8833 4.31836 13.4806 4.31836H6.64739C6.24466 4.31836 5.85843 4.47834 5.57366 4.76311C5.28889 5.04788 5.12891 5.43411 5.12891 5.83684V6.9757C5.12891 7.17706 5.2089 7.37018 5.35128 7.51257C5.49367 7.65495 5.68678 7.73494 5.88815 7.73494C6.08951 7.73494 6.28263 7.65495 6.42501 7.51257C6.5674 7.37018 6.64739 7.17706 6.64739 6.9757V6.02665C6.64739 5.97631 6.66739 5.92803 6.70298 5.89243C6.73858 5.85684 6.78686 5.83684 6.8372 5.83684H9.11492C9.16526 5.83684 9.21354 5.85684 9.24914 5.89243C9.28473 5.92803 9.30473 5.97631 9.30473 6.02665V13.2394C9.30473 13.2898 9.28473 13.3381 9.24914 13.3737C9.21354 13.4092 9.16526 13.4292 9.11492 13.4292H8.16587C7.96451 13.4292 7.77139 13.5092 7.629 13.6516C7.48662 13.794 7.40663 13.9871 7.40663 14.1885C7.40663 14.3899 7.48662 14.583 7.629 14.7254C7.77139 14.8677 7.96451 14.9477 8.16587 14.9477H11.9621C12.1634 14.9477 12.3566 14.8677 12.4989 14.7254C12.6413 14.583 12.7213 14.3899 12.7213 14.1885C12.7213 13.9871 12.6413 13.794 12.4989 13.6516C12.3566 13.5092 12.1634 13.4292 11.9621 13.4292H11.013C10.9627 13.4292 10.9144 13.4092 10.8788 13.3737C10.8432 13.3381 10.8232 13.2898 10.8232 13.2394V6.02665C10.8232 5.97631 10.8432 5.92803 10.8788 5.89243C10.9144 5.85684 10.9627 5.83684 11.013 5.83684H13.2907C13.3411 5.83684 13.3894 5.85684 13.425 5.89243C13.4606 5.92803 13.4806 5.97631 13.4806 6.02665V6.9757C13.4806 7.17706 13.5605 7.37018 13.7029 7.51257C13.8453 7.65495 14.0384 7.73494 14.2398 7.73494C14.4412 7.73494 14.6343 7.65495 14.7767 7.51257C14.919 7.37018 14.999 7.17706 14.999 6.9757V5.83684Z" fill="#fff"></path></g><defs><filter id="filter0_d_43912_44061" x="3.311" y="3.409" width="13.508" height="14.266" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood result="BackgroundImageFix" floodOpacity="0"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy=".909"></feOffset><feGaussianBlur stdDeviation=".909"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"></feColorMatrix><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_43912_44061"></feBlend><feBlend in="SourceGraphic" in2="effect1_dropShadow_43912_44061" result="shape"></feBlend></filter></defs></svg>
                <span>Text</span></div>
            
            <div
                className="date-btn clickable clear size-32"
                onClick={() => onAddColumn('date')}

            >
                <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><rect width="20" height="20" rx="3.636" fill="var(--color-purple)"></rect><g filter="url(#filter0_d_43912_44067)" fill="#fff" clipPath="url(#Clip0_43912_44067)"><path d="M14.9666 8.1408C15.0359 8.1408 15.1024 8.11327 15.1514 8.06425 15.2004 8.01524 15.228 7.94876 15.228 7.87944V7.74876C15.228 7.33285 15.0628 6.93398 14.7687 6.63989 14.4746 6.34579 14.0757 6.18058 13.6598 6.18058H13.0064V5.42489C13.0064 5.2516 12.9376 5.0854 12.815 4.96286 12.6925 4.84033 12.5263 4.77148 12.353 4.77148 12.1797 4.77148 12.0135 4.84033 11.891 4.96286 11.7684 5.0854 11.6996 5.2516 11.6996 5.42489V6.18058H8.30185V5.42489C8.30185 5.2516 8.23301 5.0854 8.11047 4.96286 7.98793 4.84033 7.82173 4.77148 7.64844 4.77148 7.47514 4.77148 7.30895 4.84033 7.18641 4.96286 7.06387 5.0854 6.99503 5.2516 6.99503 5.42489V6.18058H6.34162C5.92571 6.18058 5.52684 6.34579 5.23275 6.63989 4.93866 6.93398 4.77344 7.33285 4.77344 7.74876V7.87944C4.77344 7.94876 4.80097 8.01524 4.84999 8.06425 4.899 8.11327 4.96548 8.1408 5.0348 8.1408H14.9666zM5.0348 8.86328C4.96548 8.86328 4.899 8.89766 4.84999 8.95886 4.80097 9.02006 4.77344 9.10307 4.77344 9.18962V13.2689C4.77344 13.7882 4.93866 14.2862 5.23275 14.6534 5.52684 15.0206 5.92571 15.2269 6.34162 15.2269H13.6598C14.0757 15.2269 14.4746 15.0206 14.7687 14.6534 15.0628 14.2862 15.228 13.7882 15.228 13.2689V9.18962C15.228 9.10307 15.2004 9.02006 15.1514 8.95886 15.1024 8.89766 15.0359 8.86328 14.9666 8.86328H5.0348z"></path></g><defs><clipPath id="Clip0_43912_44067"><path fill="#fff" transform="translate(4.773 4.773)" d="M0 0H10.454V10.454H0z"></path></clipPath><filter id="filter0_d_43912_44067" x="2.955" y="3.864" width="14.091" height="14.091" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood result="BackgroundImageFix" floodOpacity="0"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy=".909"></feOffset><feGaussianBlur stdDeviation=".909"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"></feColorMatrix><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_43912_44067"></feBlend><feBlend in="SourceGraphic" in2="effect1_dropShadow_43912_44067" result="shape"></feBlend></filter></defs></svg>
                <span>Date</span></div>
            
            <div
                className="people-btn clickable clear size-32"
                onClick={() => onAddColumn('people')}
            >
                <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><rect width="20" height="20" rx="3.636" fill="var(--color-chili-blue)"></rect><g filter="url(#filter0_d_43912_44048)"><path d="M12.8621 6.97735C12.8621 8.53537 11.6127 9.79841 10.0716 9.79841C8.53054 9.79841 7.28122 8.53537 7.28122 6.97735C7.28122 5.41929 8.53054 4.15625 10.0716 4.15625C11.6127 4.15625 12.8621 5.41929 12.8621 6.97735ZM5.16364 14.7105C5.34269 12.6195 6.79164 10.8633 10.0839 10.8633C13.3761 10.8633 14.825 12.6195 15.0041 14.7105C15.0255 14.9607 14.8197 15.1647 14.5687 15.1647H5.59905C5.34801 15.1647 5.14223 14.9607 5.16364 14.7105Z" fill="#fff" fillRule="evenodd" clipRule="evenodd"></path></g><defs><filter id="filter0_d_43912_44048" x="3.344" y="3.247" width="13.48" height="14.645" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood result="BackgroundImageFix" floodOpacity="0"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy=".909"></feOffset><feGaussianBlur stdDeviation=".909"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"></feColorMatrix><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_43912_44048"></feBlend><feBlend in="SourceGraphic" in2="effect1_dropShadow_43912_44048" result="shape"></feBlend></filter></defs></svg>
                <span>People</span></div>
           
            <div
                className="numbers-btn clickable clear size-32"
                onClick={() => onAddColumn('number')}
            >
                <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><rect width="20" height="20" rx="3.636" fill="var(--color-egg_yolk)"></rect><g filter="url(#filter0_d_43912_44072)" fill="#fff" clipPath="url(#Clip0_43912_44072)"><path d="M6.35438 8.77779C6.35438 8.90331 6.25263 9.00507 6.12711 9.00507H5.65267C5.52715 9.00507 5.4254 8.90331 5.4254 8.77779V5.73258C5.4254 5.57946 5.27705 5.47015 5.1308 5.51551L4.79147 5.62075C4.55563 5.69389 4.31641 5.51763 4.31641 5.2707 4.31641 5.11594 4.41362 4.97786 4.55931 4.92568L6.24085 4.32333C6.25004 4.32004 6.25972 4.31836 6.26948 4.31836 6.31637 4.31836 6.35438 4.35637 6.35438 4.40326V8.77779zM11.2132 12.0176C11.2132 12.2245 11.0455 12.3921 10.8387 12.3921H8.4597C8.20866 12.3921 8.00515 12.1871 8.00515 11.9361 8.00515 11.8205 8.04915 11.7088 8.12821 11.6245L9.51917 10.142C9.72704 9.91483 9.88026 9.7166 9.97884 9.54731 10.0796 9.37801 10.1299 9.21729 10.1299 9.06513 10.1299 8.85726 10.0774 8.6944 9.97241 8.57653 9.8674 8.45653 9.7174 8.39652 9.52238 8.39652 9.31237 8.39652 9.14629 8.46938 9.02414 8.61511 8.94522 8.70953 8.89225 8.82387 8.86523 8.95815 8.84047 9.0812 8.74238 9.18407 8.61686 9.18407H8.1392C8.01369 9.18407 7.91007 9.08184 7.92685 8.95745 7.95355 8.75953 8.01608 8.5747 8.11444 8.40295 8.2516 8.16722 8.44446 7.98293 8.69305 7.85006 8.94164 7.71505 9.22344 7.64755 9.53846 7.64755 10.0206 7.64755 10.3946 7.76327 10.6603 7.99471 10.9282 8.22616 11.0621 8.55296 11.0621 8.97513 11.0621 9.20657 11.0021 9.4423 10.8821 9.68231 10.7621 9.92233 10.5564 10.202 10.2649 10.5213L9.20094 11.6431H10.8387C11.0455 11.6431 11.2132 11.8108 11.2132 12.0176zM13.4972 13.2442C13.4972 13.0436 13.6598 12.8809 13.8604 12.8809H13.9922C14.228 12.8809 14.4026 12.822 14.5162 12.7041 14.6298 12.5863 14.6866 12.4298 14.6866 12.2348 14.6866 12.0462 14.6298 11.8995 14.5162 11.7944 14.4047 11.6894 14.2505 11.6369 14.0533 11.6369 13.8754 11.6369 13.7265 11.6862 13.6065 11.7848 13.419 11.9354 13.2315 12.1641 12.9911 12.1641H12.952C12.701 12.1641 12.4866 11.9529 12.5804 11.7201 12.6102 11.6463 12.6479 11.5758 12.6936 11.5084 12.8264 11.3133 13.0107 11.1612 13.2465 11.0519 13.4843 10.9426 13.7458 10.888 14.0308 10.888 14.5258 10.888 14.9137 11.0069 15.1944 11.2448 15.4752 11.4805 15.6155 11.8062 15.6155 12.222 15.6155 12.4363 15.5502 12.6334 15.4195 12.8134 15.2887 12.9934 15.1173 13.1317 14.9051 13.2281 15.1687 13.3224 15.3648 13.4638 15.4934 13.6524 15.6241 13.841 15.6895 14.0639 15.6895 14.321 15.6895 14.7368 15.5373 15.07 15.233 15.3207 14.9309 15.5715 14.5301 15.6968 14.0308 15.6968 13.5636 15.6968 13.1811 15.5736 12.8832 15.3272 12.7055 15.179 12.5812 15.0023 12.5102 14.7969 12.4283 14.5596 12.6431 14.35 12.8942 14.35H12.9141C13.1651 14.35 13.3568 14.5842 13.5387 14.7573 13.547 14.7652 13.5557 14.773 13.5647 14.7807 13.6976 14.8921 13.8604 14.9478 14.0533 14.9478 14.274 14.9478 14.4465 14.89 14.5708 14.7743 14.6973 14.6564 14.7605 14.501 14.7605 14.3082 14.7605 13.841 14.5033 13.6074 13.989 13.6074H13.8604C13.6598 13.6074 13.4972 13.4448 13.4972 13.2442z"></path></g><defs><clipPath id="Clip0_43912_44072"><path fill="#fff" transform="translate(2.5 3.408)" d="M0 0H15.227V15.227H0z"></path></clipPath><filter id="filter0_d_43912_44072" x="2.498" y="3.409" width="15.009" height="15.015" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood result="BackgroundImageFix" floodOpacity="0"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy=".909"></feOffset><feGaussianBlur stdDeviation=".909"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"></feColorMatrix><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_43912_44072"></feBlend><feBlend in="SourceGraphic" in2="effect1_dropShadow_43912_44072" result="shape"></feBlend></filter></defs></svg>
                <span>Numbers</span></div>
            
            <div
                className="files-btn clickable clear size-32"
                onClick={() => onAddColumn('file')}
            >
                <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><rect width="20" height="20" rx="3.636" fill="var(--color-sunset)"></rect><g filter="url(#filter0_d_43912_44049)" fill="#fff" clipPath="url(#Clip0_43912_44049)"><path d="M14.6879 6.07018L13.1374 4.51881C13.074 4.45518 12.9986 4.40472 12.9156 4.37032C12.8326 4.33592 12.7436 4.31826 12.6538 4.31836H7.84197C7.66114 4.31836 7.48772 4.39019 7.35986 4.51806C7.23199 4.64593 7.16016 4.81935 7.16016 5.00018V12.9547C7.16016 13.1356 7.23199 13.309 7.35986 13.4368C7.48772 13.5647 7.66114 13.6365 7.84197 13.6365H14.2056C14.3864 13.6365 14.5599 13.5647 14.6877 13.4368C14.8156 13.309 14.8874 13.1356 14.8874 12.9547V6.552C14.8876 6.46249 14.8701 6.37383 14.8358 6.29114C14.8016 6.20845 14.7513 6.13335 14.6879 6.07018Z"></path><path d="M12.6165 14.5453H6.70739C6.58683 14.5453 6.47122 14.4974 6.38597 14.4121C6.30073 14.3269 6.25284 14.2113 6.25284 14.0907V6.13619C6.25284 6.01563 6.20495 5.90002 6.11971 5.81477C6.03446 5.72953 5.91885 5.68164 5.7983 5.68164C5.67774 5.68164 5.56213 5.72953 5.47688 5.81477C5.39164 5.90002 5.34375 6.01563 5.34375 6.13619V14.0907C5.34375 14.4524 5.48742 14.7992 5.74315 15.055C5.99888 15.3107 6.34573 15.4544 6.70739 15.4544H12.6165C12.737 15.4544 12.8526 15.4065 12.9379 15.3212C13.0231 15.236 13.071 15.1204 13.071 14.9998C13.071 14.8793 13.0231 14.7637 12.9379 14.6784C12.8526 14.5932 12.737 14.5453 12.6165 14.5453Z"></path></g><defs><clipPath id="Clip0_43912_44049"><path fill="#fff" transform="translate(4.547 4.545)" d="M0 0H10.909V10.909H0z"></path></clipPath><filter id="filter0_d_43912_44049" x="2.729" y="3.636" width="14.545" height="14.546" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood result="BackgroundImageFix" floodOpacity="0"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy=".909"></feOffset><feGaussianBlur stdDeviation=".909"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"></feColorMatrix><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_43912_44049"></feBlend><feBlend in="SourceGraphic" in2="effect1_dropShadow_43912_44049" result="shape"></feBlend></filter></defs></svg>
                <span>Files</span></div>
            
            <div
                className="priority-btn clickable clear size-32"
                onClick={() => onAddColumn('priority')}
            >
                <img src="https://files.monday.com/euc1/photos/10162286/original/app_version_10162286_photo_2023_10_26_13_37_04.png?1747838393899" alt="" />
                <span>Priority</span></div>
        </section>
    )
}