import { SvgProps } from "@/types/Svg"

export default function Swap(props: SvgProps) {
  const { className } = props

  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2.05 4.51056L2.05 9.77057C2.05 10.1389 2.2374 10.3521 2.56696 10.3457C2.89651 10.3392 3.09037 10.1389 3.09037 9.77057L3.09037 4.52349C3.09037 3.87729 3.43285 3.52189 4.10489 3.52189H11.1225L10.0886 4.48472L9.48121 5.10506C9.26797 5.32477 9.24212 5.62848 9.46183 5.85464C9.68153 6.07435 9.99817 6.06142 10.2179 5.84172L12.3826 3.66405C12.8026 3.23757 12.8026 2.77231 12.3826 2.34582L10.2179 0.174616C9.99817 -0.0515518 9.68153 -0.0580139 9.46183 0.15523C9.24212 0.374935 9.26151 0.685107 9.48121 0.904813L10.0886 1.52516L11.1161 2.48152H4.0532C2.71558 2.48152 2.05 3.16002 2.05 4.51056ZM13.9464 11.4894V6.22943C13.9464 5.8611 13.759 5.64786 13.4294 5.65432C13.0934 5.66078 12.906 5.8611 12.906 6.22943V11.4701C12.906 12.1162 12.5635 12.4781 11.8915 12.4781H4.87386L5.90131 11.5153L6.51519 10.8949C6.72843 10.6752 6.75428 10.3651 6.52811 10.1454C6.31487 9.92565 5.99824 9.93858 5.77853 10.1583L3.60733 12.3359C3.19376 12.756 3.19376 13.2277 3.60733 13.6477L5.77853 15.8254C5.99824 16.0516 6.31487 16.058 6.52811 15.8448C6.75428 15.6186 6.72843 15.3149 6.51519 15.0952L5.90131 14.4748L4.88032 13.5185H11.9432C13.2808 13.5185 13.9464 12.8335 13.9464 11.4894Z"
        fill="currentColor"
      />
    </svg>
  )
}
