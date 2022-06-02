import { createContext, useContext } from "react"
import socketio from "socket.io-client"

// Create context for the socket.io connection.
const SocketContext = createContext()

const socket = socketio.connect(process.env.REACT_APP_SERVER_URL)
console.log(socket)

// Export a function for accessing the context.
export const useSocketContext = () => {
    return useContext(SocketContext)
}

const SocketContextProvider = ({ children }) => {
    return (
        // Pass the socket connection as a prop to all children
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContextProvider