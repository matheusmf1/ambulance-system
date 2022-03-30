import { React, useRef, useState } from "react";
import { Container,Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthProvider";
import { Link, useHistory } from "react-router-dom";

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth();
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Senhas não conferem")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch( error ) {
      console.error( error )
      setError("Erro ao criar o usuário, por favor tente novamente");
    }

    setLoading(false);
  }

  return (
    <>
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", width: "100vw" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
      
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Cadastre-se</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>

              <Form.Group id="email" className="mt-2">
                <Form.Label className="mb-0">Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>

              <Form.Group id="password" className="mt-2">
                <Form.Label className="mb-0">Senha</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>

              <Form.Group id="password-confirm" className="mt-2">
                <Form.Label className="mb-0">Confirmação da Senha</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef} required />
              </Form.Group>

              <Button disabled={loading} className="w-100 mt-3" type="submit">
                Cadastre-se
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <div className="w-100 text-center mt-2">
          Já possui uma conta?<Link to="/login">Log In</Link>
        </div>

      </div>
    </Container>
    </>
  )
}
