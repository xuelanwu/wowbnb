import { useState } from "react";
import { Modal } from "../../context/Modal";
import EditSpotForm from "./EditSpotForm";

const EditSpotModal = ({ spot }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="edit-spot-button-box">
      <button onClick={() => setShowModal(true)}>Edit Spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSpotForm setShowModal={setShowModal} spot={spot} />
        </Modal>
      )}
    </div>
  );
};

export default EditSpotModal;
