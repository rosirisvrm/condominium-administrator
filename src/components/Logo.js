import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
};

function Logo({ disabledLink = false, sx, width = 200, height = 126 }) {
  
  // OR
  // const logo = <Box component="img" src="/static/logo.svg" sx={{ width: 40, height: 40, ...sx }} />

  const logo = (
    <Box sx={{ width, height, ...sx }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 375 169.5">
        <defs>
          <clipPath id="a">
            <path d="M.55 0h131.372v151.61H.55Zm0 0" />
          </clipPath>
          <clipPath id="b">
            <path d="M59.297 93.75h18.785v36.223H59.297Zm0 0" />
          </clipPath>
          <clipPath id="c">
            <path d="M73.285 3.008h62.442v71.11H73.285Zm0 0" />
          </clipPath>
        </defs>
        <path
          d="M151.217 92.08v4.905c0 3-.734 5.305-2.203 6.907-1.46 1.593-3.609 2.39-6.453 2.39-2.855 0-5.012-.797-6.469-2.39-1.46-1.602-2.187-3.907-2.187-6.907V77.782c0-2.988.727-5.285 2.187-6.89 1.457-1.602 3.614-2.407 6.47-2.407 2.843 0 4.991.805 6.452 2.407 1.47 1.605 2.203 3.902 2.203 6.89v3.594h-5.5v-3.969c0-1.332-.273-2.27-.812-2.812-.543-.551-1.273-.828-2.188-.828-.918 0-1.652.277-2.203.828-.543.543-.812 1.48-.812 2.812V97.36c0 1.344.27 2.282.812 2.813.551.523 1.285.781 2.203.781.915 0 1.645-.258 2.188-.781.539-.531.812-1.469.812-2.813v-5.28Zm8.853 5.28c0 1.344.269 2.29.812 2.829.55.543 1.285.812 2.203.812.914 0 1.644-.27 2.187-.812.54-.54.813-1.485.813-2.829V77.407c0-1.332-.274-2.27-.813-2.812-.543-.551-1.273-.828-2.187-.828-.918 0-1.653.277-2.203.828-.543.543-.813 1.48-.813 2.812Zm-5.798-19.578c0-2.988.754-5.285 2.266-6.89 1.508-1.602 3.691-2.407 6.547-2.407 2.844 0 5.02.805 6.531 2.407 1.52 1.605 2.281 3.902 2.281 6.89v19.203c0 3-.761 5.305-2.28 6.907-1.513 1.593-3.688 2.39-6.532 2.39-2.856 0-5.04-.797-6.547-2.39-1.512-1.602-2.266-3.907-2.266-6.907Zm26.536 1.313v26.765h-5.219V68.907h7.281l5.97 22.125V68.907h5.171v36.953h-5.969Zm17.359-10.188h9.187c2.914 0 5.086.778 6.516 2.328 1.426 1.555 2.14 3.825 2.14 6.813v18.687c0 2.993-.714 5.262-2.14 6.813-1.43 1.543-3.602 2.312-6.516 2.312h-9.187Zm5.812 5.282v26.39h3.266c.914 0 1.633-.258 2.156-.781.531-.531.797-1.469.797-2.813V77.782c0-1.332-.266-2.265-.797-2.797-.523-.53-1.242-.796-2.156-.796Zm21.044 23.171c0 1.344.27 2.29.813 2.829.55.543 1.285.812 2.203.812.914 0 1.644-.27 2.187-.812.54-.54.813-1.485.813-2.829V77.407c0-1.332-.274-2.27-.813-2.812-.543-.551-1.273-.828-2.187-.828-.918 0-1.653.277-2.203.828-.543.543-.813 1.48-.813 2.812Zm-5.797-19.578c0-2.988.754-5.285 2.266-6.89 1.508-1.602 3.691-2.407 6.547-2.407 2.843 0 5.02.805 6.53 2.407 1.52 1.605 2.282 3.902 2.282 6.89v19.203c0 3-.762 5.305-2.281 6.907-1.512 1.593-3.688 2.39-6.531 2.39-2.856 0-5.04-.797-6.547-2.39-1.512-1.602-2.266-3.907-2.266-6.907Zm33.661 17.36 3.969-26.235h8.062v36.953h-5.484v-26.5l-4.016 26.5h-5.484l-4.328-26.125v26.125h-5.063V68.907h8.078Zm16.249-26.235h5.812v36.953h-5.812Zm15.197 10.188v26.765h-5.219V68.907h7.282l5.968 22.125V68.907h5.172v36.953h-5.968Zm17.359-10.188h5.812v36.953h-5.812Zm15.572 0v28.516c0 1.336.27 2.266.813 2.797.55.523 1.281.781 2.187.781.914 0 1.645-.258 2.188-.781.55-.531.828-1.461.828-2.797V68.907h5.484v28.14c0 2.993-.73 5.29-2.187 6.892-1.461 1.593-3.617 2.39-6.469 2.39-2.844 0-5-.797-6.469-2.39-1.46-1.602-2.187-3.899-2.187-6.891v-28.14Zm27.751 26.235 3.969-26.235h8.062v36.953h-5.484v-26.5l-4.016 26.5h-5.484l-4.329-26.125v26.125h-5.062V68.907h8.078Zm-206.512 54.607h-5.86l-1-6.703h-7.124l-1.016 6.703h-5.328l5.906-36.953h8.5Zm-13.25-11.719h5.594l-2.797-18.687Zm15.929-25.234h9.187c2.914 0 5.086.777 6.516 2.328 1.425 1.554 2.14 3.824 2.14 6.812v18.688c0 2.992-.715 5.262-2.14 6.812-1.43 1.543-3.602 2.313-6.516 2.313h-9.187Zm5.812 5.28v26.392h3.266c.914 0 1.633-.258 2.156-.782.531-.531.797-1.468.797-2.812V121.67c0-1.332-.266-2.266-.797-2.797-.523-.531-1.242-.797-2.156-.797Zm28.013 20.954 3.968-26.234h8.063v36.953h-5.484v-26.5l-4.016 26.5h-5.484l-4.329-26.125v26.125h-5.062v-36.953h8.078Zm16.249-26.234h5.812v36.953h-5.812Zm15.197 10.187v26.766h-5.219v-36.953h7.281l5.97 22.125v-22.125h5.171v36.953h-5.969Zm17.359-10.187h5.812v36.953h-5.812Zm9.291 8.874c0-2.988.707-5.284 2.125-6.89 1.426-1.602 3.566-2.406 6.422-2.406 2.851 0 4.988.804 6.406 2.406 1.426 1.606 2.14 3.902 2.14 6.89v1.157h-5.484v-1.531c0-1.332-.258-2.27-.765-2.813-.512-.55-1.227-.828-2.141-.828-.918 0-1.633.277-2.14.828-.512.543-.766 1.48-.766 2.813 0 1.273.28 2.39.843 3.359.57.969 1.282 1.887 2.125 2.75a61.822 61.822 0 0 0 2.704 2.578 26.25 26.25 0 0 1 2.718 2.828 14.263 14.263 0 0 1 2.125 3.485c.563 1.304.844 2.828.844 4.578 0 3-.734 5.304-2.203 6.906-1.461 1.594-3.61 2.39-6.453 2.39-2.856 0-5.012-.796-6.469-2.39-1.46-1.602-2.187-3.906-2.187-6.906v-2.266h5.484v2.64c0 1.345.27 2.282.812 2.813.551.524 1.286.782 2.204.782.906 0 1.628-.258 2.171-.782.551-.531.829-1.468.829-2.812 0-1.258-.282-2.375-.844-3.344a14.098 14.098 0 0 0-2.11-2.75 51.043 51.043 0 0 0-2.718-2.578 25.546 25.546 0 0 1-2.72-2.828 14.311 14.311 0 0 1-2.108-3.485c-.563-1.3-.844-2.832-.844-4.593Zm18.781-8.874h17.953v5.28h-6.078v31.673h-5.813v-31.672h-6.062Zm32.612 36.953a21.76 21.76 0 0 0-.218-.688 6.205 6.205 0 0 1-.172-.781 9.812 9.812 0 0 1-.11-1.219 42.45 42.45 0 0 1-.03-1.86v-5.796c0-1.727-.306-2.941-.907-3.64-.594-.708-1.559-1.063-2.89-1.063h-2v15.047h-5.813v-36.953h8.765c3.02 0 5.207.71 6.563 2.125 1.351 1.406 2.031 3.53 2.031 6.375v2.906c0 3.805-1.266 6.305-3.797 7.5 1.477.594 2.488 1.57 3.031 2.922.551 1.355.829 3 .829 4.937v5.703c0 .918.03 1.72.093 2.407.07.68.25 1.37.532 2.078Zm-6.328-31.672v11.344h2.266c1.094 0 1.945-.282 2.562-.844.614-.563.922-1.582.922-3.063v-3.64c0-1.332-.242-2.297-.719-2.89-.468-.602-1.214-.907-2.234-.907Zm34.196 31.672h-5.86l-1-6.703h-7.124l-1.016 6.703h-5.328l5.906-36.953h8.5Zm-13.25-11.719h5.594l-2.797-18.687Zm14.241-25.234h17.953v5.28h-6.078v31.673h-5.812v-31.672h-6.063Zm25.8 28.453c0 1.344.27 2.289.813 2.828.55.543 1.285.812 2.203.812.914 0 1.644-.27 2.187-.812.54-.54.813-1.484.813-2.828v-19.953c0-1.332-.274-2.27-.813-2.813-.543-.55-1.273-.828-2.187-.828-.918 0-1.653.277-2.203.828-.543.543-.813 1.48-.813 2.813Zm-5.797-19.578c0-2.989.754-5.285 2.266-6.891 1.508-1.602 3.691-2.406 6.547-2.406 2.844 0 5.02.804 6.531 2.406 1.52 1.606 2.281 3.902 2.281 6.89v19.204c0 3-.761 5.304-2.28 6.906-1.513 1.594-3.688 2.39-6.532 2.39-2.856 0-5.04-.796-6.547-2.39-1.512-1.602-2.266-3.906-2.266-6.906Zm33.505 28.078c-.075-.25-.149-.477-.22-.688a6.205 6.205 0 0 1-.17-.781 9.812 9.812 0 0 1-.11-1.219c-.024-.5-.032-1.117-.032-1.86v-5.796c0-1.727-.304-2.941-.906-3.64-.594-.708-1.558-1.063-2.89-1.063h-2v15.047h-5.813v-36.953h8.766c3.02 0 5.207.71 6.562 2.125 1.352 1.406 2.031 3.53 2.031 6.375v2.906c0 3.805-1.265 6.305-3.796 7.5 1.476.594 2.488 1.57 3.03 2.922.552 1.355.829 3 .829 4.937v5.703c0 .918.031 1.72.094 2.407.07.68.25 1.37.53 2.078Zm-6.328-31.672v11.344h2.265c1.094 0 1.946-.282 2.563-.844.613-.563.922-1.582.922-3.063v-3.64c0-1.332-.243-2.297-.72-2.89-.468-.602-1.214-.907-2.234-.907Zm0 0"
          fill="#005954"
        />
        <g clipPath="url(#a)">
          <path
            fill="#ff914d"
            d="M108.941 151.594H22.988c-.734 0-1.468-.04-2.199-.114a22.202 22.202 0 0 1-4.316-.863 21.873 21.873 0 0 1-2.075-.746 22.644 22.644 0 0 1-5.652-3.398 22.015 22.015 0 0 1-1.633-1.48 22.345 22.345 0 0 1-3.926-5.305 22.685 22.685 0 0 1-.945-1.997 22.65 22.65 0 0 1-1.281-4.223 23.13 23.13 0 0 1-.438-4.39V68.695c0-1.422.133-2.832.403-4.23a21.74 21.74 0 0 1 1.203-4.07 22.075 22.075 0 0 1 4.605-7.086l45.98-47.657a18.03 18.03 0 0 1 1.349-1.27 18.662 18.662 0 0 1 3.039-2.1 18.003 18.003 0 0 1 1.664-.81 18.075 18.075 0 0 1 3.527-1.1c.602-.122 1.21-.216 1.828-.278a18.155 18.155 0 0 1 3.692 0 19.2 19.2 0 0 1 1.828.277c.605.125 1.203.277 1.793.461a18.47 18.47 0 0 1 1.734.64 19.21 19.21 0 0 1 1.664.81 19.128 19.128 0 0 1 3.04 2.1c.468.403.917.825 1.347 1.27l50.265 52.098a6.789 6.789 0 0 1 1.457 2.25c.168.418.293.848.375 1.293.082.445.118.89.114 1.344a7.006 7.006 0 0 1-.153 1.336c-.093.441-.23.87-.41 1.285a6.847 6.847 0 0 1-2.574 3.04 7.006 7.006 0 0 1-1.2.616 6.988 6.988 0 0 1-1.292.367 6.99 6.99 0 0 1-1.34.106 7.007 7.007 0 0 1-1.336-.157 6.78 6.78 0 0 1-2.45-1.078 6.622 6.622 0 0 1-1.019-.875L69.383 15.2a4.795 4.795 0 0 0-.719-.629 4.605 4.605 0 0 0-.836-.465 4.617 4.617 0 0 0-1.863-.387c-.32 0-.637.032-.95.098-.312.063-.617.16-.913.29-.293.124-.57.28-.832.464a4.824 4.824 0 0 0-.723.63L16.563 62.835a8.349 8.349 0 0 0-1.747 2.707 8.287 8.287 0 0 0-.597 3.168v60.367a8.936 8.936 0 0 0 .672 3.371c.222.535.492 1.04.812 1.524a8.939 8.939 0 0 0 2.426 2.43 8.865 8.865 0 0 0 4.879 1.488h85.953c.45 0 .894.043 1.336.129a6.893 6.893 0 0 1 2.465 1.023 6.747 6.747 0 0 1 1.883 1.89 6.893 6.893 0 0 1 1.023 2.473 6.945 6.945 0 0 1 0 2.672c-.09.442-.219.871-.39 1.285a6.752 6.752 0 0 1-.633 1.184 6.743 6.743 0 0 1-3.066 2.523 6.734 6.734 0 0 1-1.282.39 6.68 6.68 0 0 1-1.336.134Zm0 0"
          />
        </g>
        <g clipPath="url(#b)">
          <path
            fill="#005954"
            d="M78.059 103.512c0-5.39-4.196-9.762-9.371-9.762-5.176 0-9.372 4.371-9.372 9.762 0 3.773 2.051 7.043 5.055 8.668l-4.074 17.793h16.781l-4.07-17.793c3-1.625 5.05-4.895 5.05-8.668Zm0 0"
          />
        </g>
        <g clipPath="url(#c)">
          <path
            fill="#ff914d"
            d="M112.516 155.941H25.68a22.225 22.225 0 0 1-4.426-.441 21.76 21.76 0 0 1-2.156-.543 22.338 22.338 0 0 1-4.11-1.703 22.79 22.79 0 0 1-6.844-5.621 23.184 23.184 0 0 1-2.473-3.703 23.657 23.657 0 0 1-.952-2.012 22.981 22.981 0 0 1-1.293-4.258 23.298 23.298 0 0 1-.442-4.43V72.31a22.042 22.042 0 0 1 .407-4.266c.27-1.406.675-2.777 1.214-4.106a21.82 21.82 0 0 1 1.98-3.8 22.035 22.035 0 0 1 2.673-3.348L55.71 8.711c.43-.45.887-.875 1.36-1.281.476-.403.968-.782 1.484-1.137a18.867 18.867 0 0 1 3.27-1.8 19.6 19.6 0 0 1 1.753-.645c.594-.184 1.195-.34 1.809-.465a18.333 18.333 0 0 1 3.71-.375 18.618 18.618 0 0 1 3.716.375c.609.125 1.21.281 1.808.465.594.187 1.18.402 1.754.644a19.062 19.062 0 0 1 3.27 1.801 18.979 18.979 0 0 1 2.843 2.417l50.782 52.56c.316.324.601.68.847 1.062.25.379.457.781.625 1.207.168.422.293.856.38 1.305.081.445.116.898.112 1.355a7.123 7.123 0 0 1-.152 1.348 7.161 7.161 0 0 1-.414 1.297 7.192 7.192 0 0 1-.66 1.187 6.937 6.937 0 0 1-1.945 1.879 7.049 7.049 0 0 1-1.208.621 6.81 6.81 0 0 1-2.66.477 6.756 6.756 0 0 1-2.64-.578 6.785 6.785 0 0 1-2.215-1.55L72.55 18.343a4.69 4.69 0 0 0-.726-.637 4.69 4.69 0 0 0-.844-.469 4.664 4.664 0 0 0-1.883-.39 4.664 4.664 0 0 0-1.878.39 4.56 4.56 0 0 0-.844.469 4.718 4.718 0 0 0-.73.637L19.188 66.402a8.347 8.347 0 0 0-1.762 2.73 8.352 8.352 0 0 0-.606 3.192v60.906a8.873 8.873 0 0 0 .68 3.399 8.9 8.9 0 0 0 6.469 5.316 8.81 8.81 0 0 0 1.73.172h86.836c.453 0 .903.043 1.348.133a7.018 7.018 0 0 1 2.492 1.031c.375.254.723.54 1.047.86.32.324.605.672.855 1.05a6.858 6.858 0 0 1 1.035 2.489 7.137 7.137 0 0 1 0 2.699c-.09.445-.222.879-.394 1.297a7.038 7.038 0 0 1-1.496 2.242 7.08 7.08 0 0 1-1.047.86 6.798 6.798 0 0 1-2.492 1.031c-.446.09-.895.132-1.348.132Zm0 0"
          />
        </g>
      </svg>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/dashboard/home">{logo}</RouterLink>;
}

export { Logo };
