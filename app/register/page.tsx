'use client'
import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function Register() {

  const auth = useAuth();

  const router = useRouter();

  function register(ev: any) {
    console.log(ev)
    fetch("/api/v1/register", {
      method: "POST",
      body: JSON.stringify({
        username: ev.target[0].value,
        password: ev.target[1].value
      }),
    }).then((response: any) => {
      response.json().then((data: any) => {
        if (data.username) {
          auth.setAuth(data);
          router.push('/');
        }
      })
    });
  }

  return (
    <React.Fragment>
      <Modal open={true}>
        <ModalDialog size='lg' variant='soft' color='danger'>
          <DialogTitle>Registration</DialogTitle>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              register(event)
            }}
          >
            <Stack spacing={2}>
              <FormControl color='danger'>
                <FormLabel >UserName</FormLabel>
                <Input variant='soft' color='success' autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel >Password</FormLabel>
                <Input variant='soft' color='success' required type={'password'} />
              </FormControl>
              <Button type="submit">Register</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}