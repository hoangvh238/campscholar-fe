import * as React from "react";

import { IconSvgProps } from "@/types";

export const Logo: React.FC<IconSvgProps> = ({
  size = 36,
  width,
  height,
  ...props
}) => (
  <svg
    fill="none"
    height={size || height}
    viewBox="0 0 32 32"
    width={size || width}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const ARIcon: React.FC<IconSvgProps> = ({
  width = 40,
  height = 40,
  ...props
}) => {
  return (
    <svg
      height={height}
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        color="currentColor"
        d="M7 3h10c1.87 0 2.804 0 3.5.402A3 3 0 0 1 21.598 4.5C22 5.196 22 6.13 22 8s0 2.804-.402 3.5a3 3 0 0 1-1.098 1.098C19.804 13 18.87 13 17 13h-.394c-.687 0-1.03 0-1.351-.071a3 3 0 0 1-1.183-.554c-.26-.202-.48-.465-.92-.993c-.35-.42-.526-.63-.727-.725a1 1 0 0 0-.85 0c-.201.094-.376.304-.727.725c-.44.528-.66.791-.92.993a3 3 0 0 1-1.183.554C8.425 13 8.081 13 7.394 13H7c-1.87 0-2.804 0-3.5-.402A3 3 0 0 1 2.402 11.5C2 10.804 2 9.87 2 8s0-2.804.402-3.5A3 3 0 0 1 3.5 3.402C4.196 3 5.13 3 7 3M5 6h2m5.1 13l-2.02-2m2.02 2l-2.02 2m2.02-2C7.05 19 2.81 17 2 15m13.131 3.771C18.602 18.231 21.266 16.79 22 15"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};
