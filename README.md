# EndorphinFlow

## Description

Complete fullstack webapp built on React, websockets, WebRTC, YoutubeAPI v3, and Reactive Calander API to bridge the divide between remote patients in need of mental health services and the practitioners who are willing to provide it.

EndorphinFlow provides patients with the ability to browse uploaded media pertaining to CBT-based approaches to counseling. The video content is uploaded by practitioners specialising in a modality of treatment catering to diverse patient needs. Patients are able to search for Practitioners, request sessions on a particular date and time, and Practitioners are able to accept appointment requests. Sessions can be held over video chat or messaging, both of which are integrated on the platform.

EndorphinFlow ensures that no matter how remote a person is, they will only be a click away from accredited, world class mental health professionals. At EndorphinFlow, no matter what you're going through --you will never walk alone!

## Features

- SPA design using React
- Data is persisted by API server using PostgreSQL database
- Client application communicates with API server via HTTP using JSON
- Full testing with 7 suites of 35 tests using Jest, as well as E2E testing
  for complete user story via Cypress
- Users can:
  - create, delete, and edit appointments
  - get a real-time update of appointment availability
  - click on available spots to add new appointments
  - store and retrieve appointment schedules from the database
  - search practitioners by name, speciality and availability

## Getting Started

1. Install dependencies with `npm install`, in both the frontend and backend directories.
2. Run `npm start` from both the frontend and backend directories.

## Creating, Updating, Deleting Appointment Requests

Patient can request a session with a practitioner, edit that session, and delete it in real-time.
Practitioner can see and assign themselves to the session requests in real-time.

!["calendar"](https://github.com/habibcodes/therapify/blob/master/images/calendar.gif?raw=true)

## Patient and Practitioner Live Chat

Patient and Practitioner can have a therapy session over live chat. Participants in the chat can add rooms, upload and share media, see if the message was sent and who is typing. User that creates room can moderate by remove or adding new participants to the chat.

!["chat session"](https://github.com/habibcodes/therapify/blob/master/images/chat.gif?raw=true)

## Search Practitioners

Patients can search for a Practitioner, see their details and rates, and proceed to request an appointment.

!["search practitioner"](https://github.com/habibcodes/therapify/blob/master/images/search.gif?raw=true)

## Patient and Practitioner Live Video

Patient can receive therapy sessions via live video link by placing a call to the Practitioner's address (clipboard currently as it is not deployed). Person receiving the call can accept or decline. Both users can toggle their webcams on and off.

!["video session"](https://github.com/habibcodes/therapify/blob/master/images/video.gif?raw=true)

## Patient Counselling Self Help Content Search

Patient can search for and browse content uploaded by Practitioner to YouTube and query via the YouTube Data v3 API. This feature is catered more towards self-help therapy for those Patients/users who do not request either Chat or Video therapy sessions.

!["therapy video search"](https://github.com/habibcodes/therapify/blob/master/images/youtube.gif?raw=true)

## Technology Stack

- Front-end:

  - ReactJS
  - MaterialUI
  - Axios
  - CSS
  - JSX
  - Calender API

- Back-end:
  - Express
  - NodeJS
  - PostgreSQL
  - YouTube Data API v3
  - ChatEngine
  - WebRTC
  - Socket.io
  - Simple-peer

## Dependencies

- "@devexpress/dx-core": "^2.7.6",
- "@devexpress/dx-react-core": "^2.7.6",
- "@devexpress/dx-react-scheduler": "^2.7.6",
- "@devexpress/dx-react-scheduler-material-ui": "^2.7.6",
- "@emotion/react": "^11.6.0",
- "@material-ui/core": "^4.12.3",
- "@material-ui/icons": "^4.11.2",
- "@mui/icons-material": "^5.1.1",
- "@mui/material": "^5.1.1",
- "@testing-library/jest-dom": "^5.11.4",
- "@testing-library/react": "^11.1.0",
- "@testing-library/user-event": "^12.1.10",
- "axios": "^0.24.0",
- "bootstrap": "^5.1.3",
- "node-sass": "^6.0.1",
- "randomcolor": "^0.6.2",
- "react": "^17.0.2",
- "react-bootstrap": "^2.0.2",
- "react-chat-engine": "^1.11.21",
- "react-copy-to-clipboard": "^5.0.4",
- "react-dom": "^17.0.2",
- "react-icons": "^4.3.1",
- "react-router-dom": "^6.0.2",
- "react-scripts": "4.0.3",
- "simple-peer": "^9.11.0",
- "socket.io-client": "^4.4.0",
- "storybook": "^6.3.12",
- "web-vitals": "^1.0.1"
- "cookie-parser": "~1.4.4",
- "cors": "^2.8.5",
- "debug": "~2.6.9",
- "express": "~4.16.1",
- "morgan": "~1.9.1",
- "nodemon": "^2.0.15",
- "pg": "^8.7.1",
- "pg-native": "^3.0.0",
- "socket.io": "^4.4.0"

## Dev Dependencies

- Nodemon
- Morgan

## Developers

- [Ahmed Tarabia](https://github.com/ahmedtarabia)
- [Nikolay Yozov](https://github.com/nyozov)
- [Habib Zai](https://github.com/habibcodes)
