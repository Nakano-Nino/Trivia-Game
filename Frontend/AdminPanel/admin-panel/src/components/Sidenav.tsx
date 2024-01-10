// src/components/Sidebar.tsx
import React from "react"
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidenav: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Menu</DrawerHeader>
        <DrawerBody
          className="p-4 justify-items-center"
          style={{ alignItems: "center" }}
        >
          <ul>
            <li className="py-2">Menu 1</li>
            <li className="py-2">Menu 2</li>
            <li className="py-2">Menu 3</li>
          </ul>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default Sidenav
