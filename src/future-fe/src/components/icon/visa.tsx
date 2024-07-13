import React from "react";

function Visa(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="53"
      height="18"
      viewBox="0 0 53 18"
      {...props}
    >
      <defs>
        <path
          id="path-1"
          d="M0 0.0419397993L19.4779612 0.0419397993 19.4779612 16.4928261 0 16.4928261z"
        ></path>
        <path
          id="path-3"
          d="M0.229270903 0.44735786L13.0341906 0.44735786 13.0341906 17.4749164 0.229270903 17.4749164z"
        ></path>
      </defs>
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g transform="translate(-195 -477)">
          <g transform="translate(163 212)">
            <g transform="translate(32 255)">
              <g transform="translate(0 10)">
                <path
                  fill="#0066B2"
                  d="M21.1483535 0.992854849L18.4718953 17.4437411 22.7539488 17.4437411 25.431805 0.992854849z"
                ></path>
                <g transform="translate(0 .252)">
                  <g transform="translate(0 .699)">
                    <mask id="mask-2" fill="#fff">
                      <use xlinkHref="#path-1"></use>
                    </mask>
                    <path
                      fill="#0066B2"
                      d="M14.868.042l-4.083 11.315-.483-2.436L8.86 1.523S8.687.042 6.83.042H.079l-.08.279S2.066.749 4.482 2.2l3.72 14.292h4.462L19.478.042h-4.61z"
                      mask="url(#mask-2)"
                    ></path>
                  </g>
                  <path
                    fill="#0066B2"
                    d="M43.844 11.373l2.25-6.157 1.266 6.157h-3.516zm4.712 5.818h3.933L49.06.741h-3.442c-1.59 0-1.978 1.226-1.978 1.226L37.252 17.19h4.465l.892-2.443h5.445l.502 2.443z"
                  ></path>
                  <g transform="translate(25.164)">
                    <mask id="mask-4" fill="#fff">
                      <use xlinkHref="#path-3"></use>
                    </mask>
                    <path
                      fill="#0066B2"
                      d="M12.423 4.697l.611-3.533S11.148.447 9.183.447c-2.127 0-7.173.93-7.173 5.446 0 4.25 5.924 4.303 5.924 6.535 0 2.23-5.313 1.832-7.068.425L.23 16.545s1.913.93 4.835.93c2.922 0 7.333-1.514 7.333-5.632 0-4.277-5.977-4.676-5.977-6.535 0-1.86 4.17-1.621 6.003-.611"
                      mask="url(#mask-4)"
                    ></path>
                  </g>
                  <path
                    fill="#F9A533"
                    d="M10.301 9.62l-1.44-7.397S8.686.74 6.828.74H.079L0 1.02s3.245.672 6.357 3.19c2.976 2.41 3.944 5.41 3.944 5.41"
                  ></path>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Visa;
