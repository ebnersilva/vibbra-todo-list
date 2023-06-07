import { Container, Form, Title, BottonText } from './styles';
import { auth } from '../../services/firebase';
import { useCallback, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function Login() {
  const [isSigning, setIsSigning] = useState(true);

  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleRegister = useCallback(async () => {
    try {
      if (!registerEmail || !registerPassword) {
        alert('Dados inválidos')
        return;
      }
      await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
    }catch (error) {
      console.log(error)
      alert('Erro: ', error);
    }
  }, [registerEmail, registerPassword]);

  const handleLogin = useCallback(async () =>{
    try {
      if (!loginEmail || !loginPassword) {
        alert('Dados inválidos')
        return;
      }
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    }catch (error) {
      alert('Erro: ', error);
    }
  }, [loginEmail, loginPassword]);

  const handleOnSignUp = () => {
    setIsSigning(false)
    setLoginEmail('');
    setLoginPassword('');
  }

  const handleOnSignIn = () => {
    setIsSigning(true)
    setRegisterEmail('');
    setRegisterPassword('');
  }


  return (
    <Container>
      <Title>Bem vindo ao TodoApp</Title>
      {isSigning ? (
        <Form>
          <FormGroup>
            <Input placeholder='Informe o e-mail' onChange={(e) => setLoginEmail(e.target.value)} value={loginEmail} />
          </FormGroup>

          <FormGroup>
            <Input type="password" placeholder='Informe a senha' onChange={(e) => setLoginPassword(e.target.value)} value={loginPassword} />
          </FormGroup>
          
          <FormGroup>
            <Button onClick={handleLogin}>Logar usuário</Button>
          </FormGroup>

          <BottonText onClick={handleOnSignUp}>Ainda não tem uma conta? Cadastre-se</BottonText>
        </Form>
      ) : (
        <Form>
          <FormGroup>
            <Input placeholder='Informe o e-mail' onChange={(e) => setRegisterEmail(e.target.value)} value={registerEmail} />
          </FormGroup>

          <FormGroup>
            <Input type="password" placeholder='Informe a senha' onChange={(e) => setRegisterPassword(e.target.value)} value={registerPassword} />
          </FormGroup>

          <FormGroup>
            <Button onClick={handleRegister}>Cadastrar Usuário</Button>
          </FormGroup>

          <BottonText onClick={handleOnSignIn}>Já possuí uma conta? Faça login</BottonText>
        </Form>
      )}
    </Container>
  )
}