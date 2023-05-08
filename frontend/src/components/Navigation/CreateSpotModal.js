import { useHistory } from "react-router-dom";

const CreateSpotModal = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/spots");
  };

  return (
    <>
      <button onClick={handleClick} className="create-spot-button">
        Airbnb Your Home
      </button>
      {/* {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSpotForm setShowModal={setShowModal} />
        </Modal>
      )} */}
    </>
  );
};

export default CreateSpotModal;
