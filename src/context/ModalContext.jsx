import { useState, useContext,createContext } from "react";


const modalContext = createContext();



export default function ModalContextProvider ({children}){
    const [isOpen,setIsOpen] = useState(false);

    return <modalContext.Provider value={{isOpen,setIsOpen}}>
        {children}
    </modalContext.Provider>
}

export function useModalContext(){
    return useContext(modalContext)
}
