import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import {
  Form,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Row,
  Col,
} from "reactstrap";
import Axios from "axios";
import { useSelector } from "react-redux";

toast.configure();
const ModalCarousel = ({
  onClick,
  title,
  description,
  link,
  picture,
  uuid,
}) => {
  const notifySuccess = () => {
    toast.success("Carousel bien modifié !", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const notifyError = () => {
    toast.error("Erreur Notification !", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const [modal, setModal] = useState(false);

  const [carousel, setCarousel] = useState({
    title,
    description,
    link,
    picture,
  });
  const { handleSubmit, register } = useForm();
  // const onSubmit = (values) => console.log(values);

  const [clicked, setClicked] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const token = useSelector((state) => state.admin.token);

  const putCarousel = async () => {
    try {
      await Axios.put(
        `https://btz-js-202003-p3-lookup-back.jsrover.wilders.dev/carousels/${uuid}`,
        carousel,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setClicked(true);
      notifySuccess();
    } catch (err) {
      notifyError();
      console.log(err);
    }
  };

  return (
    <Container>
      <Button color={clicked ? "primary" : "danger"} onClick={toggle}>
        Modifier
      </Button>

      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Carousel</ModalHeader>
        <Form onSubmit={handleSubmit(putCarousel)}>
          <ModalBody>
            <Row>
              <Col lg="12">
                <label>Titre </label>
              </Col>
            </Row>
            <Row>
              <Col lg="6">{title}</Col>
              <Col lg="6">
                <input
                  ref={register({ required: true })}
                  type="text"
                  name="title"
                  onChange={(e) =>
                    setCarousel({
                      ...carousel,
                      title: e.target.value,
                    })
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <label> Description</label>
              </Col>
            </Row>
            <Row>
              <Col lg="6">{description}</Col>
              <Col lg="6">
                <input
                  ref={register({ required: true })}
                  name="description"
                  type="text"
                  onChange={(e) =>
                    setCarousel({
                      ...carousel,
                      description: e.target.value,
                    })
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <label>Lien </label>
              </Col>
            </Row>
            <Row>
              <Col lg="6">{link}</Col>
              <Col lg="6">
                <input
                  ref={register({ required: true })}
                  type="text"
                  name="lien"
                  onChange={(e) =>
                    setCarousel({
                      ...carousel,
                      link: e.target.value,
                    })
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <label> Image</label>
              </Col>
            </Row>
            <Row>
              <Col lg="6">{picture}</Col>
              <Col lg="6">
                <input
                  ref={register({ required: true })}
                  type="text"
                  name="image"
                  onChange={(e) =>
                    setCarousel({
                      ...carousel,
                      picture: e.target.value,
                    })
                  }
                />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={onClick}>
              Valider
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Annuler
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
};

export default ModalCarousel;
