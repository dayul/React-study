import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import PropsStudy from './PropsStudy.jsx'
import UserInfo from './UserInfo.jsx'
import UseStateStudy from './UseStateStudy.jsx'

// index.html에 있는 root라는 div를 root로 사용 
// createRoot(document.getElementById('root')).render(<App />) 
// createRoot(document.getElementById('root')).render(<PropsStudy hello="world" mynum={100} obj={[1, 2, 3]}/>) 
// createRoot(document.getElementById('root')).render(<UserInfo name="John" age={20}/>)
createRoot(document.getElementById('root')).render(<UseStateStudy />)