import { ChatEngineWrapper, ChatSocket, ChatFeed } from 'react-chat-engine';

import { Col } from 'react-grid-system';

const Chat = () => {
  const projectID = '085cfa50-b937-4736-928d-105a1c59302e';
  const chatID = '73033';
  const chatAccessKey = 'ca-8e19117f-b3c3-4af3-831c-7ab787127808';
  const senderUsername = 'Bob';

  return (
    <div>
      <Col xs={11} ms={9} md={6} lg={4}>
        <ChatEngineWrapper>
          <ChatSocket
            projectID={projectID}
            chatID={chatID}
            chatAccessKey={chatAccessKey}
            senderUserName={senderUsername}
          />

          <ChatFeed activeChat={chatID} />
        </ChatEngineWrapper>
      </Col>
    </div>
  );
};

export default Chat;
