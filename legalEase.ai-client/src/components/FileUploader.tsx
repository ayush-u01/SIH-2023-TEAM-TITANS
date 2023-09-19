"use client";
import React, {
  Dispatch,
  DragEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useSpring, animated } from "react-spring";
import FUDroppedItem from "./FUDroppedItem";
import { GetFile } from "@/utils/api";
import { PDFType } from "@/utils/interface";

const FileUploader: React.FC<{
  pId: string;
  authId: string;
  url: string;
  fileKey: string;
  setpId: Dispatch<SetStateAction<string>>;
}> = ({ pId = "", authId = "", url = "", fileKey = "key", setpId }) => {
  const [isDrop, setDrop] = useState(false);
  const [files, setFiles] = useState<FileList | null>();
  const [pdf, setPDF] = useState<PDFType>();

  useEffect(() => {
    const FetchFile = async () => {
      const response: any = await GetFile({ pId });
      setPDF(response?.data.data.pdf);
    };
    FetchFile();
  }, [pId]);

  // Small animation for "fu_bottom" Div
  const fubStyles = useSpring({
    from: { opacity: 0 },
    to: { opacity: isDrop ? 1 : 0 },
    delay: 100,
  });

  // onDragEnter - Add some styling using "overed" class
  const dragEnter = (e: any) => {
    e.preventDefault();
    if (e.target.className === "drop_area") {
      e.target.className = "drop_area overed";
    }
  };

  const dragOver = (e: any) => {
    e.preventDefault();
  };

  // onDragLeave - Remove "overed" class from drop_area
  const dragLeave = (e: any) => {
    resetClass(e);
  };

  // onDragDrop - Remove "overed" class, save files to state, set drop flag to true
  const dragDrop = (e: any) => {
    resetClass(e);
    setFiles(e.dataTransfer.files);
    setDrop(true);
  };

  // Remove overed class
  const resetClass = (e: any) => {
    e.preventDefault();
    if (e.target.className === "drop_area overed") {
      e.target.className = "drop_area";
    }
  };

  // Reset States: Remove all files from state
  const clear = () => {
    setDrop(false);
    setFiles(null);
  };

  return (
    <div className="fu_wrapper">
      {/* Top section */}

      <div className="fu_top">
        <h3>Upload your files</h3>
        <input
          type="file"
          id="fileElem"
          accept="image/*"
          onChange={(e) => {
            if (e) {
              setFiles(e.target.files);
              setDrop(true);
            }
          }}
        />
        <label className="upload-label" htmlFor="fileElem">
          <div
            className="drop_area"
            onDragEnter={dragEnter}
            onDragOver={dragOver}
            onDragLeave={dragLeave}
            onDrop={dragDrop}
          >
            <div className="folder_icon_wrapper">
              {isDrop ? (
                <svg
                  version="1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  enableBackground="new 0 0 48 48"
                >
                  <path
                    fill="#FFA000"
                    d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z"
                  />
                  <path
                    fill="#FFCA28"
                    d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"
                  />
                </svg>
              ) : (
                <svg
                  version="1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  enableBackground="new 0 0 48 48"
                >
                  <path
                    fill="#FFA000"
                    d="M38,12H22l-4-4H8c-2.2,0-4,1.8-4,4v24c0,2.2,1.8,4,4,4h31c1.7,0,3-1.3,3-3V16C42,13.8,40.2,12,38,12z"
                  />
                  <path
                    fill="#FFCA28"
                    d="M42.2,18H15.3c-1.9,0-3.6,1.4-3.9,3.3L8,40h31.7c1.9,0,3.6-1.4,3.9-3.3l2.5-14C46.6,20.3,44.7,18,42.2,18z"
                  />
                </svg>
              )}
            </div>

            <p>Drag & Drop files here.</p>
          </div>
        </label>
      </div>
      {/* Top section ends here */}

      {/* Bottom section */}
      {files?.length ? (
        <animated.div className="fu_bottom" style={fubStyles}>
          <h4 className="fub_title">Files</h4>
          <div className="dropped_items">
            {Array.from(files).map((f, i) => (
              <FUDroppedItem
                setpId={setpId}
                authId={authId}
                key={`file-${f.name}`}
                file={f}
                url={url}
                fileKey={fileKey}
              />
            ))}
          </div>
          <button
            style={{ background: "none", border: "none", float: "right" }}
            onClick={clear}
          >
            Clear
          </button>
        </animated.div>
      ) : (
        <div>
          {pId !== "" && (
            <div className="pt-5 w-full justify-between flex items-center">
              <div className="flex items-center gap-3">
                <div className="w-10">
                  <svg
                    version="1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    enableBackground="new 0 0 48 48"
                  >
                    <polygon
                      fill="#448bff"
                      points="40,45 8,45 8,3 30,3 40,13"
                    />
                    <polygon fill="#E1F5FE" points="38.5,14 29,14 29,4.5" />
                    <text
                      x="24"
                      y="31"
                      fill="white"
                      fontSize="12"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {"PDF"}
                    </text>
                  </svg>
                </div>
                <p className="text-sm">
                  {pdf?.link.split("/")[3].split(".")[0]}
                </p>
              </div>
              <div className="w-8">
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
              </div>
            </div>
          )}
        </div>
      )}
      {/* Bottom section ends here */}
    </div>
  );
};

export default FileUploader;
