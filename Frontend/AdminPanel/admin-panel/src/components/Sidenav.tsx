// src/components/Sidebar.tsx
import React from "react"
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react"
import { MdOutlineQuestionAnswer } from "react-icons/md"
import { IoDiamondOutline } from "react-icons/io5"
import { RxAvatar } from "react-icons/rx"
import LogoutButton from "./Logout"
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
        <DrawerHeader className="text-center">Menu</DrawerHeader>
        <DrawerBody
          className="p-4 justify-items-center text-center"
          style={{ alignItems: "center" }}
        >
          <ul className="flex flex-col space-y-6">
            <button className="flex items-center hover:text-blue-500">
              <MdOutlineQuestionAnswer className="mr-2 size-8" />
              <li className="py-2 ">Guess</li>
            </button>
            <button className="flex items-center hover:text-blue-500">
              <RxAvatar className="mr-2 size-8" />
              <li className="py-2">Avatar</li>
            </button>
          </ul>
        </DrawerBody>
        <LogoutButton />
      </DrawerContent>
    </Drawer>
  )
}

export default Sidenav
