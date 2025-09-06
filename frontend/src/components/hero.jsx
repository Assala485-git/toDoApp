import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {useSelector} from 'react-redux';
import { LinkContainer} from 'react-router-bootstrap'


const Hero = () => {
  const {userInfo}=useSelector((state)=>state.auth);
  return (
    <Container className="d-flex justify-content-center mt-5">
      <Row>
        <Col>
          <Card className="text-center shadow-sm p-4">
            <Card.Body>
              <Card.Title className="mb-3 fs-3 fw-bold">
                Welcome to My Todo App
              </Card.Title>
              <Card.Text className="text-muted mb-4">
                Organize your tasks and boost your productivity.
              </Card.Text>
              <div className="d-flex justify-content-center gap-3">
                {userInfo ? (
                  <LinkContainer to='/tasks'>
                  <Button variant="primary" size="lg" >
                Go to My Tasks
                </Button>
                </LinkContainer>
                ):(
                  <>
                <LinkContainer to='/login'>
            <Button variant='primary' size="lg">
              Sign In
            </Button>
            </LinkContainer>
            <LinkContainer to='./register'>
                <Button variant="secondary" size="lg">
                  Register
                </Button>
                </LinkContainer>
                </>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Hero;
