import { useState } from "react";
import { Modal } from "../../context/Modal";
import ReviewForm from "../ReviewForm";

const CreateReviewModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="create-review-modal">
      <button
        onClick={() => setShowModal(true)}
        className="create-review-button"
      >
        Write A Review
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReviewForm setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
};

export default CreateReviewModal;
