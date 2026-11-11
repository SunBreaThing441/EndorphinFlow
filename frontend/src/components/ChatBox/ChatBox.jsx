import { ChatEngine } from 'react-chat-engine';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import './ChatBox.css';

export default function ChatBox() {
  const user = useContext(UserContext);
  const userType = {
    // Patient: {
    //   userName: 'Bob',
    //   userSecret: 'test',
    // },
    // Practitioner: {
    //   userName: 'Dr. Bob',
    //   userSecret: 'test',
    // },
    Patient: {
      userName: 'Batman',
      userSecret: 'test',
    },
    Practitioner: {
      userName: 'Joker',
      userSecret: 'test',
    },
  };

  const selected =
    user === 'patient' ? userType.Patient : userType.Practitioner;
  console.log('from ChatBox line 19:', selected);

  return (
    <ChatEngine
      projectID='085cfa50-b937-4736-928d-105a1c59302e'
      // userName='Bob'
      // userSecret='test'
      // userName='Dr. Bob'
      // userSecret='test'
      userName={selected.userName}
      userSecret={selected.userSecret}
      height='75vh' // keeps height fixed as chat size increases
    />
  );
}
