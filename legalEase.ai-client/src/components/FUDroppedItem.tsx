import React, {
  useState,
  useEffect,
  memo,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";
import { useSpring, animated, config } from "react-spring";

const statuses = ["ready", "uploading", "done", "error"];

const FUDroppedItem: React.FC<{
  authId: string;
  file: File;
  url: string;
  fileKey: string;
  setpId: Dispatch<SetStateAction<string>>;
}> = ({ authId, file, url, fileKey, setpId }) => {
  // Filename from file object
  let { name } = file;

  // Retrieving file extension from filename
  let ext = name.split(".")[1].toUpperCase();

  const [progress, setProgress] = useState(0);
  const [upStatus, setUpStatus] = useState(statuses[0]);
  const [error, setError] = useState(null);

  // Animation for progress
  const progressAnim = useSpring({
    from: { width: "0%" },
    to: { width: `${progress}%` },
    config: config.stiff,
  });

  // Render Status icons
  const renderStatus = () => {
    if (upStatus === "done") {
      return (
        <svg
          version="1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          enableBackground="new 0 0 48 48"
        >
          <circle fill="#4CAF50" cx="24" cy="24" r="21" />
          <polygon
            fill="#CCFF90"
            points="34.6,14.6 21,28.2 15.4,22.6 12.6,25.4 21,33.8 37.4,17.4"
          />
        </svg>
      );
    } else if (upStatus === "error") {
      return (
        <button className="btn_try" onClick={upload}>
          <svg
            version="1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            enableBackground="new 0 0 48 48"
          >
            <path
              fill="#F44336"
              d="M21.2,44.8l-18-18c-1.6-1.6-1.6-4.1,0-5.7l18-18c1.6-1.6,4.1-1.6,5.7,0l18,18c1.6,1.6,1.6,4.1,0,5.7l-18,18 C25.3,46.4,22.7,46.4,21.2,44.8z"
            />
            <path
              fill="#fff"
              d="M21.6,32.7c0-0.3,0.1-0.6,0.2-0.9c0.1-0.3,0.3-0.5,0.5-0.7c0.2-0.2,0.5-0.4,0.8-0.5s0.6-0.2,1-0.2 s0.7,0.1,1,0.2c0.3,0.1,0.6,0.3,0.8,0.5c0.2,0.2,0.4,0.4,0.5,0.7c0.1,0.3,0.2,0.6,0.2,0.9s-0.1,0.6-0.2,0.9s-0.3,0.5-0.5,0.7 c-0.2,0.2-0.5,0.4-0.8,0.5c-0.3,0.1-0.6,0.2-1,0.2s-0.7-0.1-1-0.2s-0.5-0.3-0.8-0.5c-0.2-0.2-0.4-0.4-0.5-0.7S21.6,33.1,21.6,32.7z M25.8,28.1h-3.6L21.7,13h4.6L25.8,28.1z"
            />
          </svg>
        </button>
      );
    } else if (upStatus === "uploading") {
      return (
        <svg
          width="38"
          height="38"
          viewBox="0 0 38 38"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#000000"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(1 1)" strokeWidth="2">
              <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
              <path d="M36 18c0-9.94-8.06-18-18-18">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
          </g>
        </svg>
      );
    } else return null;
  };

  useEffect(() => {
    upload();
  }, []);

  const upload = () => {
    // Set status to "uploading"
    setUpStatus(statuses[1]);
    // Reset error state
    setError(null);

    // Using FormData API for sending File over REST API
    let formData = new FormData();
    formData.append(fileKey, file);
    formData.append("authId", authId);

    // Axios configuration
    let config = {
      // Calculating upload status and saving to state
      onUploadProgress: (progressEvent: any) => {
        let percentCompleted = Math.floor(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        setProgress(percentCompleted);
      },
    };

    // DEV only
    // If url is empty, Only run setTimeout
    if (!url || url == "") {
      setProgress(Math.ceil(Math.random() * 100));
      setTimeout(() => {
        setProgress(100);
        setUpStatus(statuses[2]);
      }, 2500);
      return;
    }
    // DEV only ends here

    // Calling a POST request
    axios
      .post(url, formData, config)
      .then((res) => {
        // Set status to done
        setpId(res?.data.data.pdf.pId);
        setUpStatus(statuses[2]);
      })
      .catch((e) => {
        // Set error state so that can show error message
        setError(e);
        // Set status to error
        setUpStatus(statuses[3]);
      });
  };

  return (
    <div className="fudi">
      <div className="fudi_icon_wrapper">
        <svg
          version="1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          enableBackground="new 0 0 48 48"
        >
          <polygon fill="#448bff" points="40,45 8,45 8,3 30,3 40,13" />
          <polygon fill="#E1F5FE" points="38.5,14 29,14 29,4.5" />
          <text
            x="24"
            y="31"
            fill="white"
            fontSize="12"
            fontWeight="bold"
            textAnchor="middle"
          >
            {ext}
          </text>
        </svg>
      </div>
      <div className="fudi_progress_wrapper">
        <div className="fudi_progress_top">
          <span className="fudi_name">{name.substr(0, 25)}</span>
          <span className="fudi_progress_percent">{progress}%</span>
        </div>
        <div className="fudi_progress_bar">
          <animated.div
            className="fudi_progress"
            style={progressAnim}
          ></animated.div>
        </div>
        {error && <span className="message">Failed</span>}
      </div>
      <div className="fudi_status">{renderStatus()}</div>
    </div>
  );
};

export default memo(FUDroppedItem);
