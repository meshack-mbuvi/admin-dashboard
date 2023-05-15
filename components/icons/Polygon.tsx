interface PolygonProps {
    className?: string
}

export default function Polygon(props: PolygonProps) {
    const { className } = props
    return (
        <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1_1319)">
                <circle cx="10" cy="10" r="10" fill="#8247E5"/>
                <path d="M13.0003 8.12005C12.787 7.99889 12.5129 7.99889 12.2692 8.12005L10.5634 9.11968L9.40584 9.75581L7.73047 10.7554C7.51724 10.8766 7.24309 10.8766 6.9994 10.7554L5.68957 9.96785C5.47634 9.84669 5.32403 9.60435 5.32403 9.33173V7.81714C5.32403 7.5748 5.44588 7.33247 5.68957 7.18101L6.9994 6.42371C7.21263 6.30255 7.48678 6.30255 7.73047 6.42371L9.04031 7.2113C9.25354 7.33247 9.40584 7.5748 9.40584 7.84743V8.84706L10.5634 8.18064V7.15072C10.5634 6.90838 10.4415 6.66605 10.1978 6.51459L7.76093 5.09088C7.5477 4.96971 7.27355 4.96971 7.02986 5.09088L4.53204 6.54488C4.28835 6.66605 4.1665 6.90838 4.1665 7.15072V9.99815C4.1665 10.2405 4.28835 10.4828 4.53204 10.6343L6.9994 12.058C7.21263 12.1792 7.48678 12.1792 7.73047 12.058L9.40584 11.0886L10.5634 10.4222L12.2387 9.45289C12.452 9.33173 12.7261 9.33173 12.9698 9.45289L14.2796 10.2102C14.4929 10.3314 14.6452 10.5737 14.6452 10.8463V12.3609C14.6452 12.6032 14.5233 12.8456 14.2796 12.997L13.0003 13.7543C12.787 13.8755 12.5129 13.8755 12.2692 13.7543L10.9594 12.997C10.7461 12.8759 10.5938 12.6335 10.5938 12.3609V11.3916L9.4363 12.058V13.0576C9.4363 13.3 9.55815 13.5423 9.80184 13.6937L12.2692 15.1175C12.4824 15.2386 12.7566 15.2386 13.0003 15.1175L15.4676 13.6937C15.6809 13.5726 15.8332 13.3302 15.8332 13.0576V10.1799C15.8332 9.93756 15.7113 9.69523 15.4676 9.54377L13.0003 8.12005Z" fill="white"/>
            </g>
            <defs>
                <clipPath id="clip0_1_1319">
                    <rect width="20" height="20" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    )
}
