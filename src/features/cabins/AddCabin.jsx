import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add New Cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>

      {/* <Modal.Open opens="table">
        <Button>Show Table</Button>
      </Modal.Open>
      <Modal.Window opens="table">
        <CreateCabinForm />
      </Modal.Window> */}
    </Modal>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <>
//       <Button onClick={() => setIsOpenModal((s) => !s)}>Add new Cabin</Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal((open) => !open)}>
//           <CreateCabinForm
//             onCloseModal={() => setIsOpenModal((open) => !open)}
//           />
//         </Modal>
//       )}
//     </>
//   );
// }

export default AddCabin;
