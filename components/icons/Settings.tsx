import { SvgProps } from "@/types/Svg"

export default function SettingsIcon(props: SvgProps) {
  const { className } = props

  return (
    <svg
      className={className}
      viewBox="0 0 23 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.5 20.4678C11.2588 20.4678 11.0454 20.4492 10.8135 20.4307L10.2939 21.4141C10.1641 21.6553 9.94141 21.7759 9.65381 21.7388C9.38477 21.6924 9.19922 21.4883 9.16211 21.2192L9.00439 20.1152C8.56836 19.9946 8.1416 19.8276 7.72412 19.6606L6.91699 20.3843C6.71289 20.5791 6.45312 20.6162 6.19336 20.4771C5.96143 20.3379 5.85938 20.0874 5.91504 19.8184L6.14697 18.7236C5.78516 18.4731 5.42334 18.1855 5.09863 17.8608L4.0874 18.2876C3.81836 18.3989 3.56787 18.334 3.37305 18.1021C3.20605 17.9072 3.17822 17.6289 3.32666 17.397L3.91113 16.4507C3.66064 16.0889 3.44727 15.6899 3.25244 15.2725L2.13916 15.3281C1.86084 15.3467 1.62891 15.189 1.53613 14.9292C1.46191 14.6694 1.53613 14.4097 1.74951 14.2427L2.62158 13.5562C2.51025 13.1294 2.41748 12.6748 2.38965 12.2109L1.33203 11.877C1.06299 11.7842 0.905273 11.5801 0.905273 11.3018C0.905273 11.0234 1.06299 10.8193 1.33203 10.7266L2.38965 10.3926C2.41748 9.92871 2.51025 9.4834 2.62158 9.04736L1.74951 8.36084C1.53613 8.19385 1.45264 7.94336 1.53613 7.68359C1.62891 7.42383 1.86084 7.27539 2.13916 7.28467L3.25244 7.33105C3.44727 6.9043 3.66064 6.52393 3.92041 6.14355L3.32666 5.19727C3.1875 4.98389 3.20605 4.70557 3.37305 4.51074C3.56787 4.27881 3.81836 4.22314 4.0874 4.3252L5.09863 4.7334C5.42334 4.42725 5.78516 4.13037 6.14697 3.87061L5.91504 2.80371C5.8501 2.51611 5.96143 2.26562 6.19336 2.13574C6.45312 1.99658 6.71289 2.02441 6.91699 2.22852L7.72412 2.94287C8.1416 2.7666 8.57764 2.61816 9.00439 2.48828L9.16211 1.39355C9.19922 1.12451 9.38477 0.92041 9.65381 0.874023C9.94141 0.836914 10.1733 0.95752 10.2939 1.18945L10.8135 2.17285C11.0547 2.16357 11.2588 2.14502 11.5 2.14502C11.7227 2.14502 11.9453 2.16357 12.1772 2.17285L12.6968 1.18018C12.8081 0.95752 13.0493 0.836914 13.3369 0.874023C13.5967 0.92041 13.7822 1.12451 13.8286 1.39355L13.9863 2.48828C14.4131 2.61816 14.8491 2.7666 15.2573 2.94287L16.0737 2.21924C16.2778 2.02441 16.5376 1.99658 16.7974 2.13574C17.0293 2.26562 17.1406 2.51611 17.0757 2.79443L16.8438 3.87061C17.2056 4.13037 17.5674 4.42725 17.8921 4.7334L18.9033 4.3252C19.1631 4.22314 19.4136 4.27881 19.6177 4.51074C19.7847 4.70557 19.8032 4.98389 19.6641 5.19727L19.0703 6.14355C19.3301 6.52393 19.5435 6.9043 19.7383 7.33105L20.8516 7.28467C21.1299 7.27539 21.3618 7.42383 21.4453 7.68359C21.5381 7.94336 21.4546 8.19385 21.2412 8.36084L20.3691 9.04736C20.4805 9.4834 20.5732 9.92871 20.6104 10.3926L21.6587 10.7266C21.9277 10.8193 22.0854 11.0234 22.0854 11.3018C22.0854 11.5801 21.9277 11.7842 21.6587 11.877L20.6104 12.2109C20.5732 12.6748 20.4805 13.1294 20.3691 13.5562L21.2412 14.2427C21.4546 14.4097 21.5381 14.6694 21.4453 14.9292C21.3618 15.189 21.1299 15.3467 20.8516 15.3281L19.7383 15.2725C19.5435 15.6899 19.3301 16.0889 19.0703 16.4507L19.6641 17.397C19.8032 17.6382 19.7847 17.9072 19.6177 18.1021C19.4136 18.334 19.1631 18.3989 18.9033 18.2876L17.8921 17.8608C17.5674 18.1855 17.2056 18.4731 16.8438 18.7236L17.0757 19.8091C17.1313 20.0874 17.0293 20.3379 16.7974 20.4771C16.5376 20.6162 16.2778 20.5698 16.0737 20.3843L15.2573 19.6606C14.8491 19.8276 14.4224 19.9946 13.9863 20.1152L13.8286 21.2192C13.7822 21.4883 13.5967 21.6924 13.3369 21.7388C13.0493 21.7759 12.8174 21.6553 12.6968 21.4141L12.1772 20.4307C11.9453 20.4492 11.7227 20.4678 11.5 20.4678ZM11.4814 8.73193C12.6504 8.73193 13.6338 9.50195 13.9585 10.5688H18.8662C18.5044 6.76514 15.4058 3.82422 11.5 3.82422C10.3682 3.82422 9.30127 4.07471 8.35498 4.52002L10.8506 8.80615C11.0547 8.75977 11.2588 8.73193 11.4814 8.73193ZM4.09668 11.311C4.09668 13.7695 5.23779 15.9404 7.02832 17.2949L9.59814 13.083C9.16211 12.6284 8.89307 12.0068 8.89307 11.3203C8.89307 10.6245 9.16211 9.99365 9.60742 9.53906L7.10254 5.26221C5.26562 6.6167 4.09668 8.81543 4.09668 11.311ZM11.4814 12.4336C12.1123 12.4336 12.5947 11.9512 12.5947 11.3203C12.5947 10.6895 12.1123 10.1978 11.4814 10.1978C10.8506 10.1978 10.3589 10.6895 10.3589 11.3203C10.3589 11.9512 10.8506 12.4336 11.4814 12.4336ZM11.5 18.7793C15.4243 18.7793 18.5229 15.8291 18.8662 12.0161H13.9678C13.6709 13.1016 12.6689 13.8994 11.4814 13.8994C11.2588 13.8994 11.0454 13.8716 10.8506 13.8252L8.27148 18.0557C9.23633 18.5195 10.3311 18.7793 11.5 18.7793Z"
        fill="currentColor"
      />
    </svg>
  )
}