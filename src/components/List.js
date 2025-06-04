import { useState } from "react";
import Container from "react-bootstrap/Container";
import "./List.scss";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const List = ({ data }) => {
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleClose = () => setShowModal(false);
  const handleShowModal = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const employeesPerPage = 5;
  const indexOfLastEmployee = page * employeesPerPage;
  const indexofFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = data.slice(indexofFirstEmployee, indexOfLastEmployee);

  const nextPage = () => {
    const totalPages = Math.ceil(data.length / employeesPerPage);
    setPage((page) => (page < totalPages ? page + 1 : page));
  };

  const prevPage = () => {
    setPage((page) => (page > 1 ? page - 1 : page));
  };

  return (
    <Container className="main d-flex flex-column justify-content-center align-items-center gap-3">
      <div className="title d-flex justify-content-between align-items-end">
        <h1 className="p-2 text-center">Employee List</h1>
        <div className="py-1 d-flex gap-2 align-items-end">
          <p className="fw-bold">
            Employees {indexofFirstEmployee + 1} to {indexOfLastEmployee}
          </p>
          <button onClick={prevPage}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button onClick={nextPage}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id} onClick={() => handleShowModal(employee)}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.age} years</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedEmployee ? (
              <>
                {selectedEmployee.image && (
                  <img
                    src={selectedEmployee.image}
                    alt={selectedEmployee.name}
                    style={{ width: "50px", height: "50px", marginRight: "10px" }}
                  />
                )}
                <p>{selectedEmployee.name}</p>
              </>
            ) : (
              <p>No employee selected</p>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEmployee ? (
            <>
              <p>
                <span className="fw-bold">Email:</span> {selectedEmployee.email}
              </p>
              <p>
                <span className="fw-bold">Age:</span> {selectedEmployee.age} years
              </p>
            </>
          ) : (
            <p>Please select an employee from the list.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default List;