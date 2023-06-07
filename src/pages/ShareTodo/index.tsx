import { Container, Form } from './styles';
import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import ButtonPrimary from '../../components/ButtonPrimary';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { toast } from 'react-toastify';

export default function ShareTodo() {
  const { todoId } = useParams();

  const { userLoggedIn } = useAppSelector(state => state.auth.data);

  const navigate = useNavigate();
  const [destinationEmail, setDestinationEmail] = useState('');

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userLoggedIn) {
      toast.error('Erro interno. Tente novamente!');

      return;
    }

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID, 
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID, 
      {
        'from_name': userLoggedIn.email,
        'user_email': destinationEmail,
        'message': `Link do todo: ${import.meta.env.VITE_APP_URL}/edit-todo/${todoId}`
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
        setDestinationEmail('');
        navigate('/')
    }, (error) => {
        toast.error('Erro ao enviar o e-mail', error.text)
    });
  };

  return (
    <Container>
      <Form>
        <FormGroup>
          <span>Deseja compartilhar o todo com qual e-mail?</span>
          <Input 
            placeholder="E-mail" 
            onChange={(e) => setDestinationEmail(e.target.value)} 
            value={destinationEmail}
          />
        </FormGroup>
        

        <FormGroup>
          <ButtonPrimary onClick={sendEmail}>
            COMPARTILHAR
          </ButtonPrimary>
        </FormGroup>
      </Form>
    </Container>
  )

}