import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./Popup.css";

interface Props {
  src: string;
  alt: string;
}

const ControlledPopup: React.FC<Props> = ({ src, alt }) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  return (
    <div>
      <button
        type="button"
        className="buttonMy"
        onClick={() => setOpen((o) => !o)}
      >
        &#128269; 
      </button>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="modal">
          <button className="close" onClick={closeModal}>
            &times;
          </button>
          <div className="imgWrapper">

          <img src={src} alt={alt} />
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default ControlledPopup;
