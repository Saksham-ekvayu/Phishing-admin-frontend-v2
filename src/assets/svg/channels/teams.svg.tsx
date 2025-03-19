/* eslint-disable no-tabs */
/* eslint-disable react/style-prop-object */
/* eslint-disable max-len */
import React, { ReactElement } from 'react';

/**
 *
 * @return {ReactElement}
 */
export function TeamsSvg(): ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="48px"
      height="48px"
    >
      <path
        fill="#5059c9"
        d="M44,22v8c0,3.314-2.686,6-6,6s-6-2.686-6-6V20h10C43.105,20,44,20.895,44,22z M38,16	c2.209,0,4-1.791,4-4c0-2.209-1.791-4-4-4s-4,1.791-4,4C34,14.209,35.791,16,38,16z"
      />
      <path
        fill="#7b83eb"
        d="M35,22v11c0,5.743-4.841,10.356-10.666,9.978C19.019,42.634,15,37.983,15,32.657V20h18	C34.105,20,35,20.895,35,22z M25,17c3.314,0,6-2.686,6-6s-2.686-6-6-6s-6,2.686-6,6S21.686,17,25,17z"
      />
      <circle cx="25" cy="11" r="6" fill="#7b83eb" />
      <path
        d="M26,33.319V20H15v12.657c0,1.534,0.343,3.008,0.944,4.343h6.374C24.352,37,26,35.352,26,33.319z"
        opacity=".05"
      />
      <path
        d="M15,20v12.657c0,1.16,0.201,2.284,0.554,3.343h6.658c1.724,0,3.121-1.397,3.121-3.121V20H15z"
        opacity=".07"
      />
      <path
        d="M24.667,20H15v12.657c0,0.802,0.101,1.584,0.274,2.343h6.832c1.414,0,2.56-1.146,2.56-2.56V20z"
        opacity=".09"
      />
      <linearGradient
        id="DqqEodsTc8fO7iIkpib~Na"
        x1="4.648"
        x2="23.403"
        y1="14.648"
        y2="33.403"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#5961c3" />
        <stop offset="1" stopColor="#3a41ac" />
      </linearGradient>
      <path
        fill="url(#DqqEodsTc8fO7iIkpib~Na)"
        d="M22,34H6c-1.105,0-2-0.895-2-2V16c0-1.105,0.895-2,2-2h16c1.105,0,2,0.895,2,2v16	C24,33.105,23.105,34,22,34z"
      />
      <path
        fill="#fff"
        d="M18.068,18.999H9.932v1.72h3.047v8.28h2.042v-8.28h3.047V18.999z"
      />
    </svg>
  );
}
